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
    public class ProductSexService : IProductSexService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductSexService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductSex, ProductSexDto>();
                cfg.CreateMap<ProductSexDto, ProductSex>();
 //               cfg.CreateMap<Bank, BankDto>().ForMember(b => b.ProductSex, opt => opt.Ignore());
 //               cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.ProductSex, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductSexDto get(string id)
        {
            try
            {
                ProductSex bb = _context.ProductSex.Find(id);
 //               _context.Entry(bb).Reference(b => b.Bank).Load();
 //               _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductSex, ProductSexDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductSexDto> gets()
        {
            try
            {
                var bbList = _context.ProductSex.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductSex>, List<ProductSexDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<ProductSexDto> get_search(string value)
        {
            List<ProductSexDto> productSexList = new List<ProductSexDto>();
            var query = (from productSex in _context.ProductSex
                         where productSex.Name.Contains(value)
         //                || productSex.Code.Contains(value)
         //                || productSex.Description.Contains(value)
                         select productSex).
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
                //        productSexList.Add(new ProductSexDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,                           
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return productSexList;
                return mapper.Map<List<ProductSex>, List<ProductSexDto>>(query);
            }
        }
        public List<ProductSexDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductSex.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductSexDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductSex>, List<ProductSexDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductSexDto>();
            }
        }

        public string create(ProductSexDto tProductSexDto)
        {
            try
            {
                ProductSex tProductSexNew = mapper.Map<ProductSexDto, ProductSex>(tProductSexDto);
                tProductSexNew.Id = Guid.NewGuid().ToString();
                tProductSexNew.CreateDate = DateTime.Now;

                _context.ProductSex.Add(tProductSexNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
       //Update
        public string update(ProductSexDto tProductSexDto)
        {
            try
            {
                ProductSex tProductSexUpdate = _context.ProductSex.Find(tProductSexDto.Id);
                if (tProductSexUpdate == null)
                {
                    return "1";
                }
                tProductSexUpdate.Name = tProductSexDto.Name;
                tProductSexUpdate.Id = tProductSexDto.Id;
                tProductSexUpdate.Status = tProductSexDto.Status;
                tProductSexUpdate.CreateDate = tProductSexDto.CreateDate;
                tProductSexUpdate.CreateUser = tProductSexDto.CreateUser;

                _context.ProductSex.Update(tProductSexUpdate);
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
                ProductSex tProductSexRemove = _context.ProductSex.Find(id);
                if (tProductSexRemove == null)
                {
                    return "1";
                }

                _context.ProductSex.Remove(tProductSexRemove);
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
                ProductSex tProductSexBlock = _context.ProductSex.Find(id);
                if (tProductSexBlock == null)
                {
                    return "1";
                }
                tProductSexBlock.Status = false;

                _context.ProductSex.Update(tProductSexBlock);
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
