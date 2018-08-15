using CRMApi.ImpServices;
using CRMApi.Models.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace CRMApi.Controllers
{
    [Route("THC-CRM/[controller]")]
    public class WsAuthController : Controller
    {
        private readonly CRMContext _context;
        private AccountService_bak _accountService;

        public WsAuthController(CRMContext context)
        {
            _context = context;
            _accountService = new AccountService_bak(_context);
           
        }
    }
}
