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
    public class ProductColorService : IProductColorService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductColorService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductColor, ProductColorDto>();
                cfg.CreateMap<ProductColorDto, ProductColor>();
 //               cfg.CreateMap<Bank, BankDto>().ForMember(b => b.ProductColor, opt => opt.Ignore());
 //               cfg.CreateMap<Province, ProductColorDto>().ForMember(p => p.ProductColor, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductColorDto get(string id)
        {
            try
            {
                ProductColor bb = _context.ProductColor.Find(id);
  //              _context.Entry(bb).Reference(b => b.Bank).Load();
  //              _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductColor, ProductColorDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductColorDto> gets()
        {
            try
            {
                var bbList = _context.ProductColor.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductColor>, List<ProductColorDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<ProductColorDto> get_search(string value)
        {
            List<ProductColorDto> productColorList = new List<ProductColorDto>();
            var query = (from productColor in _context.ProductColor
                         where productColor.Name.Contains(value)
         //                || productColor.Code.Contains(value)
         //                || productColor.Description.Contains(value)
                         select productColor).
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
                //        productColorList.Add(new ProductColorDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,                          
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return productColorList;
                return mapper.Map<List<ProductColor>, List<ProductColorDto>>(query);
            }
        }

        public List<ProductColorDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductColor.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductColorDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductColor>, List<ProductColorDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductColorDto>();
            }
        }

        public string create(ProductColorDto tProductColorDto)
        {
            try
            {
                ProductColor tProductColorNew = mapper.Map<ProductColorDto, ProductColor>(tProductColorDto);
                tProductColorNew.Id = Guid.NewGuid().ToString();
                tProductColorNew.CreateDate = DateTime.Now;

                _context.ProductColor.Add(tProductColorNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        //Update
        public string update(ProductColorDto tProductColorDto)
        {
            try
            {
                ProductColor tProductColorUpdate = _context.ProductColor.Find(tProductColorDto.Id);
                if (tProductColorUpdate == null)
                {
                    return "1";
                }
                tProductColorUpdate.Id = tProductColorDto.Id;
                tProductColorUpdate.Name = tProductColorDto.Name;
                tProductColorUpdate.Status = tProductColorDto.Status;
                tProductColorUpdate.CreateDate = tProductColorDto.CreateDate;
                tProductColorUpdate.CreateUser = tProductColorDto.CreateUser;

                _context.ProductColor.Update(tProductColorUpdate);
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
                ProductColor tProductColorRemove = _context.ProductColor.Find(id);
                if (tProductColorRemove == null)
                {
                    return "1";
                }

                _context.ProductColor.Remove(tProductColorRemove);
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
                ProductColor tProductColorBlock = _context.ProductColor.Find(id);
                if (tProductColorBlock == null)
                {
                    return "1";
                }
                tProductColorBlock.Status = false;

                _context.ProductColor.Update(tProductColorBlock);
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
