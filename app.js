const {app} = require("./app_setup.js")
const {getClientConnecte, isLogon} = require("./api.js")

const {sequelize} = require('./BDD.js');

const {client} = require('./bdd/Client')
const {commande} = require('./bdd/Commande')
const {magasin} = require('./bdd/Magasin')
const {reparation} = require("./bdd/Reparation");

app.get("/", async (req, res) => {
    if (await isLogon(req)) {
        res.redirect("/catalogue");
    } else {
        res.render("ChoixConnexion");
    }
});

app.get("/login", async (req, res) => {
    //Si on n'est pas connecté, afficher la page de connexion
    //Sinon rediriger vers le catalogue
    if (await isLogon(req)) {
        res.redirect("/catalogue");
    } else {
        res.render("Login");
    }
});

app.get("/inscription", async (req, res) => {
    //Si on n'est pas connecté, afficher la page d'inscription
    //Sinon rediriger vers le catalogue
    if (await isLogon(req)) {
        res.redirect("/catalogue");
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
        res.redirect("/login");
    }
});


//Le formulaire de connexion redirige ici
app.post("/try-login", async (req, res) => {
    if (req.body["nom"] === undefined || req.body["mdp"] === undefined) {
        res.status(403)
        res.end()

        return;
    }

    let nom = req.body.nom;
    let mdp = req.body.mdp;

    let clientTrouve = await client.findOne({
        where: {
            "nom": nom,
            "mdp": mdp
        }
    });

    if (clientTrouve != null) {
        res.cookie("nom", nom);
        res.cookie("mdp", mdp);

        res.redirect("/catalogue");
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
    let mdp = req.body.mdp;

    let clientTrouve = await client.findOne({
        where: {
            "nom": nom
        }
    });

    if (clientTrouve != null) {
        res.redirect("/inscription");
    } else {
        await client.create({
            nom: nom,
            mdp: mdp
        })

        res.cookie("nom", nom);
        res.cookie("mdp", mdp);

        res.redirect("/catalogue");
    }
});

app.get("/catalogue", async (req, res) => {
    if (await isLogon(req)) {
        res.status(200); //Le client est déjà connecté
        res.contentType("text/plain");
        res.end("Catalogue"); //TODO utiliser render() pour la page EJS
    } else {
        res.redirect("login"); //Demande au client de se connecter
    }
});

app.get("/reparations", async (req, res) => {
    if (await isLogon(req)) {
        let reparations = await reparation.findAll();

        res.render("Reparations", {reparations: reparations});
    } else {
        res.redirect("login");
    }
    let reparationMagasin = await sequelize.query('select * from reparation join magasin using (idMagasin)', {type: sequelize.QueryTypes.SELEC})
});

app.get("/accueil", async (req, res) => {
    if (await isLogon(req)) {
        let magasins = await magasin.findAll();

        res.render("accueil", {magasins: magasins});
    } else {
        res.redirect("login"); //Demande au client de se connecter
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

    axios.post('http://localhost:8080/valider-commande/2', {}, {
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