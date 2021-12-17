CREATE TABLE ArticleVelo
(
    idVelo serial primary key references Articles (idArticles),
    typeVelo text not null ,
    tailleVelo text not null ,
    poidsVelo float not null
);