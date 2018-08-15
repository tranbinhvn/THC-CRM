using System;
using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CRMApi.ImpServices
{
    public class CustomerGroupService_ha : ICustomerGroup
    {
        private CRMContext _context;
        private IMapper mapper;
        public  CustomerGroupService_ha(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CustomerGroup, CustomerGroupDto>();
                cfg.CreateMap<CustomerGroupDto, CustomerGroup>();
                cfg.CreateMap<Customer, CustomerDto>().ForMember(c => c.Business, opt => opt.Ignore());
            }).CreateMapper();
        }
        public CustomerGroupDto get(string id)
        {
            try
            {
                CustomerGroup cg = _context.CustomerGroup.Find(id);
                _context.Entry(cg).Reference(c => c.Customer).Load();
                return mapper.Map<CustomerGroup, CustomerGroupDto>(cg);
            }
            catch(Exception)
            {
                return null;
            }
        }
        public List<CustomerGroupDto> gets()
        {
            try
            {
                var cgList = _context.CustomerGroup.Include(c => c.Customer).OrderBy(c => c.Name).ToList();
                return mapper.Map<List<CustomerGroup>, List<CustomerGroupDto>>(cgList);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public List<CustomerGroupDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var cgList = _context.CustomerGroup.Include(cg => cg.Customer).OrderBy(cg => cg.Name);
                total = cgList.Count();
                if (total <= 0 || total < skipSize)
                {
                    total = 0;
                    return new List<CustomerGroupDto>();
                }
                var result = cgList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<CustomerGroup>, List<CustomerGroupDto>>(result);
            }
            catch
            {
                total = 0;
                return new List<CustomerGroupDto>();
            }
        }
        public string create(CustomerGroupDto customerGroupDto)
        {
            try
            {
                CustomerGroup customerGroupNew = mapper.Map<CustomerGroupDto, CustomerGroup>(customerGroupDto);
                customerGroupNew.Id = Guid.NewGuid().ToString();
                customerGroupNew.CreateDate = DateTime.Now;

                _context.CustomerGroup.Add(customerGroupNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        public string update (CustomerGroupDto customerGroupDto)
        {
            try
            {
                CustomerGroup customerGroupUpdate = _context.CustomerGroup.Find(customerGroupDto.Id);
                if (customerGroupUpdate == null)
                {
                    return "1";
                }
                customerGroupUpdate.Id = customerGroupDto.Id;
                customerGroupUpdate.Name = customerGroupDto.Name;
                customerGroupUpdate.Status = customerGroupDto.Status;
                customerGroupUpdate.CreateDate = customerGroupDto.CreateDate;
                customerGroupUpdate.CreateUser = customerGroupDto.CreateUser;

                _context.CustomerGroup.Update(customerGroupUpdate);
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
                CustomerGroup customerGroupRemove = _context.CustomerGroup.Find(id);
                if (customerGroupRemove == null)
                {
                    return "1";

                }
                _context.CustomerGroup.Remove(customerGroupRemove);
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
                CustomerGroup customerGroupLock = _context.CustomerGroup.Find(id);
                if (customerGroupLock == null)
                {
                    return "1";
                }
                customerGroupLock.Status = false;
                _context.CustomerGroup.Update(customerGroupLock);
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
