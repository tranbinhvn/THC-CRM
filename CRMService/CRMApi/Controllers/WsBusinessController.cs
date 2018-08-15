using CRMApi.ImpServices;
using CRMApi.Models.DBModels;
using CRMApi.Models;
using CRMApi.Models.ResponeModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsBusinessController : Controller
    {
        private readonly CRMContext _context;
        private BusinessService _bsService;

        public WsBusinessController(CRMContext context)
        {
            _context = context;
            _bsService = new BusinessService(_context);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<BusinessDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _bsService.gets();
            return new ObjectResult(resBody);
        }


        // get api/values/page/size
        // get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<BusinessDto>());
            }
            int total = 0;
            var bsList = _bsService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<BusinessDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = bsList;
            return new ObjectResult(resBody);
        }
        // Get api/values -- get one 
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<BusinessDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _bsService.get(id);
            return new ObjectResult(resBody);
        }
        //[HttpGet("{CatId}")]
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<BusinessDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _bsService.search(value);
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
        public IActionResult Create([FromBody] BusinessDto value)
        {
            string result = _bsService.create(value);
            return new ObjectResult(result);
        }
        // Put 
        [HttpPut]
        public IActionResult Update([FromBody] BusinessDto value)
        {
            string result = _bsService.update(value);
            return new ObjectResult(result);
        }
        [HttpPut("{id}")]
        public IActionResult lockItem(string id)
        {
            string result = _bsService.lockItem(id);
            return new ObjectResult(result);
        }

        // Delete
        [HttpDelete("{id}")]
        public IActionResult delete(string id)
        {
            string result = _bsService.delete(id);
            return new ObjectResult(result);
        }
    }

}
