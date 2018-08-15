using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class Province
    {
        public Province()
        {
            BankBranch = new HashSet<BankBranch>();
            Customer = new HashSet<Customer>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CountryId { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public Country Country { get; set; }
        public ICollection<BankBranch> BankBranch { get; set; }
        public ICollection<Customer> Customer { get; set; }
    }
}
