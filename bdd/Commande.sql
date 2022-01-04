CREATE TABLE Commande
(
    idCommande serial primary key,
    idClient   int  not null references Client,
    fini       bool not null
);