﻿using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class Country
    {
        public Country()
        {
            Province = new HashSet<Province>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<Province> Province { get; set; }
    }
}