using CRMApi.ImpServices;
using CRMApi.Models;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsCategoryController_tuyen : Controller
    {
        private readonly CRMContext _context;
        private CategoryService _cService;

        public WsCategoryController_tuyen(CRMContext context)
        {
            _context = context;
            _cService = new CategoryService(_context);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<CategoryDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _cService.gets();
            return new ObjectResult(resBody);
        }


        // get api/values/page/size
        // get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<CategoryDto>());
            }
            int total = 0;
            var cList = _cService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<CategoryDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = cList;
            return new ObjectResult(resBody);
        }
        // Get api/values -- get one 
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<CategoryDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _cService.get(id);
            return new ObjectResult(resBody);
        }

        //POST api/value
        [HttpPost]
        public IActionResult Create([FromBody] CategoryDto value)
        {
            string result = _cService.create(value);
            return new ObjectResult(result);
        }
        // Put 
        [HttpPut]
        public IActionResult Update([FromBody] CategoryDto value)
        {
            string result = _cService.update(value);
            return new ObjectResult(result);
        }
        [HttpPut("{id}")]
        public IActionResult lockItem(string id)
        {
            string result = _cService.lockItem(id);
            return new ObjectResult(result);
        }

        // Delete
        [HttpDelete("{id}")]
        public IActionResult delete(string id)
        {
            string result = _cService.delete(id);
            return new ObjectResult(result);
        }
    }

}
