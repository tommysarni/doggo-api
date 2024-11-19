import { createServer } from 'http';
import request from 'supertest';
import handler from '../api/breeds/[breedName].js';

const createTestServer = (routeHandler) => {
  return createServer((req, res) => {
    routeHandler(req, res);
  });
};

describe('Breed Search API', () => {
  it('should return 200 with Beagle', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/breeds/beagle');

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('Beagle');
  });

  it('should return 200 with Lowchen', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/breeds/L%F6wchen');

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('L%F6wchen');
  });

  it('should return 200 with Saluki', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/breeds/saluki');

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('Saluki');
    expect(json.group).toBe('hound');
    expect(json.popularity).toBe('uncommon');
  });

  it('should return 200 with Flat-Coated Retriever', async () => {
    const server = createTestServer(handler);
    const res = await request(server)
      .get('/api/breeds/flat-coated-retriever');

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(200);
    expect(json.breed).toEqual('Flat-Coated Retriever');
    expect(json.group).toBe('sporting');
  });


  it('Should Error No Breed Name', async () => {
    const server = createTestServer(handler);

    const res = await request(server).get('/api/breeds');

    const json = JSON.parse(res.text);

    expect(res.statusCode).toBe(400);
    expect(json.error).toEqual('Breed Name is required.');
  });
  it('Should Error - No Breed named bagel', async () => {
    const server = createTestServer(handler);

    const res = await request(server).get('/api/breeds/bagel');

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
});
