create table Reapprovisionnement(
    idReapprovisionnement serial not null,
    idArticle serial references Article,
    idStock serial references Stock,
    quantite int not null
);