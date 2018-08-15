using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.Models.ResponeModels
{
    public class CustomerRelationshipDto
    {

        public CustomerRelationshipDto()
        {
            Customer = new HashSet<CustomerDto>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<CustomerDto> Customer { get; set; }
    }
}
