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
    public class CustomerResoruceOnlineService : ICustomerResoruceOnlineService
    {
        private CRMContext _context;
        private IMapper mapper;
        public CustomerResoruceOnlineService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CustomerResoruceOnline, CustomerResoruceOnlineDto>();
                cfg.CreateMap<CustomerResoruceOnlineDto, CustomerResoruceOnline>();
  //              cfg.CreateMap<Bank, BankDto>().ForMember(b => b.CustomerResoruceOnline, opt => opt.Ignore());
  //              cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.CustomerResoruceOnline, opt => opt.Ignore());

            }).CreateMapper();

        }

        public CustomerResoruceOnlineDto get(string id)
        {
            try
            {
                CustomerResoruceOnline bb = _context.CustomerResoruceOnline.Find(id);
  //              _context.Entry(bb).Reference(b => b.Bank).Load();
  //              _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<CustomerResoruceOnline, CustomerResoruceOnlineDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<CustomerResoruceOnlineDto> gets()
        {
            try
            {
                var bbList = _context.CustomerResoruceOnline.
 //                   Include(b => b.Bank).
  //                  Include(p => p.Province).
                    OrderBy(b => b.Name).ToList();
                return mapper.Map<List<CustomerResoruceOnline>, List<CustomerResoruceOnlineDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<CustomerResoruceOnlineDto> get_search(string value)
        {
            List<CustomerResoruceOnlineDto> customerResoruceOnlineList = new List<CustomerResoruceOnlineDto>();
            var query = (from customerResoruceOnline in _context.CustomerResoruceOnline
                         where customerResoruceOnline.Name.Contains(value)
         //                || customerResoruceOnline.Code.Contains(value)
         //                || customerResoruceOnline.Description.Contains(value)
                         select customerResoruceOnline).
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
                //        customerResoruceOnlineList.Add(new CustomerResoruceOnlineDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,

                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return customerResoruceOnlineList;
                return mapper.Map<List<CustomerResoruceOnline>, List<CustomerResoruceOnlineDto>>(query);
            }
        }

        public List<CustomerResoruceOnlineDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.CustomerResoruceOnline.
 //                   Include(b => b.Bank).
  //                  Include(p => p.Province).
                    OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<CustomerResoruceOnlineDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<CustomerResoruceOnline>, List<CustomerResoruceOnlineDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CustomerResoruceOnlineDto>();
            }
        }

        public string create(CustomerResoruceOnlineDto tCustomerResoruceOnlineDto)
        {
            try
            {
                CustomerResoruceOnline tCustomerResoruceOnlineNew = mapper.Map<CustomerResoruceOnlineDto, CustomerResoruceOnline>(tCustomerResoruceOnlineDto);
                tCustomerResoruceOnlineNew.Id = Guid.NewGuid().ToString();
                tCustomerResoruceOnlineNew.CreateDate = DateTime.Now;

                _context.CustomerResoruceOnline.Add(tCustomerResoruceOnlineNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //UPdate
        public string update(CustomerResoruceOnlineDto tCustomerResoruceOnlineDto)
        {
            try
            {
                CustomerResoruceOnline tCustomerResoruceOnlineUpdate = _context.CustomerResoruceOnline.Find(tCustomerResoruceOnlineDto.Id);
                if (tCustomerResoruceOnlineUpdate == null)
                {
                    return "1";
                }
                tCustomerResoruceOnlineUpdate.Id = tCustomerResoruceOnlineDto.Id;
                tCustomerResoruceOnlineUpdate.Name = tCustomerResoruceOnlineDto.Name;
               
                tCustomerResoruceOnlineUpdate.Status = tCustomerResoruceOnlineDto.Status;
                tCustomerResoruceOnlineUpdate.CreateDate = tCustomerResoruceOnlineDto.CreateDate;
                tCustomerResoruceOnlineUpdate.CreateUser = tCustomerResoruceOnlineDto.CreateUser;

                _context.CustomerResoruceOnline.Update(tCustomerResoruceOnlineUpdate);
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
                CustomerResoruceOnline tCustomerResoruceOnlineRemove = _context.CustomerResoruceOnline.Find(id);
                if (tCustomerResoruceOnlineRemove == null)
                {
                    return "1";
                }

                _context.CustomerResoruceOnline.Remove(tCustomerResoruceOnlineRemove);
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
                CustomerResoruceOnline tCustomerResoruceOnlineBlock = _context.CustomerResoruceOnline.Find(id);
                if (tCustomerResoruceOnlineBlock == null)
                {
                    return "1";
                }
                tCustomerResoruceOnlineBlock.Status = false;

                _context.CustomerResoruceOnline.Update(tCustomerResoruceOnlineBlock);
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
