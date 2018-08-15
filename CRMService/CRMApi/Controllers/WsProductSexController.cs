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
    public class WsProductSexController : Controller
    {
        private readonly CRMContext _context;
        private ProductSexService _productSexService;

        public WsProductSexController(CRMContext context)
        {
            _context = context;
            _productSexService = new ProductSexService(_context);
        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<ProductSexDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
         //   resBody.totalRecord = _productSexService.gets().Count;
            resBody.result = _productSexService.gets();
            resBody.totalRecord = resBody.result.Count;
            return new ObjectResult(resBody);
        }

        // GET api/values/page/size 
        //get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<ProductSexDto>());
            }
            int total = 0;
            var productSexList = _productSexService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<ProductSexDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = productSexList;
            return new ObjectResult(resBody);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<ProductSexDto>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.totalRecord = 0;
                resBody.result = _productSexService.get(id);
            }
            catch (Exception ex)
            {
                resBody.errorMessage = ex.ToString();
            }
 
            return new ObjectResult(resBody);
        }

        //Search
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<ProductSexDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _productSexService.get_search(value);
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
        public IActionResult Create([FromBody] ProductSexDto value)
        {
            string result = _productSexService.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] ProductSexDto value)
        {
            string result = _productSexService.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _productSexService.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _productSexService.delete(id);
            return new ObjectResult(result);
        }
    }
}
