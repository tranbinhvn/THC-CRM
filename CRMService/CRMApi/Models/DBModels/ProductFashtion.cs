using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class ProductFashtion
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal? RetailPrice { get; set; }
        public decimal? WholesalePrice { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
    }
}
