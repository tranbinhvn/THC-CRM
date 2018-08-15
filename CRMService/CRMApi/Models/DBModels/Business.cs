using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class Business
    {
        public Business()
        {
            Customer = new HashSet<Customer>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<Customer> Customer { get; set; }
    }
}
