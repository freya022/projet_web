CREATE TABLE Reparation
(
    nomReparation   text           not null,
    idReparation    serial primary key,
    idMagasin       serial references magasin (idMagasin),
    prix            numeric(10, 2) not null,
    tempsReparation text           not null
);
