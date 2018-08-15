using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CRMApi.ImpServices
{
    public class ProductFashtionImagesService : IProductFashtionImagesService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ProductFashtionImagesService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductFashtionImages, ProductFashtionImagesDto>();
                cfg.CreateMap<ProductFashtionImagesDto, ProductFashtionImages>();
    //            cfg.CreateMap<ImagesFashtion, ImagesFashtionDto>().ForMember(i => i.ProductFashtionImages, opt => opt.Ignore());
                cfg.CreateMap<ProductFashtion, ProductFashtionDto>().ForMember(p => p.ProductFashtionImages, opt => opt.Ignore());

            }).CreateMapper();

        }

        public ProductFashtionImagesDto get(string id)
        {
            try
            {
                ProductFashtionImages bb = _context.ProductFashtionImages.Find(id);
                _context.Entry(bb).Reference(b => b.ImagesFashtion).Load();
                _context.Entry(bb).Reference(b => b.ProductFashtion).Load();
                return mapper.Map<ProductFashtionImages, ProductFashtionImagesDto>(bb);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public List<ProductFashtionImagesDto> gets()
        {
            try
            {
                var tproductFashtionList = _context.ProductFashtionImages.ToList();
                return mapper.Map<List<ProductFashtionImages>, List<ProductFashtionImagesDto>>(tproductFashtionList);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ProductFashtionImagesDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var bbList = _context.ProductFashtionImages;
                total = bbList.Count();
                if (total <= 0  || total < skipSize)
                {
                    total = 0;
                    return new List<ProductFashtionImagesDto>();
                }
                var result = bbList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ProductFashtionImages>, List<ProductFashtionImagesDto>>(result);
            }
            catch (Exception)
            {
                total = 0;
                return new List<ProductFashtionImagesDto>();
            }
        }

        public string create(ProductFashtionImagesDto tProductFashtionImagesDto)
        {
            try
            {
                ProductFashtionImages tProductFashtionImagesNew = mapper.Map<ProductFashtionImagesDto, ProductFashtionImages>(tProductFashtionImagesDto);
                tProductFashtionImagesNew.Id = Guid.NewGuid().ToString();
 //               tProductFashtionImagesNew.CreateDate = DateTime.Now;

                _context.ProductFashtionImages.Add(tProductFashtionImagesNew);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

      //Update
        public string update(ProductFashtionImagesDto tProductFashtionImagesDto)
        {
            try
            {
                ProductFashtionImages tProductFashtionImagesUpdate = _context.ProductFashtionImages.Find(tProductFashtionImagesDto.Id);
                if (tProductFashtionImagesUpdate == null)
                {
                    return "1";
                }
                tProductFashtionImagesUpdate.Id = tProductFashtionImagesDto.Id;
                tProductFashtionImagesUpdate.ImagesFashtionId = tProductFashtionImagesDto.ImagesFashtionId;
                tProductFashtionImagesUpdate.ProductFashtionId = tProductFashtionImagesDto.ProductFashtionId;
                tProductFashtionImagesUpdate.Status = tProductFashtionImagesDto.Status;               

                _context.ProductFashtionImages.Update(tProductFashtionImagesUpdate);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string delete(string id)
        {
            try
            {
                ProductFashtionImages tProductFashtionImagesRemove = _context.ProductFashtionImages.Find(id);
                if (tProductFashtionImagesRemove == null)
                {
                    return "1";
                }

                _context.ProductFashtionImages.Remove(tProductFashtionImagesRemove);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }

        public string lockItem(string id)
        {
            try
            {
                ProductFashtionImages tProductFashtionImagesBlock = _context.ProductFashtionImages.Find(id);
                if (tProductFashtionImagesBlock == null)
                {
                    return "1";
                }
                tProductFashtionImagesBlock.Status = false;

                _context.ProductFashtionImages.Update(tProductFashtionImagesBlock);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
    }
}
