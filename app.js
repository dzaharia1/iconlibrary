var express = require('express') ,
dust = require('dustjs-linkedin') ,
path = require('path') ,
consolidate = require('consolidate') ,
request = require('request') ,
https = require('https');

var icons = require('./icons.js');

var app = express();
var router = express.Router();

var localhost = 'http://localhost',
localport = '3333';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// set up express to use dust for templating, and the views folder for templates
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
	var jsonUrl = 'pages/icon-library.json';
	var urlPrefix = 'https://design.ibm.com/icon-library/';
	res.render('index', {layout: 'layout', urlPrefix: urlPrefix, icons: icons});
});

// app.get('/corrected', function(req, res) {
// 	var thisString, index;
// 	for (var i = 0; i < icons.length; i ++) {
// 		thisString = icons[i].svg;
// 		index = thisString.indexOf('.');
// 		icons[i].glyph = thisString.substring(0, index) + '_24.svg';
// 	}
// 	res.json(icons);
// });

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