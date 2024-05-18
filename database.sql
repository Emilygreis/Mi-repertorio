-- Script para crear la base de datos y la tabla usuarios

-- Crear la base de datos
CREATE DATABASE emily_mi_repertorio_637;

-- Conectar a la base de datos creada
\c emily_mi_repertorio_637;

-- Crear la tabla usuarios
CREATE TABLE canciones (id SERIAL, titulo VARCHAR(50), artista VARCHAR(50), tono VARCHAR(10));
