using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductSizeService
    {
        List<ProductSizeDto> gets();
        List<ProductSizeDto> getPaging(int page, int size, out int total);
        ProductSizeDto get(string id);
        string create(ProductSizeDto tProductSize);
        string update(ProductSizeDto tProductSize);
        string delete(string id);
        string lockItem(string id);
    }
}
