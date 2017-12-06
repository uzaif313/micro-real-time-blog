const express = require("express")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require("hbs");
const expressHbs = require("express-handlebars");

const port = 8000;
const app = express();
app.engine('.hbs',expressHbs({defaultLayout:'application',extname:".hbs"}));

app.set('view engine','hbs');

app.use(express.static(__dirname+"/public"));

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}))

app.listen(port,(err)=>{
  if(err){
    console.log(err)
  }else{
    console.log(`serve is bootup on ${port}`)
  }
})
