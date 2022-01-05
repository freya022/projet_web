insert into Client (nom, mdp)
VALUES ('nom', 'mdp');
insert into Client (nom, mdp)
VALUES ('client', '123');

insert into Magasin (nommagasin, email, telephone, reparation, ville, rue)
VALUES ('Veloshop', 'veloshop@gmail.com', '26813111585', true, 'Lyon', '12 rue des potiers');

insert into Magasin (nommagasin, email, telephone, reparation, ville, rue)
VALUES ('Le vélo c''est le vélo', 'velocestlevelo@gmail.com', '6813199125', false, 'Brest', '15 rue des potiers');

insert into Article (nomarticle, categorie, description, lienimage, prix)
VALUES ('Vélo', 'categorie', 'description',
        'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png', 10);

insert into Article (nomarticle, categorie, description, lienimage, prix)
VALUES ('Pompe à vélo', 'categorie', 'description 2',
        'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png', 50);

insert into Article (nomarticle, categorie, description, lienimage, prix)
VALUES ('Un autre vélo', 'categorie 2', 'description 3',
        'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png', 250);

insert into Reparation (nomreparation, idMagasin, prix, tempsreparation)
VALUES ('Réparation roue', 1, 15, 1);

insert into Commande (id_client, fini)
values (1, false);
insert into lignecommande (idcommande, idarticle, quantite)
values (1, 1, 5);

insert into livraison (datelivraisonprevu, datearrive)
VALUES (now(), now() + interval '1 day');