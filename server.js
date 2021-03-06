const express = require("express")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require("hbs");
const expressHbs = require("express-handlebars");
const routes = require("./routes");
const userRoutes = require("./routes/users")
const session = require("express-session");
const Store = require("connect-mongo")(session);
const flash = require("express-flash");
const env = require("./config/env.dev");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportSocketIo = require("passport.socketio")
const port = 8000;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const sessionStore = new Store({url:env.database, autoReconnect:true})
mongoose.Promise = global.Promise;

const dbConnection = mongoose.connect(env.database,{useMongoClient:true})
require("./socket/io")(io)
dbConnection.then(function(err){
  console.log("Connected to Database :blush:")
})
app.engine('.hbs',expressHbs({defaultLayout:'application',extname:".hbs"}));

app.set('view engine','hbs');

app.use(express.static(__dirname+"/public"));
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: env.secret,
  store: sessionStore
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(flash())

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: env.secret,
  store: sessionStore,
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail
}));

function onAuthorizeSuccess(data, accept){
  console.log("Authorize Connection")
  accept()
}
function onAuthorizeFail(data, message, err, accept){
  console.log("Unauthorize Connection")
  if(error) accept(new Error(message))
}

app.use(function(req, res, next){
  res.locals.user = req.user
  next()
  // console.log(user)
})


app.use(routes)
app.use(userRoutes)

http.listen(port,(err)=>{
  if(err){
    console.log(err)
  }else{
    console.log(`serve is bootup on ${port}`)
  }
})
