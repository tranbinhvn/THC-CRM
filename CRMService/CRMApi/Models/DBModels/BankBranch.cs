using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class BankBranch
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public string BankId { get; set; }
        public string ProvinceId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public Bank Bank { get; set; }
        public Province Province { get; set; }
    }
}
