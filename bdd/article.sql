DROP TABLE IF EXISTS Articles;

CREATE TABLE Articles
(
    idArticle int primary key,
    nom_article text not null,
    description text not null,
    prix numeric(10, 2) not null
);