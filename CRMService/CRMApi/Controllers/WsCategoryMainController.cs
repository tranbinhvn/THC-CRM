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
    public class WsCategoryMainController : Controller
    {
        private readonly CRMContext _context;
        private CategoryMainService _cateMain;

        public WsCategoryMainController(CRMContext context)
        {
            _context = context;
            _cateMain = new CategoryMainService(_context);

        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<CategoryMainDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
            //    resBody.totalRecord = 0;
                resBody.result = _cateMain.gets();
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
                return new ObjectResult(new List<CategoryMainDto>());
            }
             int total = 0;
            var bbList = _cateMain.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<CategoryMainDto>>();
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
            var resBody = new ResponeBodyModel<CategoryMainDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _cateMain.get(id);
            return new ObjectResult(resBody);
        }

        [Route("s={value}")]
        public IActionResult Get_Search(string value)
        {
            var resBody = new ResponeBodyModel<List<CategoryMainDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                if (value == null)
                {
                    resBody.result = _cateMain.gets();
                }
                else
                {
                    resBody.result = _cateMain.get_search(value);
                }
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
        public IActionResult Create([FromBody] CategoryMainDto value)
        {
            string result = _cateMain.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] CategoryMainDto value)
        {
            string result = _cateMain.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _cateMain.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _cateMain.delete(id);
            return new ObjectResult(result);
        }
    }
}
