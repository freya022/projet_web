DROP TABLE IF EXISTS Reparation;

CREATE TABLE Reparation
(
    id_reparation int primary key,
    article_reparation text references Articles (nom_article),
    magasin_reparation text references magasin (nomMagasin),
    prix numeric(10, 2) not null,
    temps_reparation text not null
);