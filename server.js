var bodyParser = require("body-parser");
var express = require("express");
var session = require('express-session');
var fs = require("fs");
var cookieParser = require('cookie-parser');
var i18n = require("i18n");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(process.env.PORT || 3000);

i18n.configure({
    locales:['en', 'vi'],
    directory: __dirname + '/locales',
    defaultLocale: 'en', 
    cookie: 'i18n'
});

app.use(cookieParser("10-word-seret-one-two-three-four-five-six-seven-eight-nine-ten"));

app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: '10-word-seret-one-two-three-four-five-six-seven-eight-nine-ten', 
    cookie: { maxAge: 600000 }
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    i18n.init(req, res, next);
    next();
});

app.use(function(req, res){
    res.locals.clanguage = req.getLocale();
    res.locals.language = i18n.getLocales();
});

app.use(bodyParser.urlencoded({extended:false}));
loadConfigFile("./config.json");

function loadConfigFile(file){
    var obj;
    fs.readFile(file, "utf-8", function(err, data){
        if(err) throw err;
        obj = JSON.parse(data);
        require("./controller/homeaction")(app, obj);
        require("./controller/homepages")(app, obj);
        
        console.log("Start port: 3000");
    });
}

module.exports = app;