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
    public class BankBranchService : IBankBranchService
    {
        private CRMContext _context;
        private IMapper mapper;
        public BankBranchService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<BankBranch, BankBranchDto>();
                cfg.CreateMap<BankBranchDto, BankBranch>();
                cfg.CreateMap<Bank, BankDto>().ForMember(b => b.BankBranch, opt => opt.Ignore());
                cfg.CreateMap<Province, ProvinceDto>().ForMember(p => p.BankBranch, opt => opt.Ignore());

            }).CreateMapper();

        }

        public BankBranchDto get(string id)
        {
            try
            {
                BankBranch bb = _context.BankBranch.Find(id);
                _context.Entry(bb).Reference(b => b.Bank).Load();
                _context.Entry(bb).Reference(b => b.Province).Load();
                return mapper.Map<BankBranch, BankBranchDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }
      
        public string CreateUser { get; set; }
        // Search
        public List<BankBranchDto> get_search(string value)
        {
            List<BankBranchDto> provinceList = new List<BankBranchDto>();
            var query = (from province in _context.BankBranch
                         where province.Name.Contains(value)
                         || province.Code.Contains(value)
                         || province.Description.Contains(value)
                         select province).
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
                        provinceList.Add(new BankBranchDto
                        {
                            Id = item.Id,
                            Name = item.Name,
                            Code = item.Code,
                            Description = item.Description,
                            //_list.FirstOrDefault(x => x.Id == id)
                            ProvinceId = item.ProvinceId,
                            BankId = item.BankId,
                            ProvinceName = (_context.Province.FirstOrDefault(x => x.Id == item.ProvinceId).Name),
                            BankName = (_context.Bank.FirstOrDefault(x => x.Id == item.BankId).Name),
                            CreateDate = item.CreateDate,
                            CreateUser = item.CreateUser
                        });
                    }
                }
                return provinceList;
            }
        }

        public List<BankBranchDto> gets()
        {
            try
            {
                var bbList = _context.BankBranch.Include(b => b.Bank).Include(p => p.Province).OrderBy(b => b.Name).ToList();
                return mapper.Map<List<BankBranch>, List<BankBranchDto>>(bbList);
            }
            catch (Exception)
            {
                return null;
            }
        }
        
       
            public List<BankBranchDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.BankBranch.Include(b => b.Bank).Include(p => p.Province).OrderBy(b => b.Name);
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<BankBranchDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<BankBranch>, List<BankBranchDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<BankBranchDto>();
            }
        }

        public string create(BankBranchDto bankBranchDto)
        {
            try
            {
                BankBranch bankBranchNew = mapper.Map<BankBranchDto, BankBranch>(bankBranchDto);
                bankBranchNew.Id = Guid.NewGuid().ToString();
                bankBranchNew.CreateDate = DateTime.Now;

                _context.BankBranch.Add(bankBranchNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string update(BankBranchDto bankBranchDto)
        {
            try
            {
                BankBranch bankBranchUpdate = _context.BankBranch.Find(bankBranchDto.Id);
                if (bankBranchUpdate == null)
                {
                    return "1";
                }
                bankBranchUpdate.Name = bankBranchDto.Name;
                bankBranchUpdate.Description = bankBranchDto.Description;
                bankBranchUpdate.Status = bankBranchDto.Status;
                bankBranchUpdate.BankId = bankBranchDto.BankId;
                bankBranchUpdate.ProvinceId = bankBranchDto.ProvinceId;

                _context.BankBranch.Update(bankBranchUpdate);
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
                BankBranch bankBranchRemove = _context.BankBranch.Find(id);
                if (bankBranchRemove == null)
                {
                    return "1";
                }

                _context.BankBranch.Remove(bankBranchRemove);
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
                BankBranch bankBranchBlock = _context.BankBranch.Find(id);
                if (bankBranchBlock == null)
                {
                    return "1";
                }
                bankBranchBlock.Status = false;

                _context.BankBranch.Update(bankBranchBlock);
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
