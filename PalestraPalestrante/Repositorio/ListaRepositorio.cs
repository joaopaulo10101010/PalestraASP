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
                                id_evento = rd.GetInt32(""),
                                nome_area = rd.GetString(""),
                                nome_evento = rd.GetString(""),
                                data = rd.GetDateTime(""),
                                incricao_ativa = rd.GetBoolean("")
                            };

                            if (rd.IsDBNull("imagem_evento") == false)
                                eventos.imagem_evento = rd["imagem_evento"] as byte[] ?? 


                        }
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro: {ex.Message}");
                return null;
            }



            return null;
        }
    }
}
