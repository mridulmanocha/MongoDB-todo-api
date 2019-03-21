const {MongoClient, ObjectID} = require('mongodb');

var dbname ='todoapp1';

MongoClient.connect(`mongodb://localhost:27017/${dbname}`, { useNewUrlParser: true } , (error , client) => {

	if(error)
		{
			return console.log('Unable to connect to MongoDB server');
		}

	console.log('Connected to MongoDB server');
	const db = client.db(dbname)

	db.collection('Users').deleteOne({Name : 'Mridul'}).then((result) => {

		console.log(result);
	})
	
	// client.close();
});