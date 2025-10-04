using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Crypto.Generators;
using PalestraPalestrante.Repositorio;
using PalestraPalestrante.Models;

namespace PalestraPalestrante.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly UsuarioRepositorio usuarioRepositorio;
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
            Console.WriteLine($"O Nome: {nome}\nO Cpf: {cpf}\nO Email: {email}\nO TipoUsuario: {tipoUsuario}\nO Senha: {senha}\nO ConfirmarSenha: {confirmarSenha}\n");

            if (senha == confirmarSenha)
            {
                Usuario usuario = new Usuario(nome, cpf, email, senha, tipoUsuario);
                usuarioRepositorio.CadastrarNovoUsuarioBase(usuario);
                ViewBag.CadastroLog = "Cadastro Realizado com sucesso";
                return RedirectToAction("Login");
            }
            else
            {
                ViewBag.CadastroLog = "As senhas não são iguais, confirme elas novamente";
                return View();
            }

        }

        public IActionResult Login()
        {
            return View();
        }

    }
}
