using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRMApi.ImpServices
{
    public class AccountService_bak : IAccountService
    {
        private CRMContext _context;
        private IMapper mapper;
        public AccountService_bak(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Account, AccountDto>();
                cfg.CreateMap<AccountDto, Account>();

            }).CreateMapper();

        }

        public AccountDto get(string username)
        {
            try
            {
                Account acc = _context.Account.Find(username);
                return mapper.Map<Account, AccountDto>(acc);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<AccountDto> gets()
        {
            try
            {
                return mapper.Map<List<Account>, List<AccountDto>>(_context.Account.ToList());
            }
            catch (Exception)
            {
                return null;
            }
        }
       
        // Search
        public List<AccountDto> get_search(string value)
        {
            List<AccountDto> provinceList = new List<AccountDto>();
            var query = (from province in _context.Account
                         where province.Username.Contains(value)
                         //|| province.Code.Contains(value)
                         //|| province.Description.Contains(value)
                         select province).
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
                //        provinceList.Add(new AccountDto
                //        {
                //            Username = item.Username,

                //            CreateDate = item.CreateDate,
                //            CreateUser = item.CreateUser
                //        });
                //    }
                //}
                //return provinceList;
                return mapper.Map<List<Account>, List<AccountDto>>(query);
            }
        }

        public string create(AccountDto accountDto)
        {
            try
            {
                Account accountNew = mapper.Map<AccountDto, Account>(accountDto);
                accountNew.CreateDate = DateTime.Now;
                _context.Account.Add(accountNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string update(AccountDto accountDto)
        {
            try
            {
                Account accountUpdate = _context.Account.Find(accountDto.Username);
                if (accountUpdate == null)
                {
                    return "1";
                }
                accountUpdate.Password = accountDto.Password;
                accountUpdate.Role = accountDto.Role;
                accountUpdate.Status = accountDto.Status;

                _context.Account.Update(accountUpdate);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string delete(string username)
        {
            try
            {
                Account accountRemove = _context.Account.Find(username);
                if (accountRemove == null)
                {
                    return "1";
                }

                _context.Account.Remove(accountRemove);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string block(string username)
        {
            try
            {
                Account accountBlock = _context.Account.Find(username);
                if (accountBlock == null)
                {
                    return "1";
                }
                accountBlock.Status = false;

                _context.Account.Update(accountBlock);
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
