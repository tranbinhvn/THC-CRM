using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
   
        interface IBusinessService
        {
        List<BusinessDto> gets();
        List<BusinessDto> getPaging(int page, int size, out int total);
        BusinessDto get(string id);
        string create(BusinessDto businessDto);
        string update(BusinessDto businessDto);
        string delete(string id);
        string lockItem(string id);
        }
    
}
