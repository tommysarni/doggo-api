import breeds from './data/test-data';
import { QUIZ } from '../utils/quiz';
import { searchByBreedName, getBreedList, filterBreeds, searchBreedByQuizResults } from '../utils/search';

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

  it('filterBreeds no filters', () => {
    const filters = {};
    const list = filterBreeds(filters, breeds);
    const [first] = list;
    const last = list[list.length - 1];

    expect(first.breed).toEqual('Brittany');
    expect(first.slug).toEqual('brittany');
    expect(last.breed).toEqual('Pembroke Welsh Corgi');
    expect(last.slug).toEqual('pembroke-welsh-corgi');
    expect(list.length).toEqual(186);
  });

  it('filterBreeds group working', () => {
    const filters = { group: 'working' };
    const list = filterBreeds(filters, breeds);
    const [first] = list;

    expect(first.breed).toEqual('Akita');
    expect(first.slug).toEqual('akita');
    expect(first.group).toEqual('working');

    expect(list.length).toEqual(30);
  });

  it('filterBreeds group working + energy', () => {
    const filters = { group: 'working', energy: '1-2' };
    const list = filterBreeds(filters, breeds);
    const [first] = list;

    expect(first.breed).toEqual('Anatolian Shepherd');
    expect(first.slug).toEqual('anatolian-shepherd');

    expect(list.length).toEqual(14);
  });

  it('filterBreeds energy + goodWithChildren', () => {
    const filters = { goodWithChildren: '4-5', energy: '1' };
    const list = filterBreeds(filters, breeds);
    const [first, second] = list;

    expect(first.breed).toEqual('Mastiff');
    expect(first.slug).toEqual('mastiff');

    expect(second.breed).toEqual('English Toy Spaniel');
    expect(second.slug).toEqual('english-toy-spaniel');

    expect(list.length).toEqual(2);
  });

  it('filterBreeds weight', () => {
    const filters = { group: 'hound', weight: 'small' };
    const list = filterBreeds(filters, breeds);
    const [first, second] = list;

    expect(first.breed).toEqual('Dachshund');
    expect(first.slug).toEqual('dachshund');

    expect(second.breed).toEqual('Portuguese Podengo Pequeno');
    expect(second.slug).toEqual('portuguese-podengo-pequeno');

    expect(list.length).toEqual(2);
  });

  it('filterBreeds height', () => {
    const filters = { group: 'working', height: 'medium' };
    const list = filterBreeds(filters, breeds);
    const [first] = list;
    const last = list[list.length - 1];

    expect(first.breed).toEqual('German Pinscher');
    expect(first.slug).toEqual('german-pinscher');

    expect(last.breed).toEqual('Standard Schnauzer');
    expect(last.slug).toEqual('standard-schnauzer');

    expect(list.length).toEqual(5);
  });

  it('searchBreedsByQuizResults ', () => {
    const sampleAnswers = {
      texture: 'sleek',
      architecture: 'minimalist',
      season: 'winter',
      artwork: 'classic',
      swatches: 'earthy',
      fashion: 'timeless',
      ambiance: 'cozy',
      era: 'neutral',
    };

    const settings = {
      quizAnswers: sampleAnswers,
      quiz: QUIZ,
      data: breeds,
    };
    const result = searchBreedByQuizResults(settings);

    expect(result).toBeDefined();
  });
});