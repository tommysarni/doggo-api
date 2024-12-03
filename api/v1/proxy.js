import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed.' }));
    return;
  }

  const secret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Authorization header missing.' }));
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, secret);

    const { path, method } = req.body || {};

    if (!path || !method) {
      res.statusCode = 403;
      res.end(JSON.stringify({ error: 'Must include proper body data.' }));
      return;
    }

    const options = {
      method: method,
      headers: { 'x-api-key': secret },
      body: method === 'POST' || method === 'PUT' ? req.body : undefined,
    };

    const baseURL = {
      prod: process.env.ENDPOINT,
      dev: process.env.ENDPOINT_TEST,
      local: 'http://localhost:3000',
    }[process.env.env] || 'http://localhost:3000';

    const response = await fetch(`${baseURL}/api/${path}`, options);
    const data = await response.json();

    res.statusCode = response.status;
    res.end(JSON.stringify(data));
    return;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'Token expired. Please refresh.' }));
      return;
    }

    res.statusCode = 403;
    res.end(JSON.stringify({ error: 'Invalid or malformed token' }));
    return;
  }
}
