import { createServer } from 'http';
import request from 'supertest';
import handler from '../api/v1/breeds/[breedName].js';
import listHandler from '../api/v1/breedList.js';
import filterHandler from '../api/v1/selectedBreeds.js';
import dotenv from 'dotenv';

dotenv.config();

const createTestServer = (routeHandler) => {
  return createServer((req, res) => {
    routeHandler(req, res);
  });
};

describe('Breed Search API', () => {
  const secret = process.env.JWT_SECRET;

  it('should return 200 with Beagle', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/v1/breeds/beagle')
      .set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('Beagle');
  });

  it('should return 200 with Lowchen', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/v1/breeds/lowchen')
      .set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('L%C3%B6wchen');
    expect(json.slug).toEqual('lowchen');
  });

  it('should return 200 with Saluki', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/v1/breeds/saluki')
      .set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('Saluki');
    expect(json.group).toBe('hound');
    expect(json.popularity).toBe('uncommon');
  });

  it('should return 200 with Flat-Coated Retriever', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/v1/breeds/flat-coated-retriever')
      .set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('Flat-Coated Retriever');
    expect(json.group).toBe('sporting');
  });


  it('Should Error No Breed Name', async () => {
    const server = createTestServer(handler);

    const res = await request(server).get('/api/v1/breeds').set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(400);
    expect(json.error).toEqual('Breed Name is required.');
  });
  it('Should Error - No Breed named bagel', async () => {
    const server = createTestServer(handler);

    const res = await request(server).get('/api/breeds/bagel').set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(404);
    expect(json.error).toEqual('Breed not found.');
  });

  it('should return 404 for non-GET requests', async () => {
    const server = createTestServer(handler);


    const res = await request(server).post('/api/breeds/bagel');
    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(400);
    expect(json.error).toEqual('Wrong request method.');
  });

  it('should return 200 for getBreedList', async () => {
    const server = createTestServer(listHandler);
    const res = await request(server).get('/v1/breedList').set('x-api-key', secret);
    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.length).toEqual(186);
    expect(json[0].slug).toEqual('brittany');
    expect(json[0].breed).toEqual('Brittany');
  });

  it('should return 200 for getSelectedBreeds', async () => {
    const server = createTestServer(filterHandler);
    const res = await request(server)
      .post('/v1/selectedBreeds')
      .send({ goodWithChildren: '4-5', energy: '1' })
      .set('x-api-key', secret);

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.length).toEqual(2);
    expect(json[0].slug).toEqual('mastiff');
    expect(json[0].breed).toEqual('Mastiff');
  });
});
