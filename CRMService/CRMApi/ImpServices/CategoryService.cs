using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CRMApi.ImpServices
{
    public class CategoryService : ICategoryService
    {
        private CRMContext _context;
        private IMapper mapper;
        public CategoryService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Category, CategoryDto>();
                cfg.CreateMap<CategoryDto, Category>();
                cfg.CreateMap<CategoryMain, CategoryMainDto>().ForMember(cm => cm.Category, opt => opt.Ignore());
  //              cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.Category, opt => opt.Ignore());

            }).CreateMapper();

        }

        public CategoryDto get(string id)
        {
            try
            {
                Category bb = _context.Category.Find(id);
 //               _context.Entry(bb).Reference(b => b.CategoryMain).Load();
 //               _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<Category, CategoryDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<CategoryDto> gets()
        {
            try
            {
                var bbList = _context.Category.
 //                   Include(b => b.CategoryMain).
 //                   Include(p => p.Province).
                    OrderBy(b => b.Name).
                    ToList();
                return mapper.Map<List<Category>, List<CategoryDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<CategoryDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.Category.
                    Include(b => b.CategoryMain).
 //                   Include(p => p.Province).
                    OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<CategoryDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Category>, List<CategoryDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CategoryDto>();
            }
        }

        public string create(CategoryDto tCategoryDto)
        {
            try
            {
                Category tCategoryNew = mapper.Map<CategoryDto, Category>(tCategoryDto);
                tCategoryNew.Id = Guid.NewGuid().ToString();
                tCategoryNew.CreateDate = DateTime.Now;

                _context.Category.Add(tCategoryNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update       
        public string update(CategoryDto tCategoryDto)
        {
            try
            {
                Category tCategoryUpdate = _context.Category.Find(tCategoryDto.Id);
                if (tCategoryUpdate == null)
                {
                    return "1";
                }
                tCategoryUpdate.Name = tCategoryDto.Name;
                tCategoryUpdate.Id = tCategoryDto.Id;
                tCategoryUpdate.Status = tCategoryDto.Status;
                tCategoryUpdate.CategoryMainId = tCategoryDto.CategoryMainId;
                tCategoryUpdate.CreateDate = tCategoryDto.CreateDate;
                tCategoryUpdate.CreateUser = tCategoryDto.CreateUser;

                _context.Category.Update(tCategoryUpdate);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception ex)
            {
                return "1";
            }
        }

        public string delete(string id)
        {
            try
            {
                Category tCategoryRemove = _context.Category.Find(id);
                if (tCategoryRemove == null)
                {
                    return "1";
                }

                _context.Category.Remove(tCategoryRemove);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string lockItem(string id)
        {
            try
            {
                Category tCategoryBlock = _context.Category.Find(id);
                if (tCategoryBlock == null)
                {
                    return "1";
                }
                tCategoryBlock.Status = false;

                _context.Category.Update(tCategoryBlock);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
    }
}
