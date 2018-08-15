using CRMApi.ImpServices;
using CRMApi.Models;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;


namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsProductFashtionImagesController : Controller
    {
        private readonly CRMContext _context;
        private ProductFashtionImagesService _tprdFIages;

        public WsProductFashtionImagesController(CRMContext context)
        {
            _context = context;
            _tprdFIages = new ProductFashtionImagesService(_context);
        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<ProductFashtionImagesDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
             //   resBody.totalRecord = 0;
                resBody.result = _tprdFIages.gets();
                resBody.totalRecord = resBody.result.Count;
               
            }
            catch (Exception) { }
             return new ObjectResult(resBody);
        }

        // GET api/values/page/size 
        //get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<ProductFashtionImagesDto>());
            }
            int total = 0;
            var bList = _tprdFIages.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<ProductFashtionImagesDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = bList;
            return new ObjectResult(resBody);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return new ObjectResult(_tprdFIages.get(id));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody] ProductFashtionImagesDto value)
        {
            string result = _tprdFIages.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] ProductFashtionImagesDto value)
        {
            string result = _tprdFIages.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _tprdFIages.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _tprdFIages.delete(id);
            return new ObjectResult(result);
        }
    }
}
