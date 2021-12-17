CREATE TABLE Stock
(
    idArticle     serial primary key,
    prix          numeric(10, 2) not null,
    quantiteDispo int            not null,
    quantiteMin   int
);
