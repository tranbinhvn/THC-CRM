﻿using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class CategoryMainDto
    {
        public CategoryMainDto()
        {
            Category = new HashSet<CategoryDto>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<CategoryDto> Category { get; set; }
    }
}