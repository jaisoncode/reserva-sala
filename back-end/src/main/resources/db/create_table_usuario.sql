DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario(
    id bigint not null auto_increment,
    username varchar(45) not null,
    email varchar(90) not null,
    password varchar(64) not null,
    nome_completo varchar(100) not null,
    role varchar(45) not null,
    enable tinyint(4),
    PRIMARY KEY(id)
);