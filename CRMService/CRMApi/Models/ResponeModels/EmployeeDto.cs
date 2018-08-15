using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class EmployeeDto
    {
        public EmployeeDto()
        {
            Customer = new HashSet<CustomerDto>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public ICollection<CustomerDto> Customer { get; set; }
    }
}
