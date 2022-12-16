import request from 'supertest';
import server from '../server';
import { connect, connection } from 'mongoose';
import { dbConnection } from '@/Databases';

/* Connecting to the database before each test. */
beforeEach(async () => {
  await connect(dbConnection.url, dbConnection.options);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await connection.close();
});
/* Test for getting  trainee by id. */
describe('GET trainee/:id', () => {
  test('Get trainee by Id', done => {
    request(server)
      .get('/api/trainee/637969352c3f71696ca34759')
      .expect(200)
      .expect(res => {
        res.body.data.name = 'Omar Sherif';
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

/* Test for creating a new user. */

describe('POST signup', () => {
  test('create user', done => {
    request(server)
      .post('/signup')
      .send({
        email: 'oaosdo@gmail.com',
        name: 'odsomsdof',
        password: 'dsfdsfdsf',
      })
      .expect(200)
      .expect(res => {
        res.body = {
          name: 'odsomsdof',
        };
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
