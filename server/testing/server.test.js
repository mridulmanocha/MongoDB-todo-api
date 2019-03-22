const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {todo} = require('./../models/todo.js');

beforeEach((done) => {
	todo.remove({}).then(() => done());
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
				expect(result.length).toBe(1);
				expect(result[0].text).toBe(text);
				done();
			}).catch((error) => done(error));
 		});

	});
});