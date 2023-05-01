let { readData, writeData, filterProducts } = require('./../utils/model');

module.exports = {
	GET: (req, res) => {
		let categories = readData('categories');
		let subCategories = readData('subcategories');
		let products = readData('products');

		//using filterProducts function to filter
		const filteredProducts = filterProducts(
			products,
			req.query,
			subCategories,
			categories,
		);

		!Object.keys(req.query).length
			? res.json(201, [])
			: res.json(200, filteredProducts);
	},

	POST: async (req, res) => {
		let { subCategoryId, productName, price, color, model } =
			await req.body;
		let products = readData('products');

		try {
			let newProduct = {
				productId: products.at(-1).productId + 1 || 1,
				subCategoryId,
				model,
				productName,
				color,
				price,
			};
			products.push(newProduct);
			writeData('products', products);
			res.json(201, { status: 201, message: 'product is added' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},

	PUT: async (req, res) => {
		let { productId, productName, price } = await req.body;
		let products = readData('products');

		try {
			let product = products.find(
				(product) => product.productId == productId,
			);
			product.productName = productName;
			product.price = price;
			writeData('products', products);
			res.json(201, { status: 201, message: 'product is updated' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},

	DELETE: async (req, res) => {
		let { productId } = await req.body;
		let products = readData('products');

		try {
			let productIndex = products.findIndex(
				(product) => product.productId == productId,
			);

			if (productIndex == -1) {
				throw new Error('product not found');
			}
			products.splice(productIndex, 1);
			writeData('products', products);
			res.json(201, { status: 201, message: 'Successfully deleted' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},
};
