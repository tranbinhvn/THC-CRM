using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class CustomerDto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public DateTime? Birthday { get; set; }
        public string Sex { get; set; }
        public byte[] Image { get; set; }
        public string TaxNo { get; set; }
        public string Description { get; set; }
        public string BusinessId { get; set; }
        public string ProvinceId { get; set; }
        public string ContactEmpId { get; set; }
        public string Website { get; set; }
        public string Fax { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public BusinessDto Business { get; set; }
        public EmployeeDto ContactEmp { get; set; }
        public ProvinceDto Province { get; set; }
    }
}
