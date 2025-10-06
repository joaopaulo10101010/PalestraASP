namespace PalestraPalestrante.Models
{
    public class Eventos
    {
        public int id_evento { get; set; } = 0;
        public string nome_evento { get; set; } = "";
        public string nome_area { get; set; } = "";
        public DateTime data { get; set; }
        public byte[] imagem_evento { get; set; }
        public bool incricao_ativa { get; set; } = false;
    }
}
