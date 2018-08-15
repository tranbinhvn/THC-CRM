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
    public class ProductFashtionService : IProductFashtionService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductFashtionService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductFashtion, ProductFashtionDto>();
                cfg.CreateMap<ProductFashtionDto, ProductFashtion>();
  //              cfg.CreateMap<Bank, BankDto>().ForMember(b => b.ProductFashtion, opt => opt.Ignore());
  //              cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.ProductFashtion, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductFashtionDto get(string id)
        {
            try
            {
                ProductFashtion bb = _context.ProductFashtion.Find(id);
  //              _context.Entry(bb).Reference(b => b.Bank).Load();
  //              _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductFashtion, ProductFashtionDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductFashtionDto> gets()
        {
            try
            {
                var bbList = _context.ProductFashtion.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductFashtion>, List<ProductFashtionDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ProductFashtionDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductFashtion.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductFashtionDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductFashtion>, List<ProductFashtionDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductFashtionDto>();
            }
        }

        public string create(ProductFashtionDto tProductFashtionDto)
        {
            try
            {
                ProductFashtion tProductFashtionNew = mapper.Map<ProductFashtionDto, ProductFashtion>(tProductFashtionDto);
                tProductFashtionNew.Id = Guid.NewGuid().ToString();
                tProductFashtionNew.CreateDate = DateTime.Now;

                _context.ProductFashtion.Add(tProductFashtionNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
       //Update
        public string update(ProductFashtionDto tProductFashtionDto)
        {
            try
            {
                ProductFashtion tProductFashtionUpdate = _context.ProductFashtion.Find(tProductFashtionDto.Id);
                if (tProductFashtionUpdate == null)
                {
                    return "1";
                }
                tProductFashtionUpdate.Id = tProductFashtionDto.Id;               
                tProductFashtionUpdate.Name = tProductFashtionDto.Name;
                tProductFashtionUpdate.RetailPrice = tProductFashtionDto.RetailPrice;
                tProductFashtionUpdate.WholesalePrice = tProductFashtionDto.WholesalePrice;
                tProductFashtionUpdate.Description = tProductFashtionDto.Description;
                tProductFashtionUpdate.Status = tProductFashtionDto.Status;
                tProductFashtionUpdate.CreateDate = tProductFashtionDto.CreateDate;
                tProductFashtionUpdate.CreateUser = tProductFashtionDto.CreateUser;

                _context.ProductFashtion.Update(tProductFashtionUpdate);
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
                ProductFashtion tProductFashtionRemove = _context.ProductFashtion.Find(id);
                if (tProductFashtionRemove == null)
                {
                    return "1";
                }

                _context.ProductFashtion.Remove(tProductFashtionRemove);
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
                ProductFashtion tProductFashtionBlock = _context.ProductFashtion.Find(id);
                if (tProductFashtionBlock == null)
                {
                    return "1";
                }
                tProductFashtionBlock.Status = false;

                _context.ProductFashtion.Update(tProductFashtionBlock);
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
