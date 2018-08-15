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
    public class WsProductSeasonController : Controller
    {
        private readonly CRMContext _context;
        private ProductSeasonService _productSeasonService;

        public WsProductSeasonController(CRMContext context)
        {
            _context = context;
            _productSeasonService = new ProductSeasonService(_context);
        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<ProductSeasonDto>>();     
            
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
               // resBody.totalRecord = _productSeasonService.gets().Count;
                resBody.result = _productSeasonService.gets();
                resBody.totalRecord = resBody.result.Count;
            }catch (Exception ex)
            {
                resBody.errorMessage = "Error: " + ex.ToString();
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
                return new ObjectResult(new List<ProductSeasonDto>());
            }
            int total = 0;
            var pSeasonList = _productSeasonService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<ProductSeasonDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = pSeasonList;
            return new ObjectResult(resBody);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<ProductSeasonDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _productSeasonService.get(id);
            return new ObjectResult(resBody);
        }

        //Search
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<ProductSeasonDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _productSeasonService.get_search(value);
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
        public IActionResult Create([FromBody] ProductSeasonDto value)
        {
            string result = _productSeasonService.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] ProductSeasonDto value)
        {
            string result = _productSeasonService.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _productSeasonService.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _productSeasonService.delete(id);
            return new ObjectResult(result);
        }
    }
}
