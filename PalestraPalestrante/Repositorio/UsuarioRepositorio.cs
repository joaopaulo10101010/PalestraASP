using Microsoft.AspNetCore.Mvc.Filters;
using MySql.Data.MySqlClient;
using PalestraPalestrante.Authenticacao;
using PalestraPalestrante.Database;
using PalestraPalestrante.Models;
using System.Configuration;
using PalestraPalestrante.Authenticacao;
using System.Data;

namespace PalestraPalestrante.Repositorio
{
    public class UsuarioRepositorio
    {
        private readonly string _connectionString = "";
        public UsuarioRepositorio(string connection)
        {
            _connectionString = connection;
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

        public Usuario RealizarLoginUsuario(Usuario usuario)
        {
            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "select * from Usuario where cpf_usuario=@cpf";
                        cmd.Parameters.AddWithValue("@cpf", usuario.GetCpf());
                        var rd = cmd.ExecuteReader();
                        if (rd.Read())
                        {
                            Usuario dbusuario = new Usuario(
                                rd.GetString("cpf_usuario"),
                                rd.GetString("nome_usuario"),
                                rd.GetString("email_usuario"),
                                rd.GetString("senha_usuario"),
                                rd.GetString("cargo_usuario")
                                );
                            dbusuario.SetDataCadastro(rd.GetDateTime("data_cadastro_usuario"));

                            if(usuario.GetSenha() == dbusuario.GetSenha())
                            {
                                return dbusuario;
                            }
                            
                        }
                        return null;
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro: {ex.Message}");
                return null;
            }
        }

    }
}
