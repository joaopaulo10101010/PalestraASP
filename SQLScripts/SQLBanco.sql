drop database db_palestra;
create database db_palestra;
use db_palestra;

create table AreaAtuacao(
	id_area int auto_increment,
    nome_area varchar(255),
    primary key(id_area)
);

create table Eventos(
	id_evento int auto_increment,
    nome_evento varchar(255) not null,
    data date not null,
    inscricao_ativa bool,
    imagem_evento longblob,
	id_area int,
    foreign key(id_area) references AreaAtuacao(id_area),
    primary key(id_evento)
);

create table Palestrantes(
	id_palestrante int auto_increment,
    nome varchar(255) not null,
    id_area int not null,
    foto_perfil longblob,
    data_cadastro datetime default current_timestamp,
    primary key(id_palestrante),
    foreign key(id_area) references AreaAtuacao(id_area)
);

create table Palestras(
	id_palestra int auto_increment primary key,
    id_evento int,
    id_palestrante int,
    descricao_palestra varchar(500),
	id_area int,
    foreign key(id_area) references AreaAtuacao(id_area),
    foreign key(id_evento) references Eventos(id_evento),
    foreign key(id_palestrante) references Palestrantes(id_palestrante)
);

create table Usuario(
	cpf_usuario char(11),
    nome_usuario varchar(255),
    email_usuario varchar(255),
    senha_usuario varchar(500),
    cargo_usuario enum('Admin','Participante','Publico') default 'Publico',
	data_cadastro_usuario datetime default current_timestamp,
    primary key(cpf_usuario)
);

insert into Usuario(cpf_usuario,nome_usuario,email_usuario,senha_usuario) values
("","","","");

select * from usuario;
