const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const {sequelize} = require('./BDD.js');

const {reapprovisionnement} = require('./bdd/Reapprovisionnement');
const {magasin} = require('./bdd/magasin')
const {articles} = require('./bdd/article')
const {stock} = require('./bdd/stock')