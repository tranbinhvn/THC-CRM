using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CRMApi.ImpServices
{
    public class BankService : IBankService
    {
        private CRMContext _context;
        private IMapper mapper;
        public BankService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
         {
             cfg.CreateMap<Bank, BankDto>();
             cfg.CreateMap<BankDto, Bank>();
             cfg.CreateMap<BankBranch, BankBranchDto>().ForMember(bb => bb.Bank, opt => opt.Ignore());
         }).CreateMapper();
        }
        public BankDto get(string id)
        {
            try
            {
                Bank b = _context.Bank.Find(id);
                _context.Entry(b).Collection(bb => bb.BankBranch).Load();
                return mapper.Map<Bank, BankDto>(b);
            }
            catch   (Exception)
            {
                return null;
            }
        }
        // Search 
        public List<BankDto> search(string value)
        {

            List<BankDto> bList = new List<BankDto>();
            var query = (from bank in _context.Bank
                         where bank.Name.Contains(value)
                         || bank.Code.Contains(value)
                         || bank.CreateUser.Contains(value)
                         select bank).
                         ToList();
            if (query.Count == 0)
            {
                return null;
            }
            foreach (var item in query)
            {
                    bList.Add(new BankDto
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Code = item.Code,
                        Status = item.Status,
                        CreateDate = item.CreateDate,
                        CreateUser = item.CreateUser
                    });

            }
            return bList;


        }

        public List<BankDto> gets()
        {
            try
            {
                var bList = _context.Bank.Include(bb => bb.BankBranch).OrderBy(bb => bb.Name).ToList();
                return mapper.Map<List<Bank>, List<BankDto>>(bList);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public List<BankDto> getPaging(int page , int size , out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bList = _context.Bank.Include(bb => bb.BankBranch).OrderBy(bb => bb.Name);
                total = bList.Count();
                if (total <= 0 || total < skipSize)
                {
                    total = 0;
                    return new List<BankDto>();
                }
                var result = bList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Bank>, List<BankDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<BankDto>();
            }
        }

        private IActionResult View(Bank bank)
        {
            throw new NotImplementedException();
        }

        public string create(BankDto bankDto)
        {
            try {
                Bank bankNew = mapper.Map<BankDto, Bank>(bankDto);
                bankNew.Id = Guid.NewGuid().ToString();
                bankNew.CreateDate = DateTime.Now;

                _context.Bank.Add(bankNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        public string update(BankDto bankDto)
        {
            try
            {
                Bank bankUpdate = _context.Bank.Find(bankDto.Id);
                if( bankUpdate == null)
                {
                    return "1";
                }
                bankUpdate.Id = bankDto.Id;
                bankUpdate.Name = bankDto.Name;
                bankUpdate.Code = bankDto.Code;
                bankUpdate.Status = bankDto.Status;
                bankUpdate.CreateDate = bankDto.CreateDate;
                bankUpdate.CreateUser = bankDto.CreateUser;

                _context.Bank.Update(bankUpdate);
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
                Bank bankRemove = _context.Bank.Find(id);
                if (bankRemove == null)
                {
                    return "1";
                }
                _context.Bank.Remove(bankRemove);
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
                Bank bankLock = _context.Bank.Find(id);
                if(bankLock == null)
                {
                    return "1";
                }
                bankLock.Status = !bankLock.Status;
                _context.Bank.Update(bankLock);
                _context.SaveChanges();
                return "0";
            }
            catch(Exception)
            {
                return "1";
            }
        }

      
    }
}
