CREATE TABLE salas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  predio VARCHAR(255) NOT NULL,
  piso VARCHAR(255) NOT NULL);