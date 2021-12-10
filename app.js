const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const {sequelize} = require('./BDD.js');

const {articles} = require('./bdd/Article')
const {livraison} = require('./bdd/Livraison')
const {magasin} = require('./bdd/Magasin')
const {reapprovisionnement} = require('./bdd/Reapprovisionnement');
const {reparation} = require('./bdd/Reparation')
const {stock} = require('./bdd/Stock')
