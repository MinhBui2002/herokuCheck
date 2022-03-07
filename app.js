const express = require('express');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
const {
	insertObject,
	getCollection,
	getProductById,
	updateProduct,
	deleteDocumentById,
} = require('./dbHandler');
const app = express();

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
const path = require('path');

app.get('/', (req, res) => {
	res.render('all');
});

app.get('/insert', (req, res) => {
	res.render('create');
});

app.post('/edit', async (req, res) => {
	const updateId = req.body.txtId;
	const name = req.body.txtName;
	const price = req.body.txtPrice;
	const picUrl = req.body.txtPicUrl;
	const des = req.body.txtDescription;

	const newvalues = {
		$set: {
			name: name,
			price: price,
			pic: picUrl,
			description: des,
		},
	};
	const myQuery = { _id: ObjectId(updateId) };
	const collectionName = 'Products';
	await updateProduct(collectionName, myQuery, newvalues);
	res.redirect('/all');
});

app.get('/delete', async (req, res) => {
	const id = req.query.id;
	const collectionName = 'Products';
	await deleteDocumentById(collectionName, id);
	res.redirect('/all');
});

app.get('/all', async (req, res) => {
	const collectionName = 'Products';
	const result = await getCollection(collectionName);
	res.render('all', { products: result });
});

app.get('/edit', async (req, res) => {
	const id = req.query.id;
	const collectionName = 'Products';
	const document = await getProductById(collectionName, id);
	res.render('edit', { product: document });
});

app.get('/view', async (req, res) => {
	const id = req.query.id;
	const collectionName = 'Products';
	const document = await getProductById(collectionName, id);
	res.render('find', { product: document });
});

app.post('/insert', async (req, res) => {
	const name = req.body.txtName;
	const price = req.body.txtPrice;
	const picUrl = req.body.txtPicUrl;
	const des = req.body.txtDescription;
	const newP = {
		name: name,
		price: price,
		pic: picUrl,
		description: des,
	};
	const collectionName = 'Products';
	await insertObject(collectionName, newP);
	res.render('create');
});
const port = process.env.PORT || 5000
app.listen(port);
console.log("<<<<<<< Server is running at 5000 >>>>>>");
