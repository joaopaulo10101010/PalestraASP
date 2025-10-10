namespace PalestraPalestrante.Models
{
    public class Palestra
    {
        public int id_palestra {  get; set; } = 0;
        public int id_evento { get; set; } = 0;
        public int id_palestrante { get; set; } = 0;
        public string descricao_palestra { get; set; } = "";
        public int id_area { get; set; } = 0;
    }
}
