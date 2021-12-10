const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const {sequelize} = require('./BDD.js');

const {reapprovisionnement} = require('./bdd/Reapprovisionnement');