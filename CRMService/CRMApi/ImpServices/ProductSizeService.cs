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
    public class ProductSizeService : IProductSizeService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductSizeService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductSize, ProductSizeDto>();
                cfg.CreateMap<ProductSizeDto, ProductSize>();
//                cfg.CreateMap<Bank, BankDto>().ForMember(b => b.ProductSize, opt => opt.Ignore());
//                cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.ProductSize, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductSizeDto get(string id)
        {
            try
            {
                ProductSize bb = _context.ProductSize.Find(id);
 //               _context.Entry(bb).Reference(b => b.Bank).Load();
 //               _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductSize, ProductSizeDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductSizeDto> gets()
        {
            try
            {
                var bbList = _context.ProductSize.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductSize>, List<ProductSizeDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<ProductSizeDto> get_search(string value)
        {
            List<ProductSizeDto> productSizeList = new List<ProductSizeDto>();
            var query = (from productSize in _context.ProductSize
                         where productSize.Name.Contains(value)
                         && productSize.Status==true
                         //|| productSize.Code.Contains(value)
                         //|| productSize.Description.Contains(value)
                         select productSize).
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
                //        productSizeList.Add(new ProductSizeDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,                            
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return productSizeList;
                return mapper.Map<List<ProductSize>, List<ProductSizeDto>>(query);
            }
        }
        public List<ProductSizeDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductSize.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductSizeDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductSize>, List<ProductSizeDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductSizeDto>();
            }
        }

        public string create(ProductSizeDto tProductSizeDto)
        {
            try
            {
                ProductSize tProductSizeNew = mapper.Map<ProductSizeDto, ProductSize>(tProductSizeDto);
                tProductSizeNew.Id = Guid.NewGuid().ToString();
                tProductSizeNew.CreateDate = DateTime.Now;

                _context.ProductSize.Add(tProductSizeNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update
        public string update(ProductSizeDto tProductSizeDto)
        {
            try
            {
                ProductSize tProductSizeUpdate = _context.ProductSize.Find(tProductSizeDto.Id);
                if (tProductSizeUpdate == null)
                {
                    return "1";
                }
                tProductSizeUpdate.Name = tProductSizeDto.Name;
                tProductSizeUpdate.Id = tProductSizeDto.Id;
                tProductSizeUpdate.Status = tProductSizeDto.Status;
                tProductSizeUpdate.CreateDate = tProductSizeDto.CreateDate;
                tProductSizeUpdate.CreateUser = tProductSizeDto.CreateUser;

                _context.ProductSize.Update(tProductSizeUpdate);
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
                ProductSize tProductSizeRemove = _context.ProductSize.Find(id);
                if (tProductSizeRemove == null)
                {
                    return "1";
                }

                _context.ProductSize.Remove(tProductSizeRemove);
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
                ProductSize tProductSizeBlock = _context.ProductSize.Find(id);
                if (tProductSizeBlock == null)
                {
                    return "1";
                }
                tProductSizeBlock.Status = false;

                _context.ProductSize.Update(tProductSizeBlock);
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
