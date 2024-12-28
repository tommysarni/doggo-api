import dogBreeds from '../../data/breeds.js';
import { getBreedList } from '../../utils/search.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
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

  const breedList = getBreedList(dogBreeds);

  if (!breedList.length) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'No Breeds Found.' }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify(breedList));
  return;
}
