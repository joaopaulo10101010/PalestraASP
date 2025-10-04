using System.Configuration;
using MySql.Data.MySqlClient;
using PalestraPalestrante.Database;
using PalestraPalestrante.Models;

namespace PalestraPalestrante.Repositorio
{
    public class UsuarioRepositorio
    {
        private readonly string _connectionString = "";
        public UsuarioRepositorio(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySQLConnection") ?? "";
        }

        public bool CadastrarNovoUsuarioBase(Usuario usuario)
        {
            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "insert into Usuario(cpf_usuario,nome_usuario,email_usuario,senha_usuario) values (@cpf,@nome,@email,@senha)";
                        cmd.Parameters.AddWithValue("@cpf", usuario.GetCpf());
                        cmd.Parameters.AddWithValue("@nome", usuario.GetNome());
                        cmd.Parameters.AddWithValue("@email", usuario.GetEmail());
                        cmd.Parameters.AddWithValue("@senha", usuario.GetSenha());
                        cmd.ExecuteNonQuery();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"O correu um erro: {ex.Message}");
                return false;
            }
        }
    }
}
