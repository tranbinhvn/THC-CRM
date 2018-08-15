using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IProvinceService
    {
        List<ProvinceDto> gets();
        List<ProvinceDto> getPaging(int page, int size, out int total);
        ProvinceDto get(string id);
        string create(ProvinceDto tProvinceDto);
        string update(ProvinceDto tProvinceDto);
        string delete(string id);
        string lockItem(string id);
    }
}
