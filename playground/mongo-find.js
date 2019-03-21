const {MongoClient, ObjectID} = require('mongodb');

var dbname ='todoapp1';

MongoClient.connect(`mongodb://localhost:27017/${dbname}`, { useNewUrlParser: true } , (error , client) => {

	if(error)
		{
			return console.log('Unable to connect to MongoDB server');
		}

	console.log('Connected to MongoDB server');
	const db = client.db(dbname)

	// db.collection('TO-DO-LIST').find({completed : false}).toArray().then((result) => {
	// 	console.log('Todos :');
	// 	console.log(JSON.stringify(result,  undefined, 2));
	// }, (error) => {
	// 	console.log('unable to fetch');
	// })

	db.collection('Users').find({Name : 'Mridul'}).toArray().then((result) => {
		console.log('Name :');
		console.log(JSON.stringify(result,  undefined, 2));
	}, (error) => {
		console.log('unable to fetch');
	})
	
	// client.close();
});