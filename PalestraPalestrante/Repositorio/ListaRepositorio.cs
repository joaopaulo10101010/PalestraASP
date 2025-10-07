using PalestraPalestrante.Models;
using PalestraPalestrante.Database;
using MySql.Data.MySqlClient;
using System.Data;

namespace PalestraPalestrante.Repositorio

{
    public class ListaRepositorio
    {
        private readonly string _connectionString = "";

        public ListaRepositorio(string connection)
        {
            _connectionString = connection;
        }

        public List<Eventos> PegarListaEventos()
        {
            List<Eventos> eventlist = new List<Eventos>();
            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "select * from Eventos";
                        var rd = cmd.ExecuteReader();
                        while (rd.Read())
                        {
                            Eventos eventos = new Eventos()
                            {
                                id_evento = rd.GetInt32("id_evento"),
                                id_area = rd.GetInt32("id_area"),
                                nome_evento = rd.GetString(""),
                                data = rd.GetDateTime(""),
                                incricao_ativa = rd.GetBoolean("")
                            };

                            if (rd.IsDBNull("imagem_evento") == false)
                            {
                                eventos.imagem_evento = rd["imagem_evento"] as byte[];
                            }
                            eventlist.Add(eventos);
                        }
                        return eventlist;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro: {ex.Message}");
                return null;
            }
        }

        public void AdicionarNovoEvento()
        {
            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "insert into Eventos(nome_evento,nome_area,email_usuario,senha_usuario) values (@cpf,@nome,@email,@senha)";
                        cmd.Parameters.AddWithValue("@cpf", usuario.GetCpf());
                        cmd.Parameters.AddWithValue("@nome", usuario.GetNome());
                        cmd.Parameters.AddWithValue("@email", usuario.GetEmail());
                        cmd.Parameters.AddWithValue("@senha", usuario.GetSenha());
                        cmd.ExecuteNonQuery();
                    }
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine($"O correu um erro: {ex.Message}");
            }
        }



    }
}
