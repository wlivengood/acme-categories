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
	Db.addCategory(name);
	res.redirect('/');
});

router.get('/categories/:category', function(req, res) {
	var category = req.params.category;
	var indexes = Db.getIndexes(category);
	res.render('category', {title: category, category: category,
		categories: Db.listCategories(), products: Db.getProducts(category), indexes: indexes});
});

router.post('/categories/:category/products', function(req, res) {
	var category = req.params.category;
	var name = req.body.name;
	Db.addProduct(category, name);
	res.redirect('/categories/' + category);
});

router.delete('/categories/:category', function(req, res) {
	var category = req.params.category;
	Db.deleteCategory(category);
	res.redirect('/');
});

router.delete('/categories/:category/products/:idx', function(req, res) {
	var category = req.params.category;
	var idx = req.params.idx;
	Db.deleteProduct(category, idx);
	res.redirect('/categories/' + category);
})

module.exports = router;