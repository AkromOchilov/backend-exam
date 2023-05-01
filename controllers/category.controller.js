let { readData, writeData } = require('./../utils/model.js');

module.exports = {
	GET: (req, res) => {
		let categories = readData('categories');
		let subCategories = readData('subcategories');

		categories.map((category) => {
			let filtered = subCategories.filter((sub) => {
				return sub.categoryId == category.categoryId;
			});

			for (let item of filtered) {
				delete item.categoryId;
			}
			category.subCategories = filtered;
		});

		res.json(200, categories);
	},

	POST: async (req, res) => {
		let { categoryName } = await req.body;
		let categories = readData('categories');

		try {
			if (!categoryName) {
				throw new Error('Invalid categoryName');
			}
			let newCategory = {
				categoryId: categories.at(-1).categoryId + 1 || 1,
				categoryName,
			};
			categories.push(newCategory);
			writeData('categories', categories);

			res.json(201, {
				status: 201,
				message: 'new category has been added',
			});
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},

	PUT: async (req, res) => {
		let { categoryId, categoryName } = await req.body;
		let categories = readData('categories');

		try {
			if (!categoryName) {
				throw new Error('invalid categoryName');
			}
			let categoryToChange = categories.find(
				(category) => category.categoryId == categoryId,
			);

			categoryToChange.categoryName = categoryName;
			writeData('categories', categories);
			res.json(201, { status: 201, message: 'successfully changed' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},

	DELETE: async (req, res) => {
		let { categoryId } = await req.body;
		let categories = readData('categories');

		try {
			let categoryToDelete = categories.findIndex(
				(category) => category.categoryId == categoryId,
			);

			if (categoryToDelete == -1) {
				throw new Error('category not found');
			}
			categories.splice(categoryToDelete, 1);
			writeData('categories', categories);
			res.json(201, { status: 201, message: 'category is deleted' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},
};
