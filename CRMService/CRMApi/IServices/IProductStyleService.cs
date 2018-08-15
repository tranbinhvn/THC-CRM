using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductStyleService
    {
        List<ProductStyleDto> gets();
        List<ProductStyleDto> getPaging(int page, int size, out int total);
        ProductStyleDto get(string id);
        string create(ProductStyleDto tProductStyle);
        string update(ProductStyleDto tProductStyle);
        string delete(string id);
        string lockItem(string id);
    }
}
