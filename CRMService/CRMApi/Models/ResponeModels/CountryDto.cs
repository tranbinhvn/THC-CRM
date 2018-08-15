using System;
using System.Collections.Generic;

namespace CRMApi.Models.ResponeModels
{
    public partial class CountryDto
    {
        public CountryDto()
        {
            Province = new HashSet<ProvinceDto>();
        }

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }

        public ICollection<ProvinceDto> Province { get; set; }
    }
}
