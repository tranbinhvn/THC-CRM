using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class Customer
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
        public string EmployeeContactId { get; set; }
        public string CustomerGroupId { get; set; }
        public string CustomerRelationshipId { get; set; }
        public decimal ResourceType { get; set; }
        public string CustomerResourceId { get; set; }
        public string Website { get; set; }
        public string Fax { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public Business Business { get; set; }
        public CustomerGroup CustomerGroup { get; set; }
        public CustomerRelationship CustomerRelationship { get; set; }
        public EmployeeContactCustomer EmployeeContact { get; set; }
        public Province Province { get; set; }
    }
}
