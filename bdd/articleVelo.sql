CREATE TABLE ArticleVelo
(
    idArticle serial primary key references Article (idArticle),
    typeVelo text not null ,
    tailleVelo text not null ,
    poidsVelo float not null
);