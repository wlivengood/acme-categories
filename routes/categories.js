var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var Db = require('../db');

var router = express();
router.use(bodyParser());
router.use(methodOverride('method'));

router.post('/categories', function(req, res) {
	var name = req.body.name;
	Db.query('INSERT INTO categories (name) VALUES ($1)', [name], function(err, results) {
		if (err) next (err);
		res.redirect('/');
	});
});

router.get('/categories/:categoryId', function(req, res) {
	var categoryId = req.params.categoryId;
	Db.query('SELECT * FROM products WHERE category_id= $1', [categoryId], function(err, results) {
		if (err) throw err;
		var products = results.rows;
		Db.query('SELECT * FROM categories', function(err2, results2) {
			if (err) throw err;
			var categories = results2.rows;
			res.render('category', {title: products.category_name, categoryId: categoryId, categories: categories, products: products});
		});
	});
});

router.post('/categories/:categoryId/products', function(req, res) {
	var categoryId = req.params.categoryId;
	var name = req.body.name;
	Db.query('INSERT INTO products (name, category_id) VALUES ($1, $2)', [name, categoryId], function(err, results) {
		if (err) throw err;
		res.redirect('/categories/' + categoryId);
	});
});

router.delete('/categories/:categoryId', function(req, res) {
	var categoryId = req.params.categoryId;
	Db.query('DELETE FROM products WHERE category_id = $1', [categoryId], function(err, results) {
		if (err) throw err;
		Db.query('DELETE FROM categories WHERE id = $1', [categoryId], function(err, results) {
			if (err) throw err;
			res.redirect('/');
		});
	});
});

router.delete('/categories/:categoryId/products/:productId', function(req, res) {
	var categoryId = req.params.categoryId;
	var productId = req.params.productId;
	Db.query('DELETE FROM products WHERE id = $1', [productId], function(err, results) {
		res.redirect('/categories/' + categoryId);
	});	
})

module.exports = router;