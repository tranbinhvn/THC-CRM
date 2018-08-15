using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IAccountService
    {
        List<AccountDto> gets();
        AccountDto get(string username);
        string create(AccountDto accountDto);
        string update(AccountDto accountDto);
        string delete(string username);
        string block(string username);
    }
}
