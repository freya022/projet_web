create table Client
(
    idClient serial primary key,
    nom      text not null,
    salt     text not null,
    mdp      text not null
);