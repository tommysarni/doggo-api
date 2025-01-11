
import breeds from './data/test-data';
import { getAverageOfRange, getDistanceToRange, getEffectsSummary, getQuizBreeds, getQuizEffects, getQuizScoreForBreed } from '../utils/quiz';


describe('Quiz Test Suite', () => {
  const brittany = {
    'slug': 'brittany',
    'breed': 'Brittany',
    'group': 'sporting',
    'goodWithChildren': '4',
    'energy': '4',
    'exercise': '5',
    'playfullness': '4',
    'affection': '5',
    'dogFriendliness': '3',
    'petFriendliness': '3',
    'strangerFriendliness': '5',
    'trainingEase': '4',
    'watchdog': '4',
    'protection': '1',
    'grooming': '1',
    'coldTolerance': '3',
    'heatTolerance': '3',
    'maleWeightInLbs': '30-40',
    'femaleWeightInLbs': '30-40',
    'maleHeightInInches': '17.5-20.5',
    'femaleHeightInInches': '17.5-20.5',
    'popularity': 'popular',
    'origin': 'France',
    'originDate': '1800s',
    'temperament': 'quick|curious|active|independent|responsive|mental-exercise|physical-exercise',
    'lifespan': '12-13',
    'maleHeightInCm': '44-52',
    'femaleHeightInCm': '44-52',
    'maleWeightInKgs': '13-18',
    'femaleWeightInKgs': '13-18',
    vibes: {
      coolness: '4',
      beauty: '3',
      cuteness: '4',
      cleverness: '4',
      toughness: '3',
    },
  };

  const LOW = '1-2';
  const MODERATE = '2-4';
  const HIGH = '4-5';
  const QUIZ = {
    texture: {
      sleek: {
        energy: MODERATE,
        grooming: LOW,
        coolness: HIGH,
        beauty: HIGH,
      },
      fluffy: {
        affection: HIGH,
        grooming: '3+',
        cuteness: HIGH,
        goodWithChildren: HIGH,
        beauty: MODERATE,
      },
      course: {
        toughness: HIGH,
        protection: '3+',
        coolness: HIGH,
        goodWithChildren: '-3',
        beauty: '-3',
      },
    },
    architecture: {
      minimalistic: {
        grooming: LOW,
        affection: '-3',
        strangerFriendliness: '-3',
        playfullness: '-3',
      },
      modern: {
        cleverness: HIGH,
        energy: '3+',
        trainingEase: '3+',
      },
      traditional: {
        protection: '3+',
        affection: MODERATE,
        toughness: HIGH,
        exercise: '3+',
      },
    },
    season: {
      summer: {
        heatTolerance: '3+',
        energy: HIGH,
        playfullness: HIGH,
        toughness: '-3',
      },
      autumn: {
        coldTolerance: '3+',
        heatTolerance: '3+',
        energy: MODERATE,
        playfullness: MODERATE,
        affection: HIGH,
        toughness: MODERATE,
      },
      winter: {
        coldTolerance: HIGH,
        affection: HIGH,
        playfullness: MODERATE,
        energy: '-3',
        toughness: '3+',
      },
    },
    artwork: {
      abstract: {
        trainingEase: HIGH,
        cleverness: HIGH,
        energy: MODERATE,
        exercise: '-3',
        coolness: '3+',
      },
      classic: {
        affection: HIGH,
        beauty: HIGH,
        grooming: '3+',
        trainingEase: '-3',
      },
      nature: {
        energy: HIGH,
        cleverness: HIGH,
        exercise: HIGH,
        trainingEase: MODERATE,
      },
    },
    swatches: {
      vivid: {
        energy: HIGH,
        playfullness: HIGH,
        dogFriendliness: '3+',
        strangerFriendliness: '3+',
      },
      pastel: {
        affection: HIGH,
        energy: LOW,
        playfullness: '-3',
        coolness: '-3',
        goodWithChildren: HIGH,
        trainingEase: '3+',
      },
      earthy: {
        toughness: HIGH,
        coolness: HIGH,
        affection: MODERATE,
        goodWithChildren: MODERATE,
        trainingEase: MODERATE,
      },
    },
    fashion: {
      trendy: {
        energy: HIGH,
        playfullness: HIGH,
        beauty: HIGH,
      },
      timeless: {
        affection: HIGH,
        energy: MODERATE,
        grooming: MODERATE,
        trainingEase: '3+',
      },
      sporty: {
        exercise: HIGH,
        toughness: HIGH,
        coolness: HIGH,
        trainingEase: HIGH,
      },
    },
    ambiance: {
      bright: {
        energy: HIGH,
        playfullness: MODERATE,
        cleverness: HIGH,
        heatTolerance: '3+',
        strangerFriendliness: HIGH,
      },
      cozy: {
        energy: LOW,
        affection: HIGH,
        playfullness: LOW,
        strangerFriendliness: LOW,
        cleverness: '-3',
      },
      dark: {
        coolness: HIGH,
        toughness: HIGH,
        beauty: HIGH,
        playfullness: LOW,
      },
    },
    era: {
      vintage: {
        protection: HIGH,
        energy: MODERATE,
        affection: '-3',
        watchdog: HIGH,
        toughness: '3+',
        strangerFriendliness: LOW,
      },
      neutral: {
        protection: '-3',
        strangerFriendliness: HIGH,
        dogFriendliness: HIGH,
        affection: HIGH,
        playfullness: HIGH,
        energy: MODERATE,
      },
      sports: {
        affection: MODERATE,
        cleverness: HIGH,
        energy: HIGH,
        trainingEase: HIGH,
      },
    },
  };

  const sampleAnswers = {
    texture: 'sleek',
    architecture: 'traditional',
    season: 'summer',
    artwork: 'abstract',
    swatches: 'vivid',
    fashion: 'timeless',
    ambiance: 'cozy',
    era: 'neutral',
  };

  it('getQuizBreeds', () => {
    const eligibleBreeds = getQuizBreeds(breeds);
    const [first] = eligibleBreeds;
    const last = eligibleBreeds.at(-1);

    expect(first.vibes).toBeDefined();
    expect(first.vibes.coolness).toEqual('4');
    expect(last.vibes).toBeDefined();
    expect(last.vibes.beauty).toEqual('3');
  });

  it('getQuizEffects sampleAnswer', () => {
    const effects = getQuizEffects(sampleAnswers, QUIZ);
    const [first] = effects;
    const last = effects.at(-1);

    expect(first[0]).toEqual('energy');
    expect(first[1]).toEqual('2-4');
    expect(last[0]).toEqual('energy');
    expect(last[1]).toEqual('2-4');

    expect(effects.length).toEqual(36);
  });

  it('getEffectsSummary sampleAnswer', () => {
    const effects = getQuizEffects(sampleAnswers, QUIZ);
    let summary = getEffectsSummary(effects);

    summary = summary.reduce((prev, curr) => {
      const [type, obj] = curr;

      return { ...prev, [type]: obj };
    }, {});

    const energyAvg = 3.2; // 3, 4.5, 3, 4.5, 3, 1.5, 3
    const energyCount = 7;

    expect(summary.energy.avg).toEqual(energyAvg);
    expect(summary.energy.count).toEqual(energyCount);
    const groomingAvg = 2.3;
    const groomingCount = 2;

    expect(summary.grooming.avg).toEqual(groomingAvg);
    expect(summary.grooming.count).toEqual(groomingCount);
    const coolnessAvg = 4.3;
    const coolnessCount = 2;

    expect(summary.coolness.avg).toEqual(coolnessAvg);
    expect(summary.coolness.count).toEqual(coolnessCount);
    const beautyAvg = 4.5;
    const beautyCount = 1;

    expect(summary.beauty.avg).toEqual(beautyAvg);
    expect(summary.beauty.count).toEqual(beautyCount);
    const protectionAvg = 3;
    const protectionCount = 2;

    expect(summary.protection.avg).toEqual(protectionAvg);
    expect(summary.protection.count).toEqual(protectionCount);
    const affectionAvg = 4.1;
    const affectionCount = 4;

    expect(summary.affection.avg).toEqual(affectionAvg);
    expect(summary.affection.count).toEqual(affectionCount);
    const toughnessAvg = 3.3;
    const toughnessCount = 2;

    expect(summary.toughness.avg).toEqual(toughnessAvg);
    expect(summary.toughness.count).toEqual(toughnessCount);
    const exerciseAvg = 3;
    const exerciseCount = 2;

    expect(summary.exercise.avg).toEqual(exerciseAvg);
    expect(summary.exercise.count).toEqual(exerciseCount);
    const heatToleranceAvg = 4;
    const heatToleranceCount = 1;

    expect(summary.heatTolerance.avg).toEqual(heatToleranceAvg);
    expect(summary.heatTolerance.count).toEqual(heatToleranceCount);
    const playfullnessAvg = 3.8;
    const playfullnessCount = 4;

    expect(summary.playfullness.avg).toEqual(playfullnessAvg);
    expect(summary.playfullness.count).toEqual(playfullnessCount);
    const trainingEaseAvg = 4.3;
    const trainingEaseCount = 2;

    expect(summary.trainingEase.avg).toEqual(trainingEaseAvg);
    expect(summary.trainingEase.count).toEqual(trainingEaseCount);
    const clevernessAvg = 3.3;
    const clevernessCount = 2;

    expect(summary.cleverness.avg).toEqual(clevernessAvg);
    expect(summary.cleverness.count).toEqual(clevernessCount);
    const dogFriendlinessAvg = 4.3;
    const dogFriendlinessCount = 2;

    expect(summary.dogFriendliness.avg).toEqual(dogFriendlinessAvg);
    expect(summary.dogFriendliness.count).toEqual(dogFriendlinessCount);
    const strangerFriendlinessAvg = 3.3;
    const strangerFriendlinessCount = 3;

    expect(summary.strangerFriendliness.avg).toEqual(strangerFriendlinessAvg);
    expect(summary.strangerFriendliness.count).toEqual(strangerFriendlinessCount);
  });

  it('getDistanceToRange exact equal', () => {
    const actual = getDistanceToRange('1', '1');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange exact difference pos', () => {
    const actual = getDistanceToRange('1', '2');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange exact difference neg', () => {
    const actual = getDistanceToRange('2', '1');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange >= on_range', () => {
    const actual = getDistanceToRange('1', '1+');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange >= on_range last', () => {
    const actual = getDistanceToRange('5', '5+');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange >= in_range', () => {
    const actual = getDistanceToRange('2', '1+');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange >= less than range', () => {
    const actual = getDistanceToRange('1', '2+');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange >= less than range', () => {
    const actual = getDistanceToRange('1', '3+');
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange <= on_range', () => {
    const actual = getDistanceToRange('1', '-1');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange <= on_range last', () => {
    const actual = getDistanceToRange('5', '-5');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange <= in_range', () => {
    const actual = getDistanceToRange('2', '-3');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange <= less than range', () => {
    const actual = getDistanceToRange('3', '-2');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange >= less than range', () => {
    const actual = getDistanceToRange('5', '-3');
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange range on range min', () => {
    const actual = getDistanceToRange('1', '1-3');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange range on range max', () => {
    const actual = getDistanceToRange('3', '1-3');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange range in range', () => {
    const actual = getDistanceToRange('2', '1-3');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange range in range 1 number', () => {
    const actual = getDistanceToRange('1', '1-1');
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange range less than range', () => {
    const actual = getDistanceToRange('1', '2-4');
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  it('getDistanceToRange range greater than range', () => {
    const actual = getDistanceToRange('5', '2-4');
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange single num', () => {
    const actual = getAverageOfRange('1');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange single num 3', () => {
    const actual = getAverageOfRange('3');
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange <= 1', () => {
    const actual = getAverageOfRange('-1');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange <= 2', () => {
    const actual = getAverageOfRange('-2');
    const expected = 1.5;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange <= 5', () => {
    const actual = getAverageOfRange('-5');
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange >= 5', () => {
    const actual = getAverageOfRange('5+');
    const expected = 5;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange >= 4', () => {
    const actual = getAverageOfRange('4+');
    const expected = 4.5;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange >= 1', () => {
    const actual = getAverageOfRange('1+');
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange range 1-5', () => {
    const actual = getAverageOfRange('1-5');
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange range 1-1', () => {
    const actual = getAverageOfRange('1-1');
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  it('getAverageOfRange range 3-4', () => {
    const actual = getAverageOfRange('3-4');
    const expected = 3.5;

    expect(actual).toEqual(expected);
  });

  it('getQuizScoreForBreed', () => {
    const effects = getQuizEffects(sampleAnswers, QUIZ);
    const actual = getQuizScoreForBreed(effects)(brittany);

    expect(actual.slug).toEqual('brittany');
    expect(actual.score).toEqual(85.7);
  });
});