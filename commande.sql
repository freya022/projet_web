CREATE TABLE Commande
(
    idCommande serial primary key ,
    nomArticle text not null references Article (nomArticle),
    prix numeric(10,2) not null references Article (prix),
    quantite int not null ,
    prixCommande numeric(10,2) not null
);