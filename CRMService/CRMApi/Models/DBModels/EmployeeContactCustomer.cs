using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class EmployeeContactCustomer
    {
        public EmployeeContactCustomer()
        {
            Customer = new HashSet<Customer>();
        }

        public string Id { get; set; }
        public string EmployeeId { get; set; }
        public bool? ReceiveEmail { get; set; }
        public bool? MainContact { get; set; }
        public string Note { get; set; }
        public bool? Status { get; set; }

        public ICollection<Customer> Customer { get; set; }
    }
}
