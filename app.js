var express = require('express') ,
handlebars = require('express-handlebars') ,
// dust = require('dustjs-linkedin') ,
path = require('path') ,
// consolidate = require('consolidate') ,
request = require('request') ,
https = require('https');

var icons = require('./icons.js');

var app = express();
var router = express.Router();

var localhost = 'http://localhost',
localport = '3333';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// app.engine('dust', consolidate.dust);
// app.set('view engine', 'dust');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({extname: 'hbs', defaultLayout:'layout.hbs'}))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
	var jsonUrl = 'pages/icon-library.json';
	var urlPrefix = 'https://design.ibm.com/icon-library/';
	res.render('index', {urlPrefix: urlPrefix, icons: icons});
});

app.get('/icondata', function(req, res, next){
	res.json(icons);
});

app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

var server = app.listen(app.get('port'), function(){
	app.address = app.get('host') + ':' + server.address().port;
	console.log('Listening at ' + app.address);
});

module.exports = app;