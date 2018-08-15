using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface ICountryService
    {
        List<CountryDto> gets();
        List<CountryDto> getPaging(int page, int size, out int total);
        CountryDto get(string id);
        string create(CountryDto tCountryDto);
        string update(CountryDto tCountryDto);
        string delete(string id);
        string lockItem(string id);
    }
}
