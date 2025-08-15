CREATE DATABASE IF NOT EXISTS bd_TECNA;
USE bd_tecna;
show tables;
drop table tb_comentarios;
select * from tb_comentarios;

CREATE TABLE IF NOT EXISTS tb_usuario (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  email VARCHAR(45) NOT NULL UNIQUE,
  senha VARCHAR(200) NOT NULL,
  nome VARCHAR(45) NOT NULL UNIQUE, 
  data VARCHAR(45) NOT NULL,
  cor_perfil VARCHAR(200)
 
);

CREATE TABLE IF NOT EXISTS tb_posts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  id_usuario INT NOT NULL,
  texto VARCHAR(200) NOT NULL,
  data VARCHAR(45) NOT NULL,
  imagem VARCHAR(255),
  topico VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_anexo (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  id_post INT NOT NULL,  
  midia LONGBLOB NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_sugestao (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  id_usuario INT NOT NULL,
  texto VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_comentarios (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  id_usuario INT NOT NULL,
  id_post INT NOT NULL,
  texto VARCHAR(45) NOT NULL,
  data VARCHAR(45) NOT NULL
);

insert into tb_anexo (id, midia)
values (1, load_file('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\perfil.jpg'));

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

SHOW VARIABLES LIKE 'secure_file_priv';

INSERT INTO tb_usuario (email, senha, nome, cor_perfil) VALUES
('iluvmoonlight@example.com', 'senha5', 'iluvmoonlight', 'imgRosa');

INSERT INTO tb_posts (id_usuario, texto, data) VALUES
(5, 'Este é o post do usuário iluvmoonlight.', '16.08.2024');

INSERT INTO tb_posts (id_usuario, texto, data) VALUES
(1, 'Sarah feia', '18.12.2023');

INSERT INTO tb_posts (id_usuario, texto, data) VALUES 
(1, 'bts te amo', '13.06.2013');

INSERT INTO tb_comentarios (id_usuario, id_post, texto, data) VALUES
(1, 2, 'teste.', '13.05.2024');

INSERT INTO tb_sugestao (id_usuario, texto) VALUES
(1, 'Sugestão um'),
(2, 'Sugestão dois'),
(3, 'Sugestão três');

DELETE FROM tb_posts WHERE id=3;

ALTER TABLE tb_posts
ADD topico VARCHAR(45) NOT NULL;

ALTER TABLE tb_usuario DROP COLUMN foto_perfil;

UPDATE tb_usuario SET cor_perfil = '_next/static/media/perfil_red.df4e8722.png' WHERE id = 1;


