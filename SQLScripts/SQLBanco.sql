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
    inscricao_ativa bool default 1,
    imagem_evento longblob,
	id_area int,
    foreign key(id_area) references AreaAtuacao(id_area),
    primary key(id_evento)
);

create table Palestras(
	id_palestra int auto_increment primary key,
    id_evento int,
    cpf_usuario char(11),
    descricao_palestra varchar(1000),
	id_area int,
    foreign key(id_area) references AreaAtuacao(id_area),
    foreign key(id_evento) references Eventos(id_evento),
    foreign key(cpf_usuario) references Usuario(cpf_usuario)
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

insert into Usuario(cpf_usuario,nome_usuario,email_usuario,senha_usuario,cargo_usuario) values
("00000000000","admin","admin@admin","admin","Admin");


delete from Usuario where cpf_usuario='0';

INSERT INTO AreaAtuacao (nome_area) VALUES ('Tecnologia da Informação');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Engenharia');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Saúde');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Educação');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Administração');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Marketing');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Recursos Humanos');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Finanças');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Logística');
INSERT INTO AreaAtuacao (nome_area) VALUES ('Design Gráfico');

/* pt.id_palestra, pt.id_evento,pt.cpf_usuario,pt.descricao_palestra,id_area */
select * from Usuario;
select pt.cpf_usuario, pt.descricao_palestra, ev.nome_evento, ev.data, us.nome_usuario, us.email_usuario, us.cargo_usuario, aa.nome_area from Palestras pt inner join Eventos ev on pt.id_evento=ev.id_evento inner join Usuario us on us.cpf_usuario=pt.cpf_usuario inner join AreaAtuacao aa on pt.id_area=aa.id_area where pt.id_evento = 1;
