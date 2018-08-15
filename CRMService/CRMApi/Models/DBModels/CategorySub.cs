using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class CategorySub
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CategoryId { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public Category Category { get; set; }
    }
}
