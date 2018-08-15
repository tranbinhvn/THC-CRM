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
    public class ProductAgeService : IProductAgeService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductAgeService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductAge, ProductAgeDto>();
                cfg.CreateMap<ProductAgeDto, ProductAge>();
 //               cfg.CreateMap<ProductAge, ProductAgeDto>().ForMember(b => b.ProductAge, opt => opt.Ignore());
 //               cfg.CreateMap<Province, ProductAgeDto>().ForMember(p => p.ProductAge, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductAgeDto get(string id)
        {
            try
            {
                ProductAge bb = _context.ProductAge.Find(id);
 //               _context.Entry(bb).Reference(b => b.ProductAge).Load();
  //              _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<ProductAge, ProductAgeDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductAgeDto> gets()
        {
            try
            {
                var bbList = _context.ProductAge.OrderBy(b => b.Name).ToList();
                return mapper.Map<List<ProductAge>, List<ProductAgeDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<ProductAgeDto> get_search(string value)
        {
            List<ProductAgeDto> productAgeList = new List<ProductAgeDto>();
            var query = (from productAge in _context.ProductAge
                         where productAge.Name.Contains(value)
        //                 || productAge.Code.Contains(value)
        //                 || productAge.Description.Contains(value)
                         select productAge).
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
                //        productAgeList.Add(new ProductAgeDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,                           
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return productAgeList;
                return mapper.Map<List<ProductAge>, List<ProductAgeDto>>(query);
            }
        }
        public List<ProductAgeDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);                        
                var bbList = _context.ProductAge.OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductAgeDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductAge>, List<ProductAgeDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductAgeDto>();
            }
        }

        public string create(ProductAgeDto tProductAgeDto)
        {
            try
            {
                ProductAge tProductAgeNew = mapper.Map<ProductAgeDto, ProductAge>(tProductAgeDto);
                tProductAgeNew.Id = Guid.NewGuid().ToString();
                tProductAgeNew.CreateDate = DateTime.Now;

                _context.ProductAge.Add(tProductAgeNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        
        public string update(ProductAgeDto tProductAgeDto)
        {
            try
            {
                ProductAge tProductAgeBranchUpdate = _context.ProductAge.Find(tProductAgeDto.Id);
                if (tProductAgeBranchUpdate == null)
                {
                    return "1";
                }
                tProductAgeBranchUpdate.Id = tProductAgeDto.Id;
                tProductAgeBranchUpdate.Name = tProductAgeDto.Name;
                tProductAgeBranchUpdate.Status = tProductAgeDto.Status;
                tProductAgeBranchUpdate.CreateDate = tProductAgeDto.CreateDate;
               

                _context.ProductAge.Update(tProductAgeBranchUpdate);
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
                ProductAge tProductAgeBranchRemove = _context.ProductAge.Find(id);
                if (tProductAgeBranchRemove == null)
                {
                    return "1";
                }

                _context.ProductAge.Remove(tProductAgeBranchRemove);
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
                ProductAge tProductAgeBranchBlock = _context.ProductAge.Find(id);
                if (tProductAgeBranchBlock == null)
                {
                    return "1";
                }
                tProductAgeBranchBlock.Status = false;

                _context.ProductAge.Update(tProductAgeBranchBlock);
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
