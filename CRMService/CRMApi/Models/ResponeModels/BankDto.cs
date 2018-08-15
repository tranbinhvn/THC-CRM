using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class BankDto
    {
        public BankDto()
        {
            BankBranch = new HashSet<BankBranchDto>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<BankBranchDto> BankBranch { get; set; }
    }
}
