using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.Models.ResponeModels
{
    public class EmployeeContactCustomerDto
    {
        public EmployeeContactCustomerDto()
        {
            Customer = new HashSet<CustomerDto>();
        }

        public string Id { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public bool? ReceiveEmail { get; set; }
        public bool? MainContact { get; set; }
        public string Note { get; set; }
        public bool? Status { get; set; }

        public ICollection<CustomerDto> Customer { get; set; }
    }
}
