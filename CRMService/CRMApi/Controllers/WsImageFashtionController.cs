using CRMApi.ImpServices;
using CRMApi.Models;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsImageFashtionController : Controller
    {
        private readonly CRMContext _context;
        private ImagesFashtionService _imgfService;

        public WsImageFashtionController(CRMContext context)
        {
            _context = context;
            _imgfService = new ImagesFashtionService(_context);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<ImagesFashtionDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _imgfService.gets();
            return new ObjectResult(resBody);
        }

        // get paging
        [HttpGet("{page}/{size}")]
        public IActionResult Get(int page, int size)
        {

            if (page <= 0 || size <= 0)
            {
                return new ObjectResult(new List<ImagesFashtionDto>());
            }
            int total = 0;
            var imgfList = _imgfService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<ImagesFashtionDto>>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = total;
            resBody.result = imgfList;
            return new ObjectResult(resBody);
        }
        // Get api/values -- get one 
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var resBody = new ResponeBodyModel<ImagesFashtionDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _imgfService.get(id);
            return new ObjectResult(resBody);
        }

        //POST api/value
        [HttpPost]
        public IActionResult Create([FromBody] ImagesFashtionDto value)
        {
            string result = _imgfService.create(value);
            return new ObjectResult(result);
        }
        // Put 
        [HttpPut]
        public IActionResult Update([FromBody] ImagesFashtionDto value)
        {
            string result = _imgfService.update(value);
            return new ObjectResult(result);
        }
        [HttpPut("{id}")]
        public IActionResult lockItem(string id)
        {
            string result = _imgfService.lockItem(id);
            return new ObjectResult(result);
        }

        // Delete
        [HttpDelete("{id}")]
        public IActionResult delete(string id)
        {
            string result = _imgfService.delete(id);
            return new ObjectResult(result);
        }
    }

}
