using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class ProductSex
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
    }
}
