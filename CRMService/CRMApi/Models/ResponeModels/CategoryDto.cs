using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class CategoryDto
    {

        public string Id { get; set; }
        public string Name { get; set; }
        public string CategoryMainId { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public CategoryMainDto CategoryMain { get; set; }
       // public ICollection<CategorySubDto> CategorySub { get; set; }
    }
}
