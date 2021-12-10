DROP TABLE IF EXISTS Reparation;

CREATE TABLE Reparation
(
    idReparation      serial primary key,
    articleReparation text references Article (nomArticle),
    magasinReparation text references magasin (nomMagasin),
    prix              numeric(10, 2) not null,
    tempsReparation   text           not null
);