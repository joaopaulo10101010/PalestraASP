using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Crypto.Generators;
using PalestraPalestrante.Authenticacao;
using PalestraPalestrante.Models;
using PalestraPalestrante.Repositorio;
using System.Data;
using WebApplication3.Authenticacao;

namespace PalestraPalestrante.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly UsuarioRepositorio usuarioRepositorio;

        public UsuarioController(IConfiguration configuration)
        {
            usuarioRepositorio = new UsuarioRepositorio(configuration.GetConnectionString("MySQLConnection") ?? "");
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CadastrarUsuario()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CadastrarUsuario(string nome, string cpf, string email, string tipoUsuario, string senha, string confirmarSenha)
        {

            try
            {
                if (senha != confirmarSenha)
                {
                    ViewBag.CadastroLog = "As senhas não são iguais, confirme elas novamente";
                    return View();
                }

                cpf = cpf.Replace(".", "").Replace("-", "");
                Usuario usuario = new Usuario(cpf, nome, email, senha, tipoUsuario);
                usuarioRepositorio.CadastrarNovoUsuarioBase(usuario);
                ViewBag.CadastroLog = "Cadastro Realizado com sucesso";
                return RedirectToAction("Login");
            }
            catch(Exception ex)
            {
                ViewBag.CadastroLog = "Não foi possivel realizar esse cadastro, tente outro CPF";
                Console.WriteLine($"occoreu um erro: {ex.Message}");
                TempData["CadastroLog"] = "Não foi possivel realizar esse cadastro, tente outro CPF";
                return RedirectToAction("CadastrarUsuario","Usuario");
            }

        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Sair()
        {
            HttpContext.Session.SetString(SessionKeys.cpf_usuario, "");
            HttpContext.Session.SetString(SessionKeys.nome_usuario, "");
            HttpContext.Session.SetString(SessionKeys.email_usuario, "");
            HttpContext.Session.SetString(SessionKeys.cargo_usuario, "");
            HttpContext.Session.SetString(SessionKeys.data_cadastro_usuario, "");

            return RedirectToAction("Home","Home");
        }

        [HttpPost]
        public IActionResult Login(string cpf, string senha)
        {
            Console.WriteLine($"Esse é o CPF: {cpf} Senha: {senha}");
            Usuario usuario = usuarioRepositorio.RealizarLoginUsuario(new Usuario(cpf = cpf.Replace(".", "").Replace("-", ""),"","",senha));
            if(usuario != null)
            {
                HttpContext.Session.SetString(SessionKeys.cpf_usuario, usuario.GetCpf());
                HttpContext.Session.SetString(SessionKeys.nome_usuario, usuario.GetNome());
                HttpContext.Session.SetString(SessionKeys.email_usuario, usuario.GetEmail());
                HttpContext.Session.SetString(SessionKeys.cargo_usuario, usuario.GetCargo());
                HttpContext.Session.SetString(SessionKeys.data_cadastro_usuario, usuario.GetDataCadastro().ToString());
                return RedirectToAction("ListaGeral", "ListaEvento");
            }
            TempData["LoginLog"] = "Login Incorreto";
            return View();
        }


        [SessionAuthorize(RoleAnyOf = "Admin")]
        public IActionResult GerenciarUsuario()
        {

            return View(usuarioRepositorio.PegarListaUsuario());
        }

        public IActionResult RemoverUsuario(string id)
        {
            if (usuarioRepositorio.ApagarUsuario(id))
            {
                TempData["MenssagemGerenciaUsuario"] = "Usuario Removido com sucesso";
            }
            else
            {
                TempData["MenssagemGerenciaUsuario"] = "Não foi possivel Remover esse Usuario";
            }

            return View();
        }

    }
}
