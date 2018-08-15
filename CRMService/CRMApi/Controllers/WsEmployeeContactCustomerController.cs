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
    public class WsEmployeeContactCustomerController : Controller
    {
        private readonly CRMContext _context;
        private EmployeeContactCustomerService _eccService;

        public WsEmployeeContactCustomerController(CRMContext context)
        {
            _context = context;
            _eccService = new EmployeeContactCustomerService(_context);

        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<EmployeeContactCustomerDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
            //    resBody.totalRecord = 0;
                resBody.result = _eccService.gets();
                resBody.totalRecord = resBody.result.Count;
            }catch (Exception ex)
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
                return new ObjectResult(new List<EmployeeContactCustomerDto>());
            }
             int total = 0;
            var tEmployeeContactCustomerList = _eccService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<EmployeeContactCustomerDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = tEmployeeContactCustomerList;
            return new ObjectResult(resBody);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<EmployeeContactCustomerDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _eccService.get(id);
            return new ObjectResult(resBody);
        }

        //[HttpGet("{CatId}")]
        //Search
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<EmployeeContactCustomerDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _eccService.get_search(value);
                resBody.totalRecord = resBody.result.Count;
            }catch (NullReferenceException)
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
        public IActionResult Create([FromBody] EmployeeContactCustomerDto value)
        {
            string result = _eccService.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] EmployeeContactCustomerDto value)
        {
            string result = _eccService.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _eccService.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _eccService.delete(id);
            return new ObjectResult(result);
        }
    }
}
