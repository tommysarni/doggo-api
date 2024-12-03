import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function handler(req, res) {
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

  try {
    const token = jwt.sign({ user: 'client' }, secret, { expiresIn: '15m' });

    res.statusCode = 200;
    res.end(JSON.stringify({ token }));
    return;
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Token generation failed' }));
    return;
  }
}
