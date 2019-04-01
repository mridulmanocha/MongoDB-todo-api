const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {todo} = require('./models/todo.js');
var {user} = require('./models/users.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req , res) => {

	var todo1 = new todo({
		text : req.body.text
	});

	todo1.save().then((result) => {
		res.send(result);
	}, (error) => {
		res.status(400).send(error);
	})
});

app.get('/todos' , (req , res) => {
	todo.find().then((result) => {
		res.send({result})
	}, (error) => {
		res.status(400).send(error);
	});
});

app.get('/todos/:id' , (req , res) => {
	var id = req.params.id;
	
	if (!ObjectID.isValid(id)){
		return res.status(404).send();
	} 

	todo.findById(id).then((todo) => {

			if(!todo) {
				return res.status(404).send();
			}

			res.send({todo});

	}).catch((e) => {
		res.status(404).send();
	});
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id' , (req , res) => {
	var id = req.params.id;
	var body = _.pick(req.body , ['text','completed']);

	 if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  		if (_.isBoolean(body.completed) && body.completed) {
  			body.completedAt = new Date();

  		} else
  		{
  			body.completed = false;
  			body.completedAt = null;
  		}

  	todo.findByIdAndUpdate(id , {$set : body} , {new : true}).then((todo) => {
  		if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
	}).catch((error) => {
		res.status(404).send();
	}) 	
});

app.listen(port, () => {
	console.log(`server is up and running on port ${port}`);
}
);

module.exports = {app};