using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class BankBranchDto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public string BankId { get; set; }
        public string BankName { get; set; }
        public string ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public BankDto Bank { get; set; }
        public ProvinceDto Province { get; set; }
    }


}
