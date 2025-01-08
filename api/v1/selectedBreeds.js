import dogBreeds from '../../data/breeds.js';
import { filterBreeds } from '../../utils/search.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Wrong request method.' }));
    return;
  }

  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'API key is missing.' }));
    return;
  }

  if (apiKey !== process.env.JWT_SECRET) {
    res.statusCode = 403;
    res.end(JSON.stringify({ error: 'Invalid API key.' }));
    return;
  }

  let filters;

  try {
    const bodyData = await new Promise((resolve, reject) => {
      let data = '';

      req.on('data', (chunk) => data += chunk);
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });

    filters = JSON.parse(bodyData || '{}');
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
    return;
  }


  delete filters.path;
  delete filters.method;

  const breedList = filterBreeds(filters, dogBreeds);

  if (!breedList.length) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'No Breeds Found.' }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify(breedList));
  return;
}
