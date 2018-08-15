using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using CRMApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CRMApi.ImpServices
{
    public class ProvinceService : IProvinceService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProvinceService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Province, ProvinceDto>();
                cfg.CreateMap<ProvinceDto, Province>();
                cfg.CreateMap<Country, CountryDto>().ForMember(b => b.Province, opt => opt.Ignore());
                cfg.CreateMap<BankBranch, BankBranchDto>().ForMember(p => p.Province, opt => opt.Ignore());
                cfg.CreateMap<Customer, CustomerDto>().ForMember(c => c.Province, opt => opt.Ignore());


            }).CreateMapper();

        }
        
        public ProvinceDto get(string id)
        {
            try
            {
                Province bb = _context.Province.Find(id);
                _context.Entry(bb).Reference(ct => ct.Country).Load();
  //              _context.Entry(bb).Collection(bbr => bbr.BankBranch).Load();
 //               _context.Entry(bb).Collection(b => b.Customer).Load();
                return mapper.Map<Province, ProvinceDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }
        // Search
        public List<ProvinceDto> get_search(string value)
        {                    
            List< ProvinceDto> provinceList = new List<ProvinceDto>();
            var query = (from province in _context.Province
                            where province.Name.Contains(value) 
                            ||    province.Code.Contains(value)
                            ||    province.Description.Contains(value)
                            select province).
                            ToList();
            if (query.Count==0)
            {
                return null;
            }else
            {
                foreach (var item in query) //Mapper
                {
                    if (item.Status == true)
                    {
                        provinceList.Add(new ProvinceDto
                        {
                            Id = item.Id,
                            Name = item.Name,
                            Code = item.Code,
                            Description = item.Description,
                            CountryId = item.CountryId,
                            CountryName = (_context.Country.FirstOrDefault(x => x.Id == item.CountryId).Name),
                            CreateDate = item.CreateDate,
                            CreateUser = item.CreateUser
                        });
                    }
                }
                return provinceList;
                //return mapper.Map<List<Province>, List<ProvinceDto>>(query);
            }            
        }
        
        public List<ProvinceDto> gets()
        {
            try
            {
                var bbList = _context.Province.
         //           Include(b => b.BankBranch).
                     Include(c => c.Country).
         //           Include(cm => cm.Customer).
                    OrderBy(b => b.Name).ToList();
                return mapper.Map<List<Province>, List<ProvinceDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ProvinceDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.Province.
         //             Include(b => b.BankBranch).
                     Include(c => c.Country).
         //           Include(cm => cm.Customer).
                    OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProvinceDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Province>, List<ProvinceDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProvinceDto>();
            }
        }

        public string create(ProvinceDto tProvinceDto)
        {
            try
            {
                Province tProvinceNew = mapper.Map<ProvinceDto, Province>(tProvinceDto);
                tProvinceNew.Id = Guid.NewGuid().ToString();
                tProvinceNew.CreateDate = DateTime.Now;

                _context.Province.Add(tProvinceNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update       
        public string update(ProvinceDto tProvinceDto)
        {
            try
            {
                Province tProvinceUpdate = _context.Province.Find(tProvinceDto.Id);
                if (tProvinceUpdate == null)
                {
                    return "1";
                }
                tProvinceUpdate.Id = tProvinceDto.Id;
                tProvinceUpdate.Code = tProvinceDto.Code;
                tProvinceUpdate.Name = tProvinceDto.Name;
                tProvinceUpdate.Description = tProvinceDto.Description;
                tProvinceUpdate.CountryId = tProvinceDto.CountryId;
                tProvinceUpdate.Status = tProvinceDto.Status;
                tProvinceUpdate.CreateDate = tProvinceDto.CreateDate;
                tProvinceUpdate.CreateUser = tProvinceDto.CreateUser ;

                _context.Province.Update(tProvinceUpdate);
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
                Province tProvinceRemove = _context.Province.Find(id);
                if (tProvinceRemove == null)
                {
                    return "1";
                }

                _context.Province.Remove(tProvinceRemove);
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
                Province tProvinceBlock = _context.Province.Find(id);
                if (tProvinceBlock == null)
                {
                    return "1";
                }
                tProvinceBlock.Status = false;

                _context.Province.Update(tProvinceBlock);
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
