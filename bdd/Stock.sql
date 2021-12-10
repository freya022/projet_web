DROP TABLE IF EXISTS StockArticle CASCADE;

CREATE TABLE StockArticle
(
    idArticle     serial primary key,
    nom           text           not null,
    description   text,
    prix          numeric(10, 2) not null,
    typeVelo      text,
    quantiteDispo int            not null,
    quantiteMin   int
);
