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
    public class EmployeeContactCustomerService : IEmployeeContactCustomerService
    {
        private CRMContext _context;
        private IMapper mapper;
        public EmployeeContactCustomerService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<EmployeeContactCustomer, EmployeeContactCustomerDto>();
                cfg.CreateMap<EmployeeContactCustomerDto, EmployeeContactCustomer>();
        //        cfg.CreateMap<Country, CountryDto>().ForMember(b => b.EmployeeContactCustomer, opt => opt.Ignore());
        //        cfg.CreateMap<BankBranch, BankBranchDto>().ForMember(p => p.EmployeeContactCustomer, opt => opt.Ignore());
         //       cfg.CreateMap<Customer, CustomerDto>().ForMember(c => c.EmployeeContactCustomer, opt => opt.Ignore());


            }).CreateMapper();

        }
        
        public EmployeeContactCustomerDto get(string id)
        {
            try
            {
                EmployeeContactCustomer bb = _context.EmployeeContactCustomer.Find(id);
   //             _context.Entry(bb).Reference(ct => ct.Country).Load();
  //              _context.Entry(bb).Collection(bbr => bbr.BankBranch).Load();
 //               _context.Entry(bb).Collection(b => b.Customer).Load();
                return mapper.Map<EmployeeContactCustomer, EmployeeContactCustomerDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }
        // Search
        public List<EmployeeContactCustomerDto> get_search(string value)
        {                    
            List< EmployeeContactCustomerDto> EmployeeContactCustomerList = new List<EmployeeContactCustomerDto>();
            var query = (from ctm in _context.EmployeeContactCustomer
                            where ctm.EmployeeId.Contains(value)                            
                            || ctm.Note.Contains(value)                            
         //                   ||    EmployeeContactCustomer.Description.Contains(value)
                            select ctm).
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
                        EmployeeContactCustomerList.Add(new EmployeeContactCustomerDto
                        {
                            Id = item.Id,
                            EmployeeId = item.EmployeeId,
                            ReceiveEmail = item.ReceiveEmail,
                            MainContact = item.MainContact,
                            Note = item.Note,
                         //   EmployeeName = (_context.Employee.FirstOrDefault(x => x.Id == item.EmployeeId).Name),
                            Status = item.Status,                           
                        });
                    }
                }
                return EmployeeContactCustomerList;
                //return mapper.Map<List<EmployeeContactCustomer>, List<EmployeeContactCustomerDto>>(query);
            }            
        }
        
        public List<EmployeeContactCustomerDto> gets()
        {
            try
            {
                var bbList = _context.EmployeeContactCustomer.
         //           Include(b => b.BankBranch).
         //            Include(c => c.Country).
         //           Include(cm => cm.Customer).
                    OrderBy(b => b.EmployeeId).ToList();
                return mapper.Map<List<EmployeeContactCustomer>, List<EmployeeContactCustomerDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<EmployeeContactCustomerDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.EmployeeContactCustomer.
         //             Include(b => b.BankBranch).
         //            Include(c => c.Country).
         //           Include(cm => cm.Customer).
                    OrderBy(b => b.EmployeeId);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<EmployeeContactCustomerDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<EmployeeContactCustomer>, List<EmployeeContactCustomerDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<EmployeeContactCustomerDto>();
            }
        }

        public string create(EmployeeContactCustomerDto tEmployeeContactCustomerDto)
        {
            try
            {
                EmployeeContactCustomer tEmployeeContactCustomerNew = mapper.Map<EmployeeContactCustomerDto, EmployeeContactCustomer>(tEmployeeContactCustomerDto);
                tEmployeeContactCustomerNew.Id = Guid.NewGuid().ToString();
         //       tEmployeeContactCustomerNew.CreateDate = DateTime.Now;

                _context.EmployeeContactCustomer.Add(tEmployeeContactCustomerNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        //Update       
        public string update(EmployeeContactCustomerDto tEmployeeContactCustomerDto)
        {
            try
            {
                EmployeeContactCustomer tEmployeeContactCustomerUpdate = _context.EmployeeContactCustomer.Find(tEmployeeContactCustomerDto.Id);
                if (tEmployeeContactCustomerUpdate == null)
                {
                    return "1";
                }
                tEmployeeContactCustomerUpdate.Id = tEmployeeContactCustomerDto.Id;
                tEmployeeContactCustomerUpdate.EmployeeId = tEmployeeContactCustomerDto.EmployeeId;
                tEmployeeContactCustomerUpdate.ReceiveEmail = tEmployeeContactCustomerDto.ReceiveEmail;
                tEmployeeContactCustomerUpdate.MainContact = tEmployeeContactCustomerDto.MainContact;
                tEmployeeContactCustomerUpdate.Note = tEmployeeContactCustomerDto.Note;
                tEmployeeContactCustomerUpdate.Status = tEmployeeContactCustomerDto.Status;                

                _context.EmployeeContactCustomer.Update(tEmployeeContactCustomerUpdate);
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
                EmployeeContactCustomer tEmployeeContactCustomerRemove = _context.EmployeeContactCustomer.Find(id);
                if (tEmployeeContactCustomerRemove == null)
                {
                    return "1";
                }

                _context.EmployeeContactCustomer.Remove(tEmployeeContactCustomerRemove);
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
                EmployeeContactCustomer tEmployeeContactCustomerBlock = _context.EmployeeContactCustomer.Find(id);
                if (tEmployeeContactCustomerBlock == null)
                {
                    return "1";
                }
                tEmployeeContactCustomerBlock.Status = false;

                _context.EmployeeContactCustomer.Update(tEmployeeContactCustomerBlock);
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
