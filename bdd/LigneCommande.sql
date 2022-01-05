CREATE TABLE LigneCommande
(
    idCommande serial primary key references commande (id_commande),
    idArticle  int not null references Article,
    quantite   int not null
);