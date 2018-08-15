using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface ICategoryMainService
    {
        List<CategoryMainDto> gets();
        List<CategoryMainDto> getPaging(int page, int size, out int total);
        CategoryMainDto get(string id);
        string create(CategoryMainDto tCategoryMainDto);
        string update(CategoryMainDto tCategoryMainDto);
        string delete(string id);
        string lockItem(string id);
    }
}
