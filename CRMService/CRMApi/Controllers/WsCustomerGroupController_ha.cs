using CRMApi.ImpServices;
using CRMApi.Models;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsCustomerGroupController_ha : Controller
    {
        private readonly CRMContext _context;
        private CustomerGroupService _cgService;

        public WsCustomerGroupController_ha(CRMContext context)
        {
            _context = context;
            _cgService = new CustomerGroupService(_context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new ObjectResult(_cgService.gets());
        }

        // get api/values/page/size
        // get pagging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {
            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<CustomerGroupDto>());
            }
            int total = 0;
            var cgList = _cgService.getPaging(page, size, out total);
            return new ObjectResult(cgList);
        }

        // Get api/values -- get one 
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return new ObjectResult(_cgService.get(id));
        }

        //POST api/value
        [HttpPost]
        public IActionResult Create([FromBody] CustomerGroupDto value)
        {
            string result = _cgService.create(value);
            return new ObjectResult(result);
        }

        // Put 
        [HttpPut]
        public IActionResult Update([FromBody] CustomerGroupDto value)
        {
            string result = _cgService.update(value);
            return new ObjectResult(result);
        }
        [HttpPut("{id}")]
        public IActionResult lockItem(string id)
        {
            string result = _cgService.lockItem(id);
            return new ObjectResult(result);
        }

        // Delete
        [HttpDelete("{id}")]
        public IActionResult delete(string id)
        {
            string result = _cgService.delete(id);
            return new ObjectResult(result);
        }
    }
}
