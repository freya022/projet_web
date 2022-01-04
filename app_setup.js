const express = require("express");
const path = require("path");

const app = express();
const cookieParser = require('cookie-parser')

const {article} = require("./bdd/Article");
const {articlePiece} = require("./bdd/ArticlePiece");
const {articleVelo} = require("./bdd/ArticleVelo");
const {client} = require("./bdd/Client");
const {commande} = require("./bdd/Commande");
const {ligneCommande} = require("./bdd/LigneCommande");
const {livraison} = require("./bdd/Livraison");
const {magasin} = require("./bdd/Magasin");
const {reapprovisionnement} = require("./bdd/Reapprovisionnement");
const {reparation} = require("./bdd/Reparation");
const {stock} = require("./bdd/Stock");

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "ejs");

app.use('/public', express.static('public'));

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

module.exports = {app}