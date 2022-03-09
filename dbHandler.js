const { ObjectId } = require("mongodb");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://Alex1:Minhbuiquang@cluster0.ufe9j.mongodb.net/test";
const dbName = "NoSQLBoosterSamples";

async function deleteDocumentById(collectionName, id) {
	let client = await MongoClient.connect(url);
	let dbo = client.db(dbName);
	await dbo.collection(collectionName).deleteOne({ _id: ObjectId(id) });
}


async function updateProduct(collectionName, myquery, newvalues) {
	let client = await MongoClient.connect(url);
	let dbo = client.db(dbName);
	await dbo.collection(collectionName).updateOne(myquery, newvalues);
}

async function getProductById(collectionName, id) {
	let client = await MongoClient.connect(url);
	let dbo = client.db(dbName);
	return await dbo.collection(collectionName).findOne({ _id: ObjectId(id) });
}

async function insertObject(collectionName, newP) {
	let client = await MongoClient.connect(url);
	let dbo = client.db(dbName);
	await dbo.collection(collectionName).insertOne(newP);
}

async function getCollection(collectionName) {
	let client = await MongoClient.connect(url);
	let dbo = client.db(dbName);
	return await dbo.collection(collectionName).find({}).toArray();
}

// async function findUserByName(userName){
//     let client = await MongoClient.connect(url)
//     let dbo = client.db(databaseName) //GCH0904_DB: ten database
//     const collectionName = "users"
//     const result = await dbo.collection(collectionName).findOne({'name':userName})
//     return result
// }

module.exports = {
	insertObject,
	getCollection,
	getProductById,
	updateProduct,
	deleteDocumentById,
};
