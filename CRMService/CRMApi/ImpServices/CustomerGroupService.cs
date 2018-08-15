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
    public class CustomerGroupService : ICustomerGroupService
    {
        private CRMContext _context;
        private IMapper mapper;
        public CustomerGroupService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CustomerGroup, CustomerGroupDto>();
                cfg.CreateMap<CustomerGroupDto, CustomerGroup>();
   //             cfg.CreateMap<Customer, CustomerDto>().ForMember(b => b.CustomerGroup, opt => opt.Ignore());
  //              cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.CustomerGroup, opt => opt.Ignore());

            }).CreateMapper();

        }

        public CustomerGroupDto get(string id)
        {
            try
            {
                CustomerGroup bb = _context.CustomerGroup.Find(id);
   //             _context.Entry(bb).Collection(b => b.Customer).Load();
  //              _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<CustomerGroup, CustomerGroupDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<CustomerGroupDto> gets()
        {
            try
            {
                var bbList = _context.CustomerGroup.
     //               Include(cg => cg.Customer).
     //               Include(p => p.Province).
                    OrderBy(b => b.Name).ToList();
                return mapper.Map<List<CustomerGroup>, List<CustomerGroupDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Search
        public List<CustomerGroupDto> get_search(string value)
        {
            List<CustomerGroupDto> cusGroupList = new List<CustomerGroupDto>();
            var query = (from cusGroup in _context.CustomerGroup
                         where cusGroup.Name.Contains(value)
     //                    || cusGroup.Code.Contains(value)
     //                    || cusGroup.Description.Contains(value)
                         select cusGroup).
                         ToList();
            if (query.Count == 0)
            {
                return null;
            }else
            {
                //foreach (var item in query)
                //{
                //    if (item.Status == true)
                //    {
                //        cusGroupList.Add(new CustomerGroupDto
                //        {
                //            Id = item.Id,
                //            Name = item.Name,                      
                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }

                //}
                //return cusGroupList;
                return mapper.Map<List<CustomerGroup>, List<CustomerGroupDto>>(query);
            }            
        }

        public List<CustomerGroupDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.CustomerGroup.
      //              Include(b => b.Customer).
     //               Include(p => p.Province).
                    OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<CustomerGroupDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<CustomerGroup>, List<CustomerGroupDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CustomerGroupDto>();
            }
        }

        public string create(CustomerGroupDto tCustomerGroupDto)
        {
            try
            {
                CustomerGroup tCustomerGroupNew = mapper.Map<CustomerGroupDto, CustomerGroup>(tCustomerGroupDto);
                tCustomerGroupNew.Id = Guid.NewGuid().ToString();
                tCustomerGroupNew.CreateDate = DateTime.Now;

                _context.CustomerGroup.Add(tCustomerGroupNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
       //Update
        public string update(CustomerGroupDto tCustomerGroupDto)
        {
            try
            {
                CustomerGroup tCustomerGroupUpdate = _context.CustomerGroup.Find(tCustomerGroupDto.Id);
                if (tCustomerGroupUpdate == null)
                {
                    return "1";
                }
                tCustomerGroupUpdate.Name = tCustomerGroupDto.Name;
                tCustomerGroupUpdate.Id = tCustomerGroupDto.Id;
                tCustomerGroupUpdate.Status = tCustomerGroupDto.Status;
                tCustomerGroupUpdate.CreateDate = tCustomerGroupDto.CreateDate;
                tCustomerGroupUpdate.CreateUser = tCustomerGroupDto.CreateUser;                

                _context.CustomerGroup.Update(tCustomerGroupUpdate);
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
                CustomerGroup tCustomerGroupRemove = _context.CustomerGroup.Find(id);
                if (tCustomerGroupRemove == null)
                {
                    return "1";
                }

                _context.CustomerGroup.Remove(tCustomerGroupRemove);
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
                CustomerGroup tCustomerGroupBlock = _context.CustomerGroup.Find(id);
                if (tCustomerGroupBlock == null)
                {
                    return "1";
                }
                tCustomerGroupBlock.Status = false;

                _context.CustomerGroup.Update(tCustomerGroupBlock);
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
