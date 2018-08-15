using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IEmployeeContactCustomerService
    {
        List<EmployeeContactCustomerDto> gets();
        List<EmployeeContactCustomerDto> getPaging(int page, int size, out int total);
        EmployeeContactCustomerDto get(string id);
        string create(EmployeeContactCustomerDto tEmployeeContactCustomerDto);
        string update(EmployeeContactCustomerDto tEmployeeContactCustomerDto);
        string delete(string id);
        string lockItem(string id);
    }
}
