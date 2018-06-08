/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/

// CODE General de l'application
// Traiter les routes ici
// On utilise ejs pour renvoyer les vues

var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));	// Faire en sorte que le dossier public soit la "base" pour les url des css, img, script...

/* Dans un .ejs du dossier view, pour charger un un css qui se trouve dans /public/stylesheets/style.css
	Il faut dans la balise link mettre href="/stylesheet/style.css"
	En fait, la ligne ci-dessus permet de dire que la racine "/" est le dossier public
*/
app.use(session({secret: 'todotopsecret'}));

app.get('/', function(req, res) {
    res.render("index.ejs", {p: 0});
});

//Partie recherche

app.use(function(req, res, next){
    if (typeof(req.session.keywords) == 'undefined') {
        req.session.keywords = [];
    }
    next();
});

app.get('/recherche',function(req,res){
    res.render("recherche.ejs", {keywords: req.session.keywords});
});

app.post('/recherche/addKeyWord', urlencodedParser, function(req, res) {
    if (req.body.newKW != '') {
        req.session.keywords.push(req.body.newKW);
    }
    res.redirect('/recherche');
});

app.get('/recherche/supprKeyWord:id', function(req, res) {
    if (req.params.id != '') {
        req.session.keywords.splice(req.params.id, 1);
    }
    res.redirect('/recherche');
});

// Partie projet

app.get('/widgetProject',function(req,res){
    res.render("widgetProject.ejs", {width: 600});
});

app.get('/newProject', function(req, res) {
	res.render('index.ejs', {p: 1});
});

app.get('/newProjectW', function(req, res) {
	res.render('newProjectW.ejs');
});

app.get('/viewProject', function(req, res) {
	res.render('index.ejs', {p: 2});
});

app.get('/viewProjectW', function(req, res) {
	res.render('display.ejs');
});

app.listen(8080);
