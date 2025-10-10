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

        public List<AreaAtuacao> PegarListaArea()
        {
            List<AreaAtuacao> list = new List<AreaAtuacao>();

            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "select * from AreaAtuacao";
                        var rd = cmd.ExecuteReader();
                        while (rd.Read())
                        {
                            AreaAtuacao area = new AreaAtuacao()
                            {
                                Id_area = rd.GetInt32("id_area"),
                                nome = rd.GetString("nome_area")
                            };

                            list.Add(area);
                        }
                        return list;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro: {ex.Message}");
                return null;
            }
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
                                nome_evento = rd.GetString("nome_evento"),
                                data = rd.GetDateTime("data"),
                                incricao_ativa = rd.GetBoolean("inscricao_ativa"),
                            };

                            if (rd.IsDBNull("imagem_evento") == false)
                            {
                                eventos.imagem_evento = rd["imagem_evento"] as byte[];
                                eventos.caminho_imagem = salvarByteLocal(rd["imagem_evento"] as byte[], rd.GetString("nome_evento").Replace(" ", "_"), ".png");
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

        public void AdicionarNovoEvento(Eventos eventos)
        {
            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "insert into Eventos(nome_evento,id_area,data,imagem_evento) values (@nome,@id,@data,@img)";
                        cmd.Parameters.AddWithValue("@nome", eventos.nome_evento);
                        cmd.Parameters.AddWithValue("@id", eventos.id_area);
                        cmd.Parameters.AddWithValue("@data", eventos.data);
                        cmd.Parameters.AddWithValue("@img", eventos.imagem_evento);
                        cmd.ExecuteNonQuery();
                    }
                    Console.WriteLine("Evento Cadastrado com sucesso");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"O correu um erro: {ex.Message}");
            }
        }

        private string salvarByteLocal(byte[] bytes, string nome, string formato)
        {
            try
            {
                string nomedoarquivo = $"{nome}." + formato;
                string caminhoFinal = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "image", "fromdb", nomedoarquivo);
                System.IO.File.WriteAllBytes(caminhoFinal, bytes);
                string caminhoParaRetorno = "/assets/image/fromdb/" + nomedoarquivo;
                return caminhoParaRetorno;
            }
            catch
            {
                Console.WriteLine("Erro ao salvar localmente a imagem");
                return "erro";
            }
        }

        public void AdicionarNovoPalestra(Palestra palestra)
        {
            try
            {
                using (Conexao db = new Conexao(_connectionString))
                {
                    using (MySqlCommand cmd = db.MySqlCommand())
                    {
                        cmd.CommandText = "insert into Palestras(id_evento,id_palestrante,descricao_palestra,id_area) values (@idevento,@idpales,@desc,@area)";
                        cmd.Parameters.AddWithValue("@idevento", palestra.id_evento);
                        cmd.Parameters.AddWithValue("@idpales", palestra.id_palestrante);
                        cmd.Parameters.AddWithValue("@desc", palestra.descricao_palestra);
                        cmd.Parameters.AddWithValue("@area", palestra.id_area);
                        cmd.ExecuteNonQuery();
                    }
                    Console.WriteLine("Evento Cadastrado com sucesso");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"O correu um erro: {ex.Message}");
            }
        }






    }
}
