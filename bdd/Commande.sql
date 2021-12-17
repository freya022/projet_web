CREATE TABLE Commande
(
    idCommande serial primary key,
    idArticle  int not null references Article,
    idClient   int not null references Client
);