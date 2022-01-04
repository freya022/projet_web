CREATE TABLE Commande
(
    id_commande serial primary key,
    id_client   int  not null references Client,
    fini        bool not null default false
);