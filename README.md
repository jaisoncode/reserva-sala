# Projeto de Reserva de Salas

Este é um projeto de reserva de salas que consiste em um frontend e um backend. O frontend é desenvolvido em HTML/CSS + JavaScript puro, e o backend em Java Spring Boot.

## Configurando o Banco de Dados

Para executar este projeto, você precisará configurar um banco de dados MySQL com as seguintes etapas:

1. Crie um banco de dados chamado "reserva":
2. Selecione o Banco de dados "reserva":
3. Crie uma tabela de acordo com o projeto:
4. Crie um usário de acesso ao banco:

```sql
CREATE DATABASE reserva;

USE reserva;

CREATE TABLE salas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  predio VARCHAR(255) NOT NULL,
  piso VARCHAR(255) NOT NULL);

CREATE USER 'jaison'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON reserva.* TO 'jaison'@'localhost';
FLUSH PRIVILEGES; 




