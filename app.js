const express = require("express");
const axios = require("axios");
const cors = require("cors");

const {Sequelize, DataTypes} = require("sequelize");

const app = express();

const readConfig = require('read-config');
const config = readConfig('config.json');

