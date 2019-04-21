var express=require('express');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var engine=require('ejs-mate');
var session=require('express-session');
var mongoose = require('mongoose');
var MongoStore= require('connect-mongo')(session);
var passport = require('passport');
var flash=require('connect-flash');

var app=express();

mongoose.connect('mongodb://localhost/rateme',{useNewUrlParser: true});

require('./config/passport');

app.use(express.static('public'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
  secret:'Thisismytestkey',
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({mongooseConnection:mongoose.connection})
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/user')(app);

app.listen(3005,function(){
  console.log('listening on port 3005');
});
