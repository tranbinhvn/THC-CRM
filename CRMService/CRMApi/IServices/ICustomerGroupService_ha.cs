using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface ICustomerGroupService_ha
    {
        List<CustomerGroupDto> gets();
        List<CustomerGroupDto> getPaging(int page, int size, out int total);
        CustomerGroupDto get(string id);
        string create(CustomerGroupDto tCustomerGroupDto);
        string update(CustomerGroupDto tCustomerGroupDto);
        string delete(string id);
        string lockItem(string id);
    }
}
