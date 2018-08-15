using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IBankService
    {
        List<BankDto> gets();
        List<BankDto> getPaging(int page, int size, out int total);
        BankDto get(string id);
        string create(BankDto bankDto);
        string update(BankDto bankDto);
        string delete(string id);
        string lockItem(string id);
    
    }
}
