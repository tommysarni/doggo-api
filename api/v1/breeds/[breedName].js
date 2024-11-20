import dogBreeds from '../../../data/breeds.js';
import { searchByBreedName } from '../../../utils/search.js';

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

  const { url = '' } = req || {};
  const [, slug = ''] = url.split('breeds/');
  const [breedName] = slug.split('?') || [];

  if (!breedName) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Breed Name is required.' }));
    return;
  }

  const breed = searchByBreedName(breedName, dogBreeds);

  if (!breed) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Breed not found.' }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify(breed));
  return;
}
