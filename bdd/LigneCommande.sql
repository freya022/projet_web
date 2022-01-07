CREATE TABLE LigneCommande
(
    idLigneCommande serial primary key,
    idCommande      serial references commande (id_commande),
    idArticle       int not null references Article,
    quantite        int not null
);