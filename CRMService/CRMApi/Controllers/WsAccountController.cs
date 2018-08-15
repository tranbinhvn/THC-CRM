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
    public class WsAccountController : Controller
    {
        private readonly CRMContext _context;
        private AccountService _accountService;

        public WsAccountController(CRMContext context)
        {
            _context = context;
            _accountService = new AccountService(_context);

        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<AccountDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.totalRecord = 0;
                resBody.result = _accountService.gets();
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
                return new ObjectResult(new List<AccountDto>());
            }
             int total = 0;
            var bbList = _accountService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<AccountDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = bbList;
            return new ObjectResult(resBody);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<AccountDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _accountService.get(id);
            return new ObjectResult(resBody);
        }

        //Search
        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<AccountDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                resBody.result = _accountService.get_search(value);
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
        public IActionResult Create([FromBody] AccountDto value)
        {
            string result = _accountService.create(value);
            return new ObjectResult(result);
        }
      
        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] AccountDto value)
        {
            string result = _accountService.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string username)
        {
            string result = _accountService.block(username);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string username)
        {
            string result = _accountService.delete(username);
            return new ObjectResult(result);
        }
    }
}
