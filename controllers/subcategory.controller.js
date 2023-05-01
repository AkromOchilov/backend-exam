let { readData, writeData } = require('./../utils/model.js');

module.exports = {
	GET: (req, res) => {
		let subCategories = readData('subcategories');
		let products = readData('products');

		subCategories.map((subcategory) => {
			subcategory.products = products.filter((product) => {
				return product.subCategoryId == subcategory.subCategoryId;
			});

			delete subcategory.categoryId;
		});

		res.json(200, subCategories);
	},

	POST: async (req, res) => {
		let { categoryId, subCategoryName } = await req.body;
		let subCategories = readData('subcategories');

		try {
			let newSubCategory = {
				subCategoryId: subCategories.at(-1).subCategoryId + 1 || 1,
				categoryId,
				subCategoryName,
			};
			subCategories.push(newSubCategory);
			writeData('subcategories', subCategories);
			res.json(201, { status: 201, message: 'Subcategory is added' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},

	PUT: async (req, res) => {
		let { subCategoryId, subCategoryName } = await req.body;
		let subCategories = readData('subcategories');

		try {
			let subCategory = subCategories.find(
				(subC) => subC.subCategoryId == subCategoryId,
			);
			subCategory.subCategoryName = subCategoryName;
			writeData('subcategories', subCategories);
			res.json(201, { status: 201, message: 'subcategory is updated' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},

	DELETE: async (req, res) => {
		let { subCategoryId } = await req.body;
		let subCategories = readData('subcategories');

		try {
			let subIndex = subCategories.findIndex(
				(subC) => subC.subCategoryId == subCategoryId,
			);

			if (subIndex == -1) {
				throw new Error('subcategory not found');
			}
			subCategories.splice(subIndex, 1);
			writeData('subcategories', subCategories);
			res.json(201, { status: 201, message: 'Successfully deleted' });
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},
};
