const {MongoClient, ObjectID} = require('mongodb');

var dbname ='todoapp1';

MongoClient.connect(`mongodb://localhost:27017/${dbname}`, { useNewUrlParser: true } , (error , client) => {

	if(error)
		{
			return console.log('Unable to connect to MongoDB server');
		}

	console.log('Connected to MongoDB server');
	const db = client.db(dbname)

	// db.collection('TO-DO-LIST').findOneAndUpdate({ _id : new ObjectID('5c92ab843f7c162250a671b0')},
	// {
	// 	$set : {
	// 		completed : false 
	// 	}
	// },{
	// 	returnOriginal : false
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({ _id : new ObjectID('5c92af10b6ed063bd6afff10')},
	{
		$set : {
			Name : 'Mridul' 
		},
		$inc : {
			Age : 1
		}
	},{
		returnOriginal : false
	}).then((result) => {
		console.log(result);
	})
	
	// client.close();
});