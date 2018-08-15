using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.Models.ResponeModels
{
    public class ProductFashtionDto
    {
        public ProductFashtionDto()
        {
            ProductFashtionImages = new HashSet<ProductFashtionImagesDto>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public decimal? RetailPrice { get; set; }
        public decimal? WholesalePrice { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<ProductFashtionImagesDto> ProductFashtionImages { set; get; }
    }
}
