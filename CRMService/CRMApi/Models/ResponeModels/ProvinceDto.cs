using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class ProvinceDto
    {
        public ProvinceDto()
        {
            BankBranch = new HashSet<BankBranchDto>();
            Customer = new HashSet<CustomerDto>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CountryId { get; set; }
        public string CountryName { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public CountryDto Country { get; set; }
        public ICollection<BankBranchDto> BankBranch { get; set; }
        public ICollection<CustomerDto> Customer { get; set; }
    }
}
