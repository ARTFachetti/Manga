CREATE DATABASE IF NOT EXISTS `MANGA`;

USE `MANGA`;

CREATE TABLE mangas (
  id INT PRIMARY KEY,
  titulo VARCHAR(255),
  genero VARCHAR(255),
  imagem_capa VARCHAR(255),
  leitores INT
);

CREATE TABLE capitulos (
  id INT PRIMARY KEY,
  titulo VARCHAR(255),
  num_capitulo INT,
  id_manga INT,
  FOREIGN KEY (id_manga) REFERENCES mangas(id)
);

CREATE TABLE paginas (
  id INT PRIMARY KEY,
  num_pagina INT,
  imagem VARCHAR(255),
  id_capitulo INT,
  FOREIGN KEY (id_capitulo) REFERENCES capitulos(id)
);


