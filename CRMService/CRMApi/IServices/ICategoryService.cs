using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface ICategoryService
    {
        List<CategoryDto> gets();
        List<CategoryDto> getPaging(int page, int size, out int total);
        CategoryDto get(string id);
        string create(CategoryDto categoryDto);
        string update(CategoryDto categoryDto);
        string delete(string id);
        string lockItem(string id);

    }
}
