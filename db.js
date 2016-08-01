var _data = {};

module.exports = {
	getCategories: function() {
		return _data;
	},
	listCategories: function() {
		return Object.keys(this.getCategories());
	},
	addCategory: function(name) {
		_data[name] = [];
	},
	getProducts(category) {
		return this.getCategories()[category];
	},
	addProduct(category, name) {
		var newProduct = {};
		newProduct.name = name;
		_data[category].push(newProduct);
	},
	deleteCategory(category) {
		delete _data[category];
	},
	deleteProduct(category, idx) {
		_data[category].splice(idx, 1);
	},
	getIndexes(category) {
		var indexes = [];
		for (var i = 0; i < this.getCategories().length; i++)
			indexes.push(i);
		return indexes;
	}
}