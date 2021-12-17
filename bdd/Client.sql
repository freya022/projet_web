create table Client
(
    idClient serial primary key,
    nom      text,
    -- Évidemment on doit pas stocker les mots de passes dans la BDD
    -- Mais la on s'occupe pas de cryptographie
    mdp      text
);