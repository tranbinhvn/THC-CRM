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
                // cfg.CreateMap<CategoryMain, CategoryMainDto>().ForSourceMember(cm => cm.Category, opt => opt.Ignore());
                cfg.CreateMap<CategoryMain, CategoryMainDto>();
            }).CreateMapper();
        }
        public CategoryDto get(string id)
        {
            try
            {
                var c = _context.Category.Find(id);
                _context.Entry(c).Reference(cm => cm.CategoryMain).Load();
                return mapper.Map<Category, CategoryDto>(c);
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
                var cList = _context.Category.
  //                  Include(cm => cm.CategoryMain).
                    OrderBy(cm => cm.Name).ToList();
                return mapper.Map<List<Category>, List<CategoryDto>>(cList);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<CategoryDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var cList = _context.Category.Include(cm => cm.CategoryMain).OrderBy(cm => cm.Name);
                total = cList.Count();
                if (total <= 0 || total < skipSize)
                {
                    total = 0;
                    return new List<CategoryDto>();
                }
                var result = cList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Category>, List<CategoryDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CategoryDto>();
            }
        }
        public string create(CategoryDto categoryDto)
        {
            try
            {
                Category categoryNew = mapper.Map<CategoryDto, Category>(categoryDto);
                categoryNew.Id = Guid.NewGuid().ToString();
                categoryNew.CreateDate = DateTime.Now;

                _context.Category.Add(categoryNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        public string update(CategoryDto categoryDto)
        {
            try
            {
                Category categoryUpdate = _context.Category.Find(categoryDto.Id);
                if (categoryUpdate == null)
                {
                    return "1";
                }
                categoryUpdate.Id = categoryDto.Id;
                categoryUpdate.Name = categoryDto.Name;
                categoryUpdate.CategoryMainId = categoryDto.CategoryMainId;
                categoryUpdate.Status = categoryDto.Status;
                categoryUpdate.CreateDate = categoryDto.CreateDate;
                categoryUpdate.CreateUser = categoryDto.CreateUser;

                _context.Category.Update(categoryUpdate);
                _context.SaveChanges();
                return "0";

            }
            catch (Exception)
            {
                return "1";
            }
        }
        public string delete(string id)
        {
            try
            {
                Category categoryRemove = _context.Category.Find(id);
                if (categoryRemove == null)
                {
                    return "1";
                }
                _context.Category.Remove(categoryRemove);
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
                Category categoryLock = _context.Category.Find(id);
                if (categoryLock == null)
                {
                    return "1";
                }
                categoryLock.Status = !categoryLock.Status;
                _context.Category.Update(categoryLock);
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
