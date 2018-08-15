using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class Bank
    {
        public Bank()
        {
            BankBranch = new HashSet<BankBranch>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<BankBranch> BankBranch { get; set; }
    }
}
