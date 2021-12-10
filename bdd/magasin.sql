CREATE TABLE magasin
(
    idMagasin  serial primary key,
    nomMagasin text    not null,
    email      text    not null,
    telephone  text    not null,
    reparation boolean not null,
    ville      text    not null,
    rue        text    not null
);

