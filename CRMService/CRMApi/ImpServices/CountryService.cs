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
    public class CountryService : ICountryService
    {
        private CRMContext _context;
        private IMapper mapper;
        public CountryService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Country, CountryDto>();
                cfg.CreateMap<CountryDto, Country>();
  //              cfg.CreateMap<Bank, BankDto>().ForMember(b => b.Country, opt => opt.Ignore());
                cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.Country, opt => opt.Ignore());

            }).CreateMapper();

        }
        // Search
        public List<CountryDto> get_search(string value)
        {
            List<CountryDto> countryList = new List<CountryDto>();
            var query = (from country in _context.Country
                         where country.Name.Contains(value)
                         || country.Code.Contains(value)
                         || country.Description.Contains(value)
                         select country).
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
                //        countryList.Add(new CountryDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,
                //            Code = item.Code,
                //            Description = item.Description,
                //            //       Status=true,
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }

                //}
                //return countryList;
                return mapper.Map<List<Country>, List<CountryDto>>(query);
            }
            
        }
        public CountryDto get(string id)
        {
            try
            {
                  Country _tCountry = _context.Country.Find(id);
     //           Country _tCountry = _context.Country.FirstOrDefault(x => x.Id == id);    
                _context.Entry(_tCountry).Collection(b => b.Province).Load();
                return mapper.Map<Country, CountryDto>(_tCountry);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<CountryDto> gets()
        {
            try
            {
                var tCountryList = _context.Country.Include(p => p.Province).OrderBy(b => b.Name).ToList();
                return mapper.Map<List<Country>, List<CountryDto>>(tCountryList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<CountryDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var tCountryList = _context.Country.Include(p => p.Province).OrderBy(b => b.Name);
                total = tCountryList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<CountryDto>();
                }
                var result = tCountryList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Country>, List<CountryDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CountryDto>();
            }
        }

        public string create(CountryDto tCountryDto)
        {
            try
            {
                Country tCountryNew = mapper.Map<CountryDto, Country>(tCountryDto);
                tCountryNew.Id = Guid.NewGuid().ToString();
                tCountryNew.CreateDate = DateTime.Now;

                _context.Country.Add(tCountryNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update      
        public string update(CountryDto tCountryDto)
        {
            try
            {
                Country tCountryUpdate = _context.Country.Find(tCountryDto.Id);
                if (tCountryUpdate == null)
                {
                    return "1";
                }
                tCountryUpdate.Name = tCountryDto.Name;
                tCountryUpdate.Description = tCountryDto.Description;
                tCountryUpdate.Status = tCountryDto.Status;
                tCountryUpdate.Id = tCountryDto.Id;
                tCountryUpdate.Code = tCountryDto.Code;
                tCountryUpdate.CreateDate = tCountryDto.CreateDate;
                tCountryUpdate.CreateUser = tCountryDto.CreateUser;

                _context.Country.Update(tCountryUpdate);
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
                Country tCountryRemove = _context.Country.Find(id);
                if (tCountryRemove == null)
                {
                    return "1";
                }

                _context.Country.Remove(tCountryRemove);
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
                Country tCountryBlock = _context.Country.Find(id);
                if (tCountryBlock == null)
                {
                    return "1";
                }
                tCountryBlock.Status = false;

                _context.Country.Update(tCountryBlock);
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
