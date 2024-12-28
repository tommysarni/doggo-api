
import breeds from '../data/breeds';
import { searchByBreedName, getBreedList } from '../utils/search';

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

  it('searchByBreedName, Lowchen', () => {
    const actual = searchByBreedName('Lowchen', breeds);

    expect(actual.breed).toEqual('L%C3%B6wchen');
    expect(actual.slug).toEqual('lowchen');
  });

  it('getBreedList', () => {
    const list = getBreedList(breeds);
    const [first] = list;
    const last = list[list.length - 1];

    expect(first.breed).toEqual('Brittany');
    expect(first.slug).toEqual('brittany');
    expect(last.breed).toEqual('Pembroke Welsh Corgi');
    expect(last.slug).toEqual('pembroke-welsh-corgi');
    expect(list.length).toEqual(186);
  });
});