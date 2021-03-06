﻿using CRMApi.ImpServices;
using CRMApi.Models;
using CRMApi.Models.DBModels;
using CRMApi.Models.ResponeModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;


namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsCategoryController : Controller
    {
        private readonly CRMContext _context;
        private CategoryService _bbService;

        public WsCategoryController(CRMContext context)
        {
            _context = context;
            _bbService = new CategoryService(_context);

        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var resBody = new ResponeBodyModel<List<CategoryDto>>();
            try
            {
                resBody.errorCode = "0";
                resBody.errorMessage = "";
                //   resBody.totalRecord = 0;
                resBody.result = _bbService.gets();
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
                return new ObjectResult(new List<CategoryDto>());
            }
             int total = 0;
            var bbList = _bbService.getPaging(page, size, out total);
            var resBody = new ResponeBodyModel<List<CategoryDto>>();
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
            var resBody = new ResponeBodyModel<CategoryDto>();
            resBody.errorCode = "0";
            resBody.errorMessage = "";
            resBody.totalRecord = 0;
            resBody.result = _bbService.get(id);
            return new ObjectResult(resBody);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody] CategoryDto value)
        {
            string result = _bbService.create(value);
            return new ObjectResult(result);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Update([FromBody] CategoryDto value)
        {
            string result = _bbService.update(value);
            return new ObjectResult(result);
        }

        [HttpPut("{id}")]
        public IActionResult LockItem(string id)
        {
            string result = _bbService.lockItem(id);
            return new ObjectResult(result);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string result = _bbService.delete(id);
            return new ObjectResult(result);
        }
    }
}
