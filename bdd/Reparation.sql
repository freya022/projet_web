DROP TABLE IF EXISTS Reparation;

CREATE TABLE Reparation
(
    idReparation      int primary key,
    articleReparation text references Article (nomArticle),
    magasinReparation text references magasin (nomMagasin),
    prix              numeric(10, 2) not null,
    temps_reparation  text           not null
);