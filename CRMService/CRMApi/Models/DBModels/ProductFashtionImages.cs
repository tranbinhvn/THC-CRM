using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class ProductFashtionImages
    {
        public string Id { get; set; }
        public string ImagesFashtionId { get; set; }
        public string ProductFashtionId { get; set; }
        public bool? Status { get; set; }

        public ImagesFashtion ImagesFashtion { get; set; }
        public ProductFashtion ProductFashtion { get; set; }
    }
}
