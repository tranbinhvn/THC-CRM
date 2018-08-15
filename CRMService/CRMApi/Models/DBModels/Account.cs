using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class Account
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public decimal Role { get; set; }
        public bool? Status { get; set; }
        public string EmployeeId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
    }
}
