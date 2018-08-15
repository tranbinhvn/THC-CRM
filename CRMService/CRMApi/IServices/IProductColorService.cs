using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductColorService
    {
        List<ProductColorDto> gets();
        List<ProductColorDto> getPaging(int page, int size, out int total);
        ProductColorDto get(string id);
        string create(ProductColorDto tProductColor);
        string update(ProductColorDto tProductColor);
        string delete(string id);
        string lockItem(string id);
    }
}
