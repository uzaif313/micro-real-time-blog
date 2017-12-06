const express = require("express")
const morgon = require('morgon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require("hbs");
const expressHbs = require("express-handlebars");

const app = express();
