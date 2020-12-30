DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    usuario VARCHAR(25),
    url VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT
);