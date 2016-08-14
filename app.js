var express = require('express');
var path = require('path');
var swig = require('swig');
swig.setDefaults({cache: false});
//configure this here
var bodyParser = require('body-parser');
var Db = require('./db');

var app = express();

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/categories', require('./routes/categories'));

app.get('/', function(req, res) {
	Db.query('SELECT * FROM categories', function(err, results){
		if (err) next(err);
	res.render('index', {title: "Home", categories: results.rows});	
	});
});

app.listen(process.env.PORT, function() {
	console.log("Listening on port " + process.env.PORT);
});
