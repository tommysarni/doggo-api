import request from 'supertest';
import { createServer } from 'http';
import issueTokenHandler from '../api/v1/auth/issue-token';
import proxyHandler from '../api/v1/proxy';

const mockServer = () => {
  return createServer((req, res) => {
    if (req.url === '/api/v1/auth/issue-token' && req.method === 'POST') {
      return issueTokenHandler(req, res);
    }

    if (req.url === '/api/v1/auth/proxy' && req.method === 'POST') {
      return proxyHandler(req, res);
    }

    res.statusCode = 404;
    res.end('Not Found');
  });
};

describe('Authentication and Proxy Tests', () => {
  let token;

  test('should issue a valid token', async () => {
    const res = await request(mockServer())
      .post('/api/v1/auth/issue-token')
      .send();

    const json = JSON.parse(res.text);

    expect(res.status).toBe(200);
    expect(json.token).toBeDefined();
    token = json.token;
    expect(typeof token).toBe('string');
  });

  test('should access proxy endpoint with a valid token but error since no body', async () => {
    const res = await request(mockServer())
      .post('/api/v1/auth/proxy', {})
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.status).toBe(403);
  });

  test('should reject access to proxy endpoint without a token', async () => {
    const res = await request(mockServer())
      .post('/api/v1/auth/proxy')
      .send();

    const json = JSON.parse(res.text);

    expect(res.status).toBe(401);
    expect(json.error).toEqual('Authorization header missing.');
  });

  test('should reject access to proxy endpoint with an invalid token', async () => {
    const res = await request(mockServer())
      .post('/api/v1/auth/proxy')
      .set('Authorization', 'Bearer invalid-token')
      .send();

    const json = JSON.parse(res.text);

    expect(res.status).toBe(403);
    expect(json.error).toEqual('Invalid or malformed token');
  });
});
