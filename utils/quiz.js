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


const getQuizEffects = (quizAnswers, quiz) => {
  let effects = [];

  for (let [key, val] of Object.entries(quizAnswers)) {
    effects.push(...Object.entries(quiz[key]?.[val] || {}));
  }

  return effects;
};

const getQuizBreeds = (data) => {
  return data.filter(({ vibes }) => vibes !== undefined);
};


const getDistanceToRange = (num, range) => {
  num = Number(num);
  if (isNaN(num)) return -1;
  if (range.startsWith('-')) {
    let [, max] = range.split('-').map(Number);

    return (num <= max) ? 0 : num - max;
  } else if (range.includes('-')) {
    let [min, max] = range.split('-').map(Number);
    const avg = getAverageOfRange(range);

    return (min <= num && num <= max) ? 0 : Math.abs(avg - num);
  } else if (range.endsWith('+')) {
    let [min] = range.split('+').map(Number);

    return (min <= num) ? 0 : min - num;
  } else {
    const exact = Number(range);

    if (isNaN(exact)) return -1;
    return Math.abs(exact - num);
  }
};

const getQuizScoreForBreed = (effects) => (breed) => {
  let score = 100;

  const summary = getEffectsSummary(effects);

  for (const effect of summary) {
    const [key, val] = effect;
    const breedVal = breed[key] || breed.vibes?.[key];
    const { avg } = val;

    if (breedVal) {
      const distanceToRange = getDistanceToRange(breedVal, `${avg}`);

      if (distanceToRange === 0) score += 2;
      else score -= distanceToRange;
    }
  }

  score = Math.round(score * 10) / 10;
  return { ...breed, score };
};

const getAverageOfRange = (range) => {
  const MINIMUM = 1;
  const MAXIMUM = 5;

  if (range.startsWith('-')) {
    const [, max] = range.split('-').map(Number);

    if (max === MINIMUM) return MINIMUM;
    return Math.round((max + MINIMUM) * 10 / 2) / 10;
  } else if (range.includes('-')) {
    const [min, max] = range.split('-').map(Number);

    return Math.round((min + max) * 10 / 2) / 10;
  } else if (range.endsWith('+')) {
    const [min] = range.split('+').map(Number);

    if (min === MAXIMUM) return MAXIMUM;
    return Math.round((min + MAXIMUM) * 10 / 2) / 10;
  } else return Number(range);
};

const getEffectsSummary = (effectsList) => {
  const map = new Map();

  for (const effect of effectsList) {
    const [type, val] = effect;
    const currVal = map.get(type);
    const avg = getAverageOfRange(val);

    if (currVal === undefined) map.set(type, [avg, 1]);
    else {
      let [sum, count] = currVal;

      map.set(type, [sum + avg, count + 1]);
    }
  }

  const effectAverages = [...map].reduce((prev, [type, value]) => {
    const [sum, count] = value;

    const avg = Math.round(sum * 10 / count) / 10;

    return { ...prev, [type]: { avg, count } };
  }, {});

  return Object.entries(effectAverages).sort((a, b) => b[1].count - a[1].count);
};

const getEffectAnalysis = (effectSummary, breed, options = { limit: 3 }) => {
  const keytermDict = {
    'goodWithChildren': 'Good With Children',
    'energy': 'Energy',
    'exercise': 'Exercise',
    'playfullness': 'Playfulness',
    'affection': 'Affection',
    'dogFriendliness': 'Friendly toward Dogs',
    'petFriendliness': 'Friendly toward Pets',
    'strangerFriendliness': 'Friendly toward Strangers',
    'trainingEase': 'Ease of Training',
    'watchdog': 'Watchdog Ability',
    'protection': 'Protection Ability',
    'grooming': 'Grooming Needs',
    'coldTolerance': 'Cold Tolerance',
    'heatTolerance': 'Heat Tolerance',
    coolness: 'Coolness',
    beauty: 'Beauty',
    cuteness: 'Cuteness',
    cleverness: 'Cleverness',
    toughness: 'Toughness',
  };

  const rankNumber = (num) => {
    num = Number(num);
    if (isNaN(num)) return NaN;
    if (num < 2.3) return 'LOW';
    if (num > 3.6) return 'HIGH';
    else return 'STANDARD';
  };

  let results = [];

  for (const effect of effectSummary) {
    const [type, obj] = effect;
    const effectVal = Number(obj.avg);
    const breedVal = Number(breed[type]);

    if (!isNaN(breedVal) && !isNaN(effectVal) && Math.abs(effectVal - breedVal) <= 1) {
      const toAdd = [type, { ...obj, breedVal, rank: rankNumber(breedVal), text: keytermDict[type] }];

      results.push(toAdd);
    }

    if (results.length === options.limit) break;
  }
  
  return results;
};


export { getQuizEffects, getQuizBreeds, getQuizScoreForBreed, getEffectsSummary, getEffectAnalysis, getDistanceToRange, getAverageOfRange, QUIZ };