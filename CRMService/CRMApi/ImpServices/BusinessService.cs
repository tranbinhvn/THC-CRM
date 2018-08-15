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
    public class BusinessService : IBusinessService
    {

        private CRMContext _context;
        private IMapper mapper;
        public BusinessService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
           {
               cfg.CreateMap<Business, BusinessDto>();
               cfg.CreateMap<BusinessDto, Business>();
               cfg.CreateMap<Customer, CustomerDto>().ForMember(cs => cs.Business, opt => opt.Ignore());
           }).CreateMapper();
        }
        public BusinessDto get(string id)
        {
            try
            {
                Business bs = _context.Business.Find(id);
                _context.Entry(bs).Collection(cs => cs.Customer).Load();
                return mapper.Map<Business, BusinessDto>(bs);

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<BusinessDto> gets()
        {
            try
            {
                var bsList = _context.Business.Include(cs => cs.Customer).OrderBy(cs => cs.Name).ToList();
                return mapper.Map<List<Business>, List<BusinessDto>>(bsList);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<BusinessDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bsList = _context.Business.Include(cs => cs.Customer).OrderBy(cs => cs.Name);
                total = bsList.Count();
                if (total <= 0 || total < skipSize)
                {
                    total = 0;
                    return new List<BusinessDto>();
                }
                var result = bsList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Business>, List<BusinessDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<BusinessDto>();
            }
        }
        // Search 
        public List<BusinessDto> search(string value)
        {

            List<BusinessDto> bsList = new List<BusinessDto>();
            var query = (from business in _context.Business
                         where business.Name.Contains(value)
                         || business.Description.Contains(value)
                         || business.CreateUser.Contains(value)
                         select business).
                         ToList();
            if (query.Count == 0)
            {
                return null;
            }
            foreach (var item in query)
            {
                bsList.Add(new BusinessDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Status = item.Status,
                    CreateDate = item.CreateDate,
                    CreateUser = item.CreateUser
                });

            }
            return bsList;


        }
        public string create(BusinessDto businessDto)
        {
            try
            {
                Business businessNew = mapper.Map<BusinessDto, Business>(businessDto);
                businessNew.Id = Guid.NewGuid().ToString();
                businessNew.CreateDate = DateTime.Now;

                _context.Business.Add(businessNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        public string update(BusinessDto businessDto)
        {
            try
            {
                Business businessUpdate = _context.Business.Find(businessDto.Id);
                if (businessUpdate == null)
                {
                    return "1";
                }
                businessUpdate.Id = businessDto.Id;
                businessUpdate.Name = businessDto.Name;
                businessUpdate.Description = businessDto.Description;
                businessUpdate.Status = businessDto.Status;
                businessUpdate.CreateDate = businessDto.CreateDate;
                businessUpdate.CreateDate = businessDto.CreateDate;

                _context.Business.Update(businessUpdate);
                _context.SaveChanges();
                return "";
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
                Business businessRemove = _context.Business.Find(id);
                if (businessRemove == null)
                {
                    return "1";

                }
                _context.Business.Remove(businessRemove);
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
                Business businessLock = _context.Business.Find(id);
                if (businessLock == null)
                {
                    return "1";
                }
                businessLock.Status = false;
                _context.Business.Update(businessLock);
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

