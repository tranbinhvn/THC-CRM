using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class CategoryMain
     {  public CategoryMain()
        {
            Category = new HashSet<Category>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }


        public ICollection<Category> Category { get; set; }

    }
}
