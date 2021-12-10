CREATE TABLE Reparation
(
    idReparation    serial primary key,
    idArticle       serial references Article (idArticle),
    idMagasin       serial references magasin (idMagasin),
    prix            numeric(10, 2) not null,
    tempsReparation text           not null
);