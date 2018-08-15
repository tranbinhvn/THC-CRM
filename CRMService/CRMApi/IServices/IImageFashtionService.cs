using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMApi.IServices
{
    interface IImageFashtionService
    {
        List<ImagesFashtionDto> gets();
        List<ImagesFashtionDto> getPaging(int page, int size, out int total);
        ImagesFashtionDto get(string id);
        string create(ImagesFashtionDto imagesFashtionDto);
        string update(ImagesFashtionDto imagesFashtionDto);
        string delete(string id);
        string lockItem(string id);
    }
}
