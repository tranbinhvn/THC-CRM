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
    public class AccountService : IAccountService
    {
        private CRMContext _context;
        private IMapper mapper;
        public AccountService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Account, AccountDto>();
                cfg.CreateMap<AccountDto, Account>();
        
            }).CreateMapper();

        }

        public AccountDto get(string uname)
        {
            try
            {
                Account account = _context.Account.Find(uname);
                return mapper.Map<Account, AccountDto>(account);
            }
            catch (Exception)
            {
                return null;
            }

        }
      
        public string CreateUser { get; set; }
        // Search
        public List<AccountDto> get_search(string value)
        {
            List<AccountDto> provinceList = new List<AccountDto>();
            var query = (from account in _context.Account
                         where account.Username.Contains(value)
                          select account).
                            ToList();
            if (query.Count == 0)
            {
                return null;
            }
            else
            {
                return mapper.Map<List<Account>, List<AccountDto>>(query);
            }
        }

        public List<AccountDto> gets()
        {
            try
            {
                var accountList = _context.Account.
                      OrderBy(b => b.Username).
                    ToList();
                return mapper.Map<List<Account>, List<AccountDto>>(accountList);
            }
            catch (Exception)
            {
                return null;
            }
        }
        
       
            public List<AccountDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var accountList = _context.Account.
                     OrderBy(b => b.Username);
                total = accountList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<AccountDto>();
                }
                var result = accountList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<Account>, List<AccountDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<AccountDto>();
            }
        }

        public string create(AccountDto tAccountDto)
        {
            try
            {
                Account tAccountNew = mapper.Map<AccountDto, Account>(tAccountDto);
               // tAccountNew.Username = Guid.NewGuid().ToString();
                tAccountNew.CreateDate = DateTime.Now;

                _context.Account.Add(tAccountNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
       //Update
        public string update(AccountDto tAccountDto)
        {
            try
            {
                Account tAccountUpdate = _context.Account.Find(tAccountDto.Username);
                if (tAccountUpdate == null)
                {
                    return "1";
                }
                tAccountUpdate.Username = tAccountDto.Username;
                tAccountUpdate.Password = tAccountDto.Password;
                tAccountUpdate.Role = tAccountDto.Role;
                tAccountUpdate.Status = tAccountDto.Status;
                tAccountUpdate.EmployeeId = tAccountDto.EmployeeId;
                tAccountUpdate.CreateDate = tAccountDto.CreateDate;
                tAccountUpdate.CreateUser = tAccountDto.CreateUser;

                _context.Account.Update(tAccountUpdate);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public string delete(string username)
        {
            try
            {
                Account tAccountRemove = _context.Account.Find(username);
                if (tAccountRemove == null)
                {
                    return "1";
                }

                _context.Account.Remove(tAccountRemove);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string block(string uname)
        {
            try
            {
                Account tAccountBlock = _context.Account.Find(uname);
                if (tAccountBlock == null)
                {
                    return "1";
                }
                tAccountBlock.Status = false;

                _context.Account.Update(tAccountBlock);
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
