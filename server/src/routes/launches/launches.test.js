import app from '../../app.js';
import supertest from 'supertest';

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    await supertest(app)
      .get('/launches')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('Test POST /launches', () => {
  const launchData = {
    mission: 'mission-test',
    destination: 'destination-test',
    rocket: 'rocket-test',
    launchDate: 'Jan 1, 2030'
  }

  const launchDataWithoutDate = {
    mission: 'mission-test',
    destination: 'destination-test',
    rocket: 'rocket-test'
  }

  const launchDataWithInvalidDate = {
    mission: 'mission-test',
    destination: 'destination-test',
    rocket: 'rocket-test',
    launchDate: 'hello'
  }

  test('It should respond with 201 created', async () => {
    const response = await supertest(app)
      .post('/launches')
      .send(launchData)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject(launchDataWithoutDate);

    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
  });

  test('It should catch missing required properties', async () => {
    const response = await supertest(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect(400)

    expect(response.body).toStrictEqual({error: "Missing required launch property."})
  });

  test('It should catch invalid date', async () => {
    const response = await supertest(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect(400)

    expect(response.body).toStrictEqual({error: 'Invalid launch date'})
  });
});
