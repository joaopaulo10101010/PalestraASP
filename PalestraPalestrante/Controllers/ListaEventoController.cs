using Microsoft.AspNetCore.Mvc;
using PalestraPalestrante.Models;
using PalestraPalestrante.Repositorio;

namespace PalestraPalestrante.Controllers
{
    public class ListaEventoController : Controller
    {
        private readonly ListaRepositorio listaRepositorio;

        public ListaEventoController(IConfiguration configuration)
        {
            listaRepositorio = new ListaRepositorio(configuration.GetConnectionString("MySQLConnection") ?? "");
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ListaGeral()
        {
            ListaGeral lista = new ListaGeral();

            lista.eventos = listaRepositorio.PegarListaEventos();
            lista.arealist = listaRepositorio.PegarListaArea();

            return View(lista);
        }

        public IActionResult CadastroEvento()
        {
            return View(listaRepositorio.PegarListaArea());
        }

        [HttpPost]
        public IActionResult CadastroEvento(string nomeEvento, DateTime dataEvento, string areaTecnica, IFormFile imagemEvento)
        {
            Console.WriteLine($"O idselecionado é {areaTecnica}");
            MemoryStream memoryStream = new MemoryStream();
            imagemEvento.CopyTo(memoryStream);

            Eventos eventos = new Eventos()
            {
                nome_evento = nomeEvento,
                data = dataEvento,
                imagem_evento = memoryStream.ToArray(),
                id_area = Convert.ToInt32(areaTecnica)
            };

            listaRepositorio.AdicionarNovoEvento(eventos);

            return RedirectToAction("ListaGeral");
        }
    }
}
