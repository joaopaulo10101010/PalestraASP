using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PalestraPalestrante.Authenticacao;
using PalestraPalestrante.Models;
using PalestraPalestrante.Repositorio;
using WebApplication3.Authenticacao;

namespace PalestraPalestrante.Controllers
{
    [SessionAuthorize(RoleAnyOf = "Admin, Participante, Publico")]
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

        [SessionAuthorize(RoleAnyOf = "Admin, Publico")]
        public IActionResult PalestrantesEvento(int id_evento)
        {
            return View(listaRepositorio.PegarEvento(id_evento));
        }
        [SessionAuthorize(RoleAnyOf = "Admin, Participante, Publico")]
        public IActionResult ListaGeral()
        {
            ListaGeral lista = new ListaGeral();

            lista.eventos = listaRepositorio.PegarListaEventos();
            lista.arealist = listaRepositorio.PegarListaArea();

            return View(lista);
        }
        
        [SessionAuthorize(RoleAnyOf = "Admin")]
        public IActionResult CadastroEvento()
        {
            return View(listaRepositorio.PegarListaArea());
        }

        [SessionAuthorize(RoleAnyOf = "Admin")]
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


        [SessionAuthorize(RoleAnyOf = "Admin, Participante")]
        public IActionResult CadastrarPalestra(int id_evento)
        {
            ViewBag.id_evento = id_evento;

            return View(listaRepositorio.PegarListaArea());
        }

        [SessionAuthorize(RoleAnyOf = "Admin, Participante")]
        [HttpPost]
        public IActionResult CadastrarPalestra(string descricao_palestra, int id_area, int id_evento)
        {
            try
            {
                Palestra palestra = new Palestra()
                {
                    id_area = id_area,
                    id_evento = id_evento,
                    descricao_palestra = descricao_palestra,
                    cpf_usuario = HttpContext.Session.GetString(SessionKeys.cpf_usuario)
                };
                listaRepositorio.AdicionarNovoPalestra(palestra);
                TempData["cadastropalestra"] = "Cadastro realizado com sucesso";
            }
            catch(Exception ex)
            {
                TempData["cadastropalestra"] = $"Ocorreu um erro no cadastro: {ex.Message}";
                return View();
            }


            return RedirectToAction("ListaGeral");
        }
        [SessionAuthorize(RoleAnyOf = "Admin")]
        public IActionResult DeletarEvento(int id_evento)
        {
            if (listaRepositorio.ApagarEvento(id_evento))
            {
                TempData["MenssagemGerenciaEvento"] = "Evento Removido com sucesso";
            }
            else
            {
                TempData["MenssagemGerenciaEvento"] = "Não foi possivel Remover esse Evento";
            }

            return RedirectToAction("ListaGeral","ListaEvento");
        }
    }
}
