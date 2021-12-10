DROP TABLE IF EXISTS Article;

CREATE TABLE Article
(
    idArticle   int primary key,
    nomArticle  text           not null,
    description text           not null,
    prix        numeric(10, 2) not null
);