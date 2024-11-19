
import breeds from '../data/breeds';
import { searchByBreedName } from '../utils/search';

describe('Search API', () => {
  it('searchByBreedName, empty', () => {
    const actual = searchByBreedName('', breeds);

    expect(actual).toBeUndefined();
  });
  it('searchByBreedName, saluki', () => {
    const actual = searchByBreedName('Saluki', breeds);

    expect(actual.breed).toEqual('Saluki');
  });

  it('searchByBreedName, Flat-Coated Retriever', () => {
    const actual = searchByBreedName('Flat-Coated Retriever', breeds);

    expect(actual.breed).toEqual('Flat-Coated Retriever');
  });

  it('searchByBreedName, L%F6wchen', () => {
    const actual = searchByBreedName('L%F6wchen', breeds);

    expect(actual.breed).toEqual('L%F6wchen');
  });
});