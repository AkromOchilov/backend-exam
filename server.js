let http = require('http');
let Express = require('./lib/Express');
let categoryController = require('./controllers/category.controller');
let subcategoryController = require('./controllers/subcategory.controller');
let productController = require('./controllers/product.controller');
let adminController = require('./controllers/admin.controller');

let server = http.createServer((req, res) => {
	let app = new Express(req, res);

	app.get('/categories', categoryController.GET);
	app.get('/subcategories', subcategoryController.GET);
	app.get('/products', productController.GET);

	app.post('/categories', categoryController.POST);
	app.post('/subcategories', subcategoryController.POST);
	app.post('/products', productController.POST);
	app.post('/signin', adminController.POST);

	app.put('/categories', categoryController.PUT);
	app.put('/subcategories', subcategoryController.PUT);
	app.put('/products', productController.PUT);

	app.delete('/categories', categoryController.DELETE);
	app.delete('/subcategories', subcategoryController.DELETE);
	app.delete('/products', productController.DELETE);
});

server.listen(4000, () => console.log('your server is running at port 4000'));
