let { readFileSync, writeFileSync } = require('fs');
let { resolve } = require('path');
let crypto = require('crypto');

function readData(filename) {
	let data = readFileSync(resolve('database', filename + '.json'), 'utf-8');
	return JSON.parse(data);
}

function writeData(filename, data) {
	writeFileSync(
		resolve('database', filename + '.json'),
		JSON.stringify(data, null, 4),
	);
	return true;
}

function hashPassword(password) {
	let hash = crypto.createHash('sha256').update(password).digest('hex');
	return hash;
}

function filterProducts(products, query, subcategories, categories) {
	return products.filter((product) => {
		// Apply filter for color
		if (query.color && product.color !== query.color) {
			return false;
		}

		// Apply filter for price
		if (query.price && product.price !== query.price) {
			return false;
		}

		// Apply filter for model
		if (query.model && product.model !== query.model) {
			return false;
		}

		// Apply filter for categoryId
		if (
			query.categoryId &&
			subcategories[product.subCategoryId - 1].categoryId !==
				parseInt(query.categoryId)
		) {
			return false;
		}

		// Apply filter for subCategoryId
		if (
			query.subCategoryId &&
			product.subCategoryId !== parseInt(query.subCategoryId)
		) {
			return false;
		}

		// Apply filter for productId
		if (
			query.productId &&
			product.productId !== parseInt(query.productId)
		) {
			return false;
		}

		// If all filters pass, return true
		return true;
	});
}

module.exports = { readData, writeData, hashPassword, filterProducts };
