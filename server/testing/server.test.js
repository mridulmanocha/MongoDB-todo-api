const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {todo} = require('./../models/todo.js');

const todos = [{
	_id : new ObjectID(),	
	text : 'first todo'
},
{
	_id : new ObjectID(),
	text : 'second todo'
}];

beforeEach((done) => {
	todo.remove({}).then(() => {
		return todo.insertMany(todos);
	}).then(() => done());
});

describe('POST todo' , () => {
	it('should create a new todo' , (done) => {

		var text = 'todo text list';

	request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((error , res) => {
			if (error) {
				return done(error);
			}

			todo.find().then((result) => {
				expect(result.length).toBe(3);
				expect(result[2].text).toBe(text);
				done();
			}).catch((error) => done(error));
 		});

	});

	it('should not create a new todo with invalid data' , (done) => {

		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((error , res) => {
			if (error) {
				return done(error);
			} else {

				todo.find().then((result) => {
					expect(result.length).toBe(2);
					done();
				}).catch((error) => done(error));
			};
		});
	});
});

describe('GET todo' , () => {
	it('should display todos list on /todo' , (done) => {

		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.result.length).toBe(2);
		})
		.end(done);
	});
		
});

describe('GET todo/:id' , () => {
	it('should display todo' , (done) => {

		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('should return 404 for if todo not found' , (done) => {

		var newid = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${newid}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if id dis not valid' , (done) => {

		request(app)
		.get(`/todos/123ab`)
		.expect(404)
		.end(done);
	});
		
});