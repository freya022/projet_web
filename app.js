const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

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

test();