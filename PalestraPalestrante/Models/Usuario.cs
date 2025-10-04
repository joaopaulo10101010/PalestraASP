namespace PalestraPalestrante.Models
{
    public class Usuario
    {
        private string cpf_usuario {  get; set; }
        private string nome_usuario { get; set;}
        private string email_usuario { get; set;}
        private string senha_usuario { get; set;}
        private string cargo_usuario { get; set;}
        private DateTime data_cadastro_usuario { get; set;}

        public Usuario(string cpf = "", string nome="", string email="", string senha="", string cargo="")
        {
            cpf_usuario = cpf;
            nome_usuario = nome;
            email_usuario = email;
            senha_usuario= senha;
            cargo_usuario = cargo;
        }

        public string GetCpf()
        {
            return cpf_usuario;
        }
        public string GetNome() 
        {
            return nome_usuario; 
        }
        public string GetEmail()
        {
            return email_usuario;
        }
        public string GetCargo()
        {
            return cargo_usuario;
        }
        public string GetSenha()
        {
            return senha_usuario;
        }
        public DateTime GetDataCadastro()
        {
            return data_cadastro_usuario;
        }
        public void SetDataCadastro(DateTime date)
        {
            data_cadastro_usuario = date;
        }

    }
}
