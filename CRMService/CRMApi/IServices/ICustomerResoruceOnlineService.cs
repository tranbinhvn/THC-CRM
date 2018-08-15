using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface ICustomerResoruceOnlineService
    {
        List<CustomerResoruceOnlineDto> gets();
        List<CustomerResoruceOnlineDto> getPaging(int page, int size, out int total);
        CustomerResoruceOnlineDto get(string id);
        string create(CustomerResoruceOnlineDto tCustomerResoruceOnlineDto);
        string update(CustomerResoruceOnlineDto tCustomerResoruceOnlineDto);
        string delete(string id);
        string lockItem(string id);
    }
}
