using AutoMapper;
using CRMApi.IServices;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CRMApi.ImpServices
{
    public class ImagesFashtionService : IImageFashtionService
    {
        private CRMContext _context;
        private IMapper mapper;
        public ImagesFashtionService(CRMContext context)
        {
            _context = context;
            mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ImagesFashtion, ImagesFashtionDto>();
                cfg.CreateMap<ImagesFashtionDto, ImagesFashtion>();

            }).CreateMapper();
        }
        public ImagesFashtionDto get(string id)
        {
            try
            {
                ImagesFashtion imgf = _context.ImagesFashtion.Find(id);
                return mapper.Map<ImagesFashtion, ImagesFashtionDto>(imgf);

            }
            catch (Exception)
            {
                return null;
            }
        }
        public List<ImagesFashtionDto> gets()
        {
            try
            {
                var imgfList = _context.ImagesFashtion.ToList();
                return mapper.Map<List<ImagesFashtion>, List<ImagesFashtionDto>>(imgfList);
            }
            catch   (Exception)
            {
                return null;
            }
        }
        public List<ImagesFashtionDto> getPaging(int page, int size, out int total)
        {
            try
            {
                var skipSize = size * (page - 1);
                var imgfList = _context.ImagesFashtion;
                total = imgfList.Count();
                if (total <- 0 || total < skipSize )
                {
                    total = 0;
                    return new List<ImagesFashtionDto>();
                }
                var result = imgfList.Skip(skipSize).Take(size).ToList();
                return mapper.Map<List<ImagesFashtion>, List<ImagesFashtionDto>>(result);

            }
            catch (Exception)
            {
                total = 0;
                return new List<ImagesFashtionDto>();
            }
        }
        public string create(ImagesFashtionDto  imagesFashtionDto )
        {
            try
            {
                ImagesFashtion imagesFashtionNew = mapper.Map<ImagesFashtionDto, ImagesFashtion>(imagesFashtionDto);
                imagesFashtionNew.Id = Guid.NewGuid().ToString();
                imagesFashtionNew.CreateDate = DateTime.Now;

                _context.ImagesFashtion.Add(imagesFashtionNew);
                _context.SaveChanges();
                return "0";
            }
            catch
            {
                return "1";
            }
        }
        public string update(ImagesFashtionDto imagesFashtionDto)
        {
            try
            {
                ImagesFashtion imagesFashtionUpdate = _context.ImagesFashtion.Find(imagesFashtionDto.Id);
                imagesFashtionUpdate.Id = imagesFashtionDto.Id;
                imagesFashtionUpdate.ImageUrl = imagesFashtionDto.ImageUrl;
                imagesFashtionUpdate.Status = imagesFashtionDto.Status;
                imagesFashtionUpdate.CreateDate = imagesFashtionDto.CreateDate;
                imagesFashtionUpdate.CreateUser = imagesFashtionDto.CreateUser;

                _context.ImagesFashtion.Update(imagesFashtionUpdate);
                _context.SaveChanges();
                return "0";
            }
            catch
            {
                return "1";
            }
        }
        public string delete(string id)
        {
            try
            {
                ImagesFashtion imagesFashtionRemove = _context.ImagesFashtion.Find(id);
                if(imagesFashtionRemove == null)
                {
                    return "1";
                }
                _context.ImagesFashtion.Remove(imagesFashtionRemove);
                _context.SaveChanges();
                return "0";
            }
            catch (Exception)
            {
                return "1";
            }
        }
        public string   lockItem(string id)
        {
            try
            {
                ImagesFashtion imagesFashtionLock = _context.ImagesFashtion.Find(id);
                if (imagesFashtionLock == null)
                {
                    return "1";
                }
                imagesFashtionLock.Status = !imagesFashtionLock.Status;
                _context.ImagesFashtion.Update(imagesFashtionLock);
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
