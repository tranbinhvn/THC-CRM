using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class BusinessDto
    {
        public BusinessDto()
        {
            Customer = new HashSet<CustomerDto>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<CustomerDto> Customer { get; set; }
    }
}
