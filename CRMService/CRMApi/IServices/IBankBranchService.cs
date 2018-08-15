using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IBankBranchService
    {
        List<BankBranchDto> gets();
        List<BankBranchDto> getPaging(int page, int size, out int total);
        BankBranchDto get(string id);
        string create(BankBranchDto bankBranchDto);
        string update(BankBranchDto bankBranchDto);
        string delete(string id);
        string lockItem(string id);
    }
}
