using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface ICustomerRelationshipService
    {
        List<CustomerRelationshipDto> gets();
        List<CustomerRelationshipDto> getPaging(int page, int size, out int total);
        CustomerRelationshipDto get(string id);
        string create(CustomerRelationshipDto tCustomerRelationshipDto);
        string update(CustomerRelationshipDto tCustomerRelationshipDto);
        string delete(string id);
        string lockItem(string id);
    }
}
