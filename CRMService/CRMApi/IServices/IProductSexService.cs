using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductSexService
    {
        List<ProductSexDto> gets();
        List<ProductSexDto> getPaging(int page, int size, out int total);
        ProductSexDto get(string id);
        string create(ProductSexDto tProductSex);
        string update(ProductSexDto tProductSex);
        string delete(string id);
        string lockItem(string id);
    }
}
