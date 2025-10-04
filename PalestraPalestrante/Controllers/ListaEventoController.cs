using Microsoft.AspNetCore.Mvc;

namespace PalestraPalestrante.Controllers
{
    public class ListaEventoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ListaGeral()
        {
            return View();
        }
    }
}
