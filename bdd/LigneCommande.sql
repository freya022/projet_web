CREATE TABLE LigneCommande
(
    idCommande serial primary key,
    idArticle  int not null references Article,
    quantite   int not null
);