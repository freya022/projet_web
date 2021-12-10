create table Reapprovisionnement
(
    idReapprovisionnement serial not null,
    idArticle             serial references Article,
    idStock               serial references StockArticle,
    quantite              int    not null
);