﻿using System;
using System.Collections.Generic;

namespace CRMApi.Models.DBModels
{
    public partial class ImagesFashtion
    {
        public string Id { get; set; }
        public string ImageUrl { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
    }
}
