using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProductFashtionImagesService
    {
        List<ProductFashtionImagesDto> gets();
        List<ProductFashtionImagesDto> getPaging(int page, int size, out int total);
        ProductFashtionImagesDto get(string id);
        string create(ProductFashtionImagesDto tProductFashtionImages);
        string update(ProductFashtionImagesDto tProductFashtionImages);
        string delete(string id);
        string lockItem(string id);
    }
}
