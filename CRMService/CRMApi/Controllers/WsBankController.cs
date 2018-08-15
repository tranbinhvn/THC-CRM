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
        public class WsBankController : Controller
    {
        private readonly CRMContext _context;
        private BankService _bService;

        public WsBankController(CRMContext context)
        {
            _context = context;
            _bService = new BankService(_context);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<BankDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _bService.gets();
            return new ObjectResult(resBody);
        }


        // get api/values/page/size
        // get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0  || size <= 0)
            {
                return new ObjectResult(new List<BankDto>());
            }
            int total = 0;
            var bList = _bService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<BankDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = bList;
            return new ObjectResult(resBody);
        }
        // Get api/values -- get one 
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<BankDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _bService.get(id);
            return new ObjectResult(resBody);
        }
        //[HttpGet("{CatId}")]
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<BankDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _bService.search(value);
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

        //POST api/value
        [HttpPost] 
        public IActionResult Create([FromBody] BankDto value)
        {
            string result = _bService.create(value);
            return new ObjectResult(result);
        }
        // Put 
        [HttpPut]
        public IActionResult Update([FromBody] BankDto value)
        {
            string result = _bService.update(value);
            return new ObjectResult(result);
        }
        [HttpPut("{id}")]
        public IActionResult lockItem(string id)
        {
            string result = _bService.lockItem(id);
            return new ObjectResult(result);
        }

        // Delete
        [HttpDelete("{id}")]
        public IActionResult delete(string id)
        {
            string result = _bService.delete(id);
            return new ObjectResult(result);
        }
    }
  
}
