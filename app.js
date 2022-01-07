const {app} = require("./app_setup.js")
const {getClientConnecte, isLogon} = require("./api.js")

const {sequelize} = require('./BDD.js');

const bcrypt = require('bcrypt');

const {client} = require('./bdd/Client')
const {commande} = require('./bdd/Commande')
const {magasin} = require('./bdd/Magasin')
const {livraison} = require("./bdd/Livraison");
const {article} = require("./bdd/Article")

app.get("/", async (req, res) => {
    if (await isLogon(req)) {
        res.redirect("/accueil");
    } else {
        res.render("ChoixConnexion");
    }
});

app.get("/login", async (req, res) => {
    //Si on n'est pas connecté, afficher la page de connexion
    //Sinon rediriger vers le catalogue
    if (await isLogon(req)) {
        res.redirect("/accueil");
    } else {
        res.render("Login");
    }
});

app.get("/inscription", async (req, res) => {
    //Si on n'est pas connecté, afficher la page d'inscription
    //Sinon rediriger vers le catalogue
    if (await isLogon(req)) {
        res.redirect("/accueil");
    } else {
        res.render("Inscription");
    }
});

app.get("/commande", async (req, res) => {
    //Si on n'est pas connecté, afficher la page d'inscription
    //Sinon rediriger vers le catalogue
    if (await isLogon(req)) {
        let clientConnecte = await getClientConnecte(req);

        let commandeEnCours = await commande.findOne({
            where: {
                idClient: clientConnecte.idClient
            }
        });

        if (commandeEnCours === null) {
            commandeEnCours = await commande.create({
                idClient: clientConnecte.idClient
            });
        }

        // language=PostgreSQL
        let lignesEnCours = await sequelize.query(`select *
                                                   from ligneCommande
                                                            join article using (idArticle)
                                                   where idCommande = ${commandeEnCours.idCommande}`, {
            type: sequelize.QueryTypes.SELECT
        });

        res.render("pageCommande", {
            commande: commandeEnCours,
            lignesCommande: lignesEnCours
        });
    } else {
        res.redirect("/");
    }
});

//Le formulaire de connexion redirige ici
app.post("/try-login", async (req, res) => {
    if (req.body["nom"] === undefined || req.body["mdp"] === undefined) {
        res.status(400);
        res.end();

        return;
    }

    let nom = req.body.nom;

    let clientTrouve = await client.findOne({
        where: {
            "nom": nom
        }
    });

    if (clientTrouve != null) {
        let salt = clientTrouve.salt;
        let mdp = bcrypt.hashSync(req.body.mdp, salt);

        if (mdp === clientTrouve.mdp) {
            res.cookie("nom", nom);
            res.cookie("mdp", mdp);

            res.redirect("/accueil");
        } else {
            res.status(403);
            res.redirect("/login");
        }
    } else {
        res.status(403);
        res.redirect("/login");
    }
});

app.post("/try-inscription", async (req, res) => {
    if (req.body["nom"] === undefined || req.body["mdp"] === undefined) {
        res.status(403)
        res.end()

        return;
    }

    let nom = req.body.nom;

    let clientTrouve = await client.findOne({
        where: {
            "nom": nom
        }
    });

    if (clientTrouve != null) {
        res.redirect("/inscription");
    } else {
        let salt = bcrypt.genSaltSync(10);
        let mdp = bcrypt.hashSync(req.body.mdp, salt);

        await client.create({
            nom: nom,
            mdp: mdp,
            salt: salt
        });

        res.cookie("nom", nom);
        res.cookie("mdp", mdp);

        res.redirect("/accueil");
    }
});

app.get("/catalogue", async (req, res) => {
    if (await isLogon(req)) {
        let articles = await article.findAll();
        let articlesPanier = await sequelize.query(`select article.*, quantite
                                                    from lignecommande
                                                             join article using (idarticle)
                                                             join commande on idcommande = id_commande
                                                    where fini = false
                                                    order by nomarticle`, {
            type: sequelize.QueryTypes.SELECT
        });

        let prixTotal = await sequelize.query(`select sum(quantite * prix) as prixTotal
                                                    from lignecommande
                                                             join article using (idarticle)
                                                             join commande on idcommande = id_commande
                                                    where fini = false`, {
            type: sequelize.QueryTypes.SELECT
        });

        res.render("catalogue", {
            articles: articles,
            articlesPanier: articlesPanier,
            prixTotal: prixTotal
        });
    } else {
        res.redirect("/"); //Demande au client de se connecter
    }
});

app.get("/reparations", async (req, res) => {
    if (await isLogon(req)) {
        let reparations = await sequelize.query('select * from reparation join magasin using (idMagasin)', {
            type: sequelize.QueryTypes.SELECT
        });

        res.render("Reparations", {reparations: reparations});
    } else {
        res.redirect("/");
    }
});

app.get("/accueil", async (req, res) => {
    if (await isLogon(req)) {
        let magasins = await magasin.findAll();

        res.render("accueil", {magasins: magasins});
    } else {
        res.redirect("/"); //Demande au client de se connecter
    }
});

app.get("/suiviLivraison", async (req, res) => {
    if (await isLogon(req)) {
        res.render("suiviLivraison", {livraison: undefined});
    } else {
        res.redirect("/");
    }
});

app.post("/suiviLivraison", async (req, res) => {
    if (await isLogon(req)) {
        if (req.body.idLivraison === undefined) {
            res.render("suiviLivraison", {livraison: undefined});
        } else {
            let livraisonSelect = await livraison.findOne({
                where: {
                    idLivraison: req.body.idLivraison
                }
            });

            if (livraisonSelect === null) {
                res.render("suiviLivraison", {livraison: undefined});
            } else {
                res.render("suiviLivraison", {livraison: livraisonSelect});
            }
        }
    } else {
        res.redirect("/");
    }
});

app.listen(8080, "localhost", () => {
    console.log("Server running");
});

function testApi() {
    const axios = require("axios");

    axios.post('http://localhost:8080/mettre-au-panier/1', {}, {
        headers: {
            "Cookie": `nom=nom; mdp=mdp`
        }
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        });

    axios.post('http://localhost:8080/valider-commande', {}, {
        headers: {
            "Cookie": `nom=nom; mdp=mdp`
        }
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        });
}

// testApi();