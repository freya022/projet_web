CREATE TABLE ArticleVelo
(
    id_articleVelo int primary key ,
    nomVelo text not null ,
    descriptionVelo text not null ,
    tailleVelo text not null ,
    poidsVelo float not null ,
    prixVelo numeric(10,2) not null
);