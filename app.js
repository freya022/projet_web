const express = require("express");
const path = require("path");

const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "ejs");

app.use('/public', express.static('public'));

const {sequelize} = require('./BDD.js');

const {article} = require('./bdd/Article')
const {articlePiece} = require('./bdd/ArticlePiece')
const {articleVelo} = require('./bdd/ArticleVelo')
const {client} = require('./bdd/Client')
const {commande} = require('./bdd/Commande')
const {ligneCommande} = require('./bdd/LigneCommande')
const {livraison} = require('./bdd/Livraison')
const {magasin} = require('./bdd/Magasin')
const {reapprovisionnement} = require('./bdd/Reapprovisionnement');
const {reparation} = require('./bdd/Reparation')
const {stock} = require('./bdd/Stock')

async function test() {
    let articles = await article.findAll();
    let articlePieces = await articlePiece.findAll();
    let articleVelos = await articleVelo.findAll();
    let clients = await client.findAll();
    let commandes = await commande.findAll();
    let ligneCommandes = await ligneCommande.findAll();
    let livraisons = await livraison.findAll();
    let magasins = await magasin.findAll();
    let reapprovisionnements = await reapprovisionnement.findAll();
    let reparations = await reparation.findAll();
    let stocks = await stock.findAll();
}

test().then(value => {
    console.log("OK");
}).catch(reason => {
    console.log(reason);
});

app.get("/", async (req, res) => {
    res.status(200);
    res.contentType("text/plain");
    res.end("Accueil");  //TODO utiliser render() pour la page EJS

    //TODO présenter un bouton login / inscription
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

async function getClientConnecte(req) {
    if (req.cookies === undefined || req.cookies["nom"] === undefined || req.cookies["mdp"] === undefined) {
        return null;
    }

    let nom = req.cookies["nom"]
    let mdp = req.cookies["mdp"]

    return await client.findOne({
        where: {
            "nom": nom,
            "mdp": mdp
        }
    });
}

//Vérifie que l'utilisateur est connecté
async function isLogon(req) {
    return await getClientConnecte(req) != null;
}

app.get("/catalogue", async (req, res) => {
    if (await isLogon(req)) {
        res.status(200); //Le client est déjà connecté
        res.contentType("text/plain");
        res.end("Catalogue"); //TODO utiliser render() pour la page EJS
    } else {
        res.redirect("login"); //Demande au client de se connecter
    }
});

app.get("/accueil", async (req, res) => {
    if (await isLogon(req)) {
        let magasins = await magasin.findAll();

        res.render("accueil", {magasins: magasins});
    } else {
        res.redirect("login"); //Demande au client de se connecter
    }
});

//API
app.get("/mettre-au-panier", async (req, res) => {
    if (await isLogon(req)) {
        if (req.body.idArticle === undefined) {
            res.status(400);
            res.end();

            return;
        }

        res.status(200);

        let clientConnecte = getClientConnecte(req);
        let commandeEnCours = await commande.findOne({
            where: {
                idClient: clientConnecte.idClient,
                fini: false
            }
        });

        if (commandeEnCours === null) {
            commandeEnCours = await commande.create({
                idClient: clientConnecte.idClient
            });
        }

        let idArticle = req.header("idArticle");

        let ligneEnCours = await commande.findOne({
            where: {
                idCommande: commandeEnCours.idCommande,
                idArticle: idArticle
            }
        });

        if (ligneEnCours === null) {
            await ligneCommande.create({
                idCommande: commandeEnCours.idCommande,
                idArticle: idArticle,
                quantite: 1
            });
        } else {
            await ligneCommande.update({
                quantite: ligneEnCours.quantite + 1
            }, {
                where: {
                    idCommande: commandeEnCours.idCommande,
                    idArticle: idArticle
                }
            });
        }

        res.end();
    } else {
        res.status(403);
        res.end();
    }
});

app.listen(8080, "localhost", () => {
    console.log("Server running");
});