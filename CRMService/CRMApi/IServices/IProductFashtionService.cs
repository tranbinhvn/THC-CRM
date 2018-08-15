using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductFashtionService
    {
        List<ProductFashtionDto> gets();
        List<ProductFashtionDto> getPaging(int page, int size, out int total);
        ProductFashtionDto get(string id);
        string create(ProductFashtionDto tProductFashtion);
        string update(ProductFashtionDto tProductFashtion);
        string delete(string id);
        string lockItem(string id);
    }
}
