const express = require("express");
const path = require("path");

const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const {sequelize} = require('./BDD.js');

const {article} = require('./bdd/Article')
const {client} = require('./bdd/Client')
const {livraison} = require('./bdd/Livraison')
const {magasin} = require('./bdd/Magasin')
const {reapprovisionnement} = require('./bdd/Reapprovisionnement');
const {reparation} = require('./bdd/Reparation')
const {stock} = require('./bdd/Stock')

async function test() {
    let articles = await article.findAll();
    let clients = await client.findAll();
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
});

app.get("/login", async (req, res) => {
    res.status(200);
    res.contentType("text/plain");
    res.end("Login"); //TODO utiliser render() pour la page EJS
});

//Le formulaire redirige ici
app.get("/try-login", async (req, res) => {
    if (!req.body.hasOwnProperty("nom") || !req.body.hasOwnProperty("mdp")) {
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
        res.render("Catalogue"); //TODO utiliser render() pour la page EJS
    }
});

async function checkLogin(req) {
    let nom = req.cookies["nom"]
    let mdp = req.cookies["mdp"]

    let clientTrouve = await client.findOne({
        where: {
            "nom": nom,
            "mdp": mdp
        }
    });

    return clientTrouve != null;
}

app.get("/catalogue", async (req, res) => {
    if (await checkLogin(req)) {
        res.status(200);
        res.contentType("text/plain");
        res.end("Catalogue"); //TODO utiliser render() pour la page EJS
    } else {
        res.render("Login"); //TODO faire la page EJS
    }
});

app.listen(8080, "localhost", () => {
    console.log("Server running");
});