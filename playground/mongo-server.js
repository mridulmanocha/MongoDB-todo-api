const {MongoClient, ObjectID} = require('mongodb');

var dbname ='todoapp1';

MongoClient.connect(`mongodb://localhost:27017/${dbname}`, { useNewUrlParser: true } , (error , client) => {

	if(error)
		{
			return console.log('Unable to connect to MongoDB server');
		}

	console.log('Connected to MongoDB server');
	const db = client.db(dbname)

	db.collection('TO-DO-LIST').insertOne({
		text : "Billu's Marriage",
		completed : true 
	}, (error , result) => {
		if (error) {
			return console.log('Unable to insert todo');
		}
		console.log(JSON.stringify(result.ops , undefined, 2));
	});

	// db.collection('users').insertOne({
	// 	Name : 'Mridul Manocha',
	// 	Age : 21,
	// 	Location : 'Delhi' 
	// }, (error , result) => {
	// 	if (error) {
	// 		return console.log('Unable to insert user');
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp());
	// 	// console.log(JSON.stringify(result.ops , undefined, 2));
	// });

	client.close();
});