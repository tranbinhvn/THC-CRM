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
    public class CategoryMainService : ICategoryMainService
    {
        private CRMContext _context;
        private IMapper mapper;
        public CategoryMainService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CategoryMain, CategoryMainDto>();
                cfg.CreateMap<CategoryMainDto, CategoryMain>();
                cfg.CreateMap<Category, CategoryDto>().
                ForMember(cate => cate.CategoryMain, opt => opt.Ignore());
   //             cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.CategoryMain, opt => opt.Ignore());

            }).CreateMapper();

        }

        public CategoryMainDto get(string id)
        {
            try
            {
                CategoryMain categoryMain = _context.CategoryMain.Find(id);
                _context.Entry(categoryMain).Reference(b => b.Category).Load();
    //          _context.Entry(categoryMain).Reference(b => b.Province).Load();
                return mapper.Map<CategoryMain, CategoryMainDto>(categoryMain);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<CategoryMainDto> gets()
        {
            try
            {
                var categoryMainList = _context.CategoryMain.
                    Include(cate=> cate.Category).
                    OrderBy(b => b.Name).ToList();
                return mapper.Map<List<CategoryMain>, List<CategoryMainDto>>(categoryMainList);
            }
            catch (Exception ex)
            {
               
                return null;
            }
        }
    
        // Search
        public List<CategoryMainDto> get_search(string value)
        {
            List<CategoryMainDto> cateMainList = new List<CategoryMainDto>();
            var query = (from cateMain in _context.CategoryMain
                         where cateMain.Name.Contains(value)
                         
                         select cateMain).
                         ToList();
            if (query.Count == 0)
            {
                return null;
            }
            else
            {
                //foreach (var item in query)
                //{
                //    if (item.Status == true)
                //    {
                //        cateMainList.Add(new CategoryMainDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,

                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }

                //}
                //return cateMainList;
                return mapper.Map<List<CategoryMain>, List<CategoryMainDto>>(query);

            }

        }

        public List<CategoryMainDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var categoryMainList = _context.CategoryMain.OrderBy(b => b.Name);
                total = categoryMainList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<CategoryMainDto>();
                }
                var result = categoryMainList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<CategoryMain>, List<CategoryMainDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CategoryMainDto>();
            }
        }

        public string create(CategoryMainDto tCategoryMainDto)
        {
            try
            {
                CategoryMain tCategoryMainNew = mapper.Map<CategoryMainDto, CategoryMain>(tCategoryMainDto);
                tCategoryMainNew.Id = Guid.NewGuid().ToString();
                tCategoryMainNew.CreateDate = DateTime.Now;

                _context.CategoryMain.Add(tCategoryMainNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update       
        public string update(CategoryMainDto tCategoryMainDto)
        {
            try
            {
                CategoryMain tCategoryMainUpdate = _context.CategoryMain.Find(tCategoryMainDto.Id);
                if (tCategoryMainUpdate == null)
                {
                    return "1";
                }
                tCategoryMainUpdate.Name = tCategoryMainDto.Name;
                tCategoryMainUpdate.Name = tCategoryMainDto.Name;
                tCategoryMainUpdate.Status = tCategoryMainDto.Status;
                tCategoryMainUpdate.CreateDate = tCategoryMainDto.CreateDate;
                tCategoryMainUpdate.CreateUser = tCategoryMainDto.CreateUser;

                _context.CategoryMain.Update(tCategoryMainUpdate);
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
                CategoryMain tCategoryMainRemove = _context.CategoryMain.Find(id);
                if (tCategoryMainRemove == null)
                {
                    return "1";
                }

                _context.CategoryMain.Remove(tCategoryMainRemove);
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
                CategoryMain tCategoryMainBlock = _context.CategoryMain.Find(id);
                if (tCategoryMainBlock == null)
                {
                    return "1";
                }
                tCategoryMainBlock.Status = false;

                _context.CategoryMain.Update(tCategoryMainBlock);
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
