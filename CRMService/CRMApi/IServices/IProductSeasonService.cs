using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductSeasonService
    {
        List<ProductSeasonDto> gets();
        List<ProductSeasonDto> getPaging(int page, int size, out int total);
        ProductSeasonDto get(string id);
        string create(ProductSeasonDto tProductSeason);
        string update(ProductSeasonDto tProductSeason);
        string delete(string id);
        string lockItem(string id);
    }
}
