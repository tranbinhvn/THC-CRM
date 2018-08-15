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
    public class ProductStyleService : IProductStyleService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductStyleService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductStyle, ProductStyleDto>();
                cfg.CreateMap<ProductStyleDto, ProductStyle>();
 //               cfg.CreateMap<Bank, BankDto>().ForMember(b => b.ProductStyle, opt => opt.Ignore());
 //               cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.ProductStyle, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductStyleDto get(string id)
        {
            try
            {
                ProductStyle bb = _context.ProductStyle.Find(id);
  //              _context.Entry(bb).Reference(b => b.Bank).Load();
  //              _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductStyle, ProductStyleDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductStyleDto> gets()
        {
            try
            {
                var bbList = _context.ProductStyle.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductStyle>, List<ProductStyleDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<ProductStyleDto> get_search(string value)
        {
            List<ProductStyleDto> productStyleList = new List<ProductStyleDto>();
            var query = (from productStyle in _context.ProductStyle
                         where productStyle.Name.Contains(value)
                         //|| productStyle.Code.Contains(value)
                         //|| productStyle.Description.Contains(value)
                         select productStyle).
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
                //        productStyleList.Add(new ProductStyleDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,               
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return productStyleList;
                return mapper.Map<List<ProductStyle>, List<ProductStyleDto>>(query);
            }
        }
        public List<ProductStyleDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductStyle.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductStyleDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductStyle>, List<ProductStyleDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductStyleDto>();
            }
        }

        public string create(ProductStyleDto tProductStyleDto)
        {
            try
            {
                ProductStyle tProductStyleNew = mapper.Map<ProductStyleDto, ProductStyle>(tProductStyleDto);
                tProductStyleNew.Id = Guid.NewGuid().ToString();
                tProductStyleNew.CreateDate = DateTime.Now;

                _context.ProductStyle.Add(tProductStyleNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string update(ProductStyleDto tProductStyleDto)
        {
            try
            {
                ProductStyle tProductStyleUpdate = _context.ProductStyle.Find(tProductStyleDto.Id);
                if (tProductStyleUpdate == null)
                {
                    return "1";
                }
                tProductStyleUpdate.Name = tProductStyleDto.Name;
                tProductStyleUpdate.Id = tProductStyleDto.Id;
                tProductStyleUpdate.Status = tProductStyleDto.Status;
                tProductStyleUpdate.CreateDate = tProductStyleDto.CreateDate;
                tProductStyleUpdate.CreateUser = tProductStyleDto.CreateUser;

                _context.ProductStyle.Update(tProductStyleUpdate);
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
                ProductStyle tProductStyleRemove = _context.ProductStyle.Find(id);
                if (tProductStyleRemove == null)
                {
                    return "1";
                }

                _context.ProductStyle.Remove(tProductStyleRemove);
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
                ProductStyle tProductStyleBlock = _context.ProductStyle.Find(id);
                if (tProductStyleBlock == null)
                {
                    return "1";
                }
                tProductStyleBlock.Status = false;

                _context.ProductStyle.Update(tProductStyleBlock);
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
