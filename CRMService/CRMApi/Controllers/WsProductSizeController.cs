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
    public class WsProductSizeController : Controller
    {
        private readonly CRMContext _context;
        private ProductSizeService _productSizeService;

        public WsProductSizeController(CRMContext context)
        {
            _context = context;
            _productSizeService = new ProductSizeService(_context);
        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<ProductSizeDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
            //    resBody.totalRecord = _productSizeService.gets().Count;
                resBody.result = _productSizeService.gets();
                resBody.totalRecord = resBody.result.Count;
            }
            catch (Exception ex)
            {
                resBody.errorMessage = ex.ToString();
            }
 
            return new ObjectResult(resBody);
        }

        // GET api/values/page/size 
        //get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<ProductSizeDto>());
            }
            int total = 0;
            var bList = _productSizeService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<ProductSizeDto>>();
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
            var resBody = new ResponeBodyModel<ProductSizeDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _productSizeService.get(id);
            return new ObjectResult(resBody);
        }

        //Search
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<ProductSizeDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _productSizeService.get_search(value);
                resBody.totalRecord = resBody.result.Count;
            }
            catch (NullReferenceException)
            {
                resBody.errorMessage = "404";
            }
            catch (Exception ex)
            {
                resBody.errorMessage = ex.ToString();
            }

            return new ObjectResult(resBody);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody] ProductSizeDto value)
        {
            string result = _productSizeService.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] ProductSizeDto value)
        {
            string result = _productSizeService.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _productSizeService.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _productSizeService.delete(id);
            return new ObjectResult(result);
        }
    }
}
