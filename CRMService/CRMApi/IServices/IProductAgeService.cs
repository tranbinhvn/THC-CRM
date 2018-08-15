using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductAgeService
    {
        List<ProductAgeDto> gets();
        List<ProductAgeDto> getPaging(int page, int size, out int total);
        ProductAgeDto get(string id);
        string create(ProductAgeDto ProductAgeDto);
        string update(ProductAgeDto ProductAgeDto);
        string delete(string id);
        string lockItem(string id);
    }
}
