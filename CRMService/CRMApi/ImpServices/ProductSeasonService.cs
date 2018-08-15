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
    public class ProductSeasonService : IProductSeasonService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductSeasonService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductSeason, ProductSeasonDto>();
                cfg.CreateMap<ProductSeasonDto, ProductSeason>();
   //             cfg.CreateMap<Bank, BankDto>().ForMember(b => b.ProductSeason, opt => opt.Ignore());
   //             cfg.CreateMap<Province, ProductSeasonDto>().ForMember(p => p.ProductSeason, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductSeasonDto get(string id)
        {
            try
            {
                ProductSeason bb = _context.ProductSeason.Find(id);
      //          _context.Entry(bb).Reference(b => b.Bank).Load();
      //         _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductSeason, ProductSeasonDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductSeasonDto> gets()
        {
            try
            {
                var bbList = _context.ProductSeason.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductSeason>, List<ProductSeasonDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<ProductSeasonDto> get_search(string value)
        {
            List<ProductSeasonDto> productSeasonList = new List<ProductSeasonDto>();
            var query = (from productSeason in _context.ProductSeason
                         where productSeason.Name.Contains(value)
          //               || productSeason.Code.Contains(value)
          //               || productSeason.Description.Contains(value)
                         select productSeason).
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
                //        productSeasonList.Add(new ProductSeasonDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,                           
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return productSeasonList;
                return mapper.Map<List<ProductSeason>, List<ProductSeasonDto>>(query);
            }
        }
        public List<ProductSeasonDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductSeason.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductSeasonDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductSeason>, List<ProductSeasonDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductSeasonDto>();
            }
        }

        public string create(ProductSeasonDto tProductSeasonDto)
        {
            try
            {
                ProductSeason tProductSeasonNew = mapper.Map<ProductSeasonDto, ProductSeason>(tProductSeasonDto);
                tProductSeasonNew.Id = Guid.NewGuid().ToString();
                tProductSeasonNew.CreateDate = DateTime.Now;

                _context.ProductSeason.Add(tProductSeasonNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string update(ProductSeasonDto tProductSeasonDto)
        {
            try
            {
                ProductSeason tProductSeasonUpdate = _context.ProductSeason.Find(tProductSeasonDto.Id);
                if (tProductSeasonUpdate == null)
                {
                    return "1";
                }
                tProductSeasonUpdate.Name = tProductSeasonDto.Name;
                tProductSeasonUpdate.Id = tProductSeasonDto.Id;
                tProductSeasonUpdate.Status = tProductSeasonDto.Status;
                tProductSeasonUpdate.CreateDate = tProductSeasonDto.CreateDate;
                tProductSeasonUpdate.CreateUser = tProductSeasonDto.CreateUser;

                _context.ProductSeason.Update(tProductSeasonUpdate);
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
                ProductSeason tProductSeasonRemove = _context.ProductSeason.Find(id);
                if (tProductSeasonRemove == null)
                {
                    return "1";
                }

                _context.ProductSeason.Remove(tProductSeasonRemove);
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
                ProductSeason tProductSeasonBlock = _context.ProductSeason.Find(id);
                if (tProductSeasonBlock == null)
                {
                    return "1";
                }
                tProductSeasonBlock.Status = false;

                _context.ProductSeason.Update(tProductSeasonBlock);
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
