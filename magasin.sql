CREATE TABLE magasin(

    idMagasin Serial primary key ,
    nomMagasin text not null,
    email text,
    telephone text,
    reparation boolean,
    ville text
);

