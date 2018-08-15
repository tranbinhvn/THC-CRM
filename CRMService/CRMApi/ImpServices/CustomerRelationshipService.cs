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
    public class CustomerRelationshipService : ICustomerRelationshipService
    {
        private CRMContext _context;
        private IMapper mapper;
        public CustomerRelationshipService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CustomerRelationship, CustomerRelationshipDto>();
                cfg.CreateMap<CustomerRelationshipDto, CustomerRelationship>();
 //               cfg.CreateMap<Customer, CustomerDto>().ForMember(b => b.CustomerRelationship, opt => opt.Ignore());
 //               cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.CustomerRelationship, opt => opt.Ignore());

            }).CreateMapper();

        }

        public CustomerRelationshipDto get(string id)
        {
            try
            {
                CustomerRelationship bb = _context.CustomerRelationship.Find(id);
                _context.Entry(bb).Collection(b => b.Customer).Load();
 //               _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<CustomerRelationship, CustomerRelationshipDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<CustomerRelationshipDto> gets()
        {
            try
            {
                var bbList = _context.CustomerRelationship.
       //             Include(b => b.Customer).
      //              Include(p => p.Province).
                    OrderBy(b => b.Name).ToList();
                return mapper.Map<List<CustomerRelationship>, List<CustomerRelationshipDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }
        
        // Search
        public List<CustomerRelationshipDto> get_search(string value)
        {
            List<CustomerRelationshipDto> customerRelationshipList = new List<CustomerRelationshipDto>();
            var query = (from customerRelationship in _context.CustomerRelationship
                         where customerRelationship.Name.Contains(value)
           //              || customerRelationship.Code.Contains(value)
           //              || customerRelationship.Description.Contains(value)
                         select customerRelationship).
                         ToList();
            if (query.Count == 0)
            {
                return null;
            }
            else
            {
                foreach (var item in query)
                {
                    if (item.Status == true)
                    {
                        customerRelationshipList.Add(new CustomerRelationshipDto
                        {
                            Id = item.Id,
                            Name = item.Name,
                           
                            CreateDate = item.CreateDate,
                            CreateUser = item.CreateUser
                        });
                    }
                }

                return customerRelationshipList;
            }
        }

        public List<CustomerRelationshipDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.CustomerRelationship.
       //             Include(b => b.Customer).
   
                    OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<CustomerRelationshipDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<CustomerRelationship>, List<CustomerRelationshipDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<CustomerRelationshipDto>();
            }
        }

        public string create(CustomerRelationshipDto tCustomerRelationshipDto)
        {
            try
            {
                CustomerRelationship tCustomerRelationshipNew = mapper.Map<CustomerRelationshipDto, CustomerRelationship>(tCustomerRelationshipDto);
                tCustomerRelationshipNew.Id = Guid.NewGuid().ToString();
                tCustomerRelationshipNew.CreateDate = DateTime.Now;

                _context.CustomerRelationship.Add(tCustomerRelationshipNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update       
        public string update(CustomerRelationshipDto tCustomerRelationshipDto)
        {
            try
            {
                CustomerRelationship tCustomerRelationshipUpdate = _context.CustomerRelationship.Find(tCustomerRelationshipDto.Id);
                if (tCustomerRelationshipUpdate == null)
                {
                    return "1";
                }
                tCustomerRelationshipUpdate.Id = tCustomerRelationshipDto.Id;
                tCustomerRelationshipUpdate.Name = tCustomerRelationshipDto.Name;
               
                tCustomerRelationshipUpdate.Status = tCustomerRelationshipDto.Status;
                tCustomerRelationshipUpdate.CreateDate = tCustomerRelationshipDto.CreateDate;
                tCustomerRelationshipUpdate.CreateUser = tCustomerRelationshipDto.CreateUser;

                _context.CustomerRelationship.Update(tCustomerRelationshipUpdate);
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
                CustomerRelationship tCustomerRelationshipRemove = _context.CustomerRelationship.Find(id);
                if (tCustomerRelationshipRemove == null)
                {
                    return "1";
                }

                _context.CustomerRelationship.Remove(tCustomerRelationshipRemove);
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
                CustomerRelationship tCustomerRelationshipBlock = _context.CustomerRelationship.Find(id);
                if (tCustomerRelationshipBlock == null)
                {
                    return "1";
                }
                tCustomerRelationshipBlock.Status = false;

                _context.CustomerRelationship.Update(tCustomerRelationshipBlock);
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
