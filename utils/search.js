import { getQuizBreeds, getQuizEffects, getQuizScoreForBreed, getEffectsSummary, getEffectAnalysis } from './quiz';

const toLightWeightData = (b) => {
  const { breed, slug, group } = b;

  return { breed, slug, group };
};

const searchByBreedName = (name, data) => {
  if (!name) return;
  const lowerName = name.toLowerCase().replaceAll(' ', '-').trim();
  const found = data.find(dog => dog.slug === lowerName);

  return found;
};

const getBreedList = (data) => {
  return data.map(toLightWeightData);
};

const filterBreeds = (filterObj, data) => {
  const filterFunc = Object.entries(filterObj).reduce((prev, [key, val]) => {
    const currFunc = (b) => {
      let breedVal = b[key];

      if (key === 'height') breedVal = b['maleHeightInInches'];
      if (key === 'weight') breedVal = b['maleWeightInLbs'];

      if (breedVal === undefined) return false;
      if (key === 'group') {
        return val === breedVal;
      }

      if (key === 'height' || key === 'weight') {
        const sizeBreakpoints = {
          height: {
            MIN: 17,
            MAX: 22,
          },
          weight: {
            MIN: 21,
            MAX: 50,
          },
        };

        let [min, max] = breedVal.split('-').map(Number);

        if (max === undefined) max = min;
        const isSmall = +max < sizeBreakpoints[key].MIN;
        const isLarge = +min > sizeBreakpoints[key].MAX;

        return {
          small: isSmall,
          large: isLarge,
          medium: !isSmall && !isLarge,
        }[val];
      }

      let [min, max] = val.split('-').map(Number);

      if (max === undefined) max = min;
      breedVal = parseInt(breedVal);

      return !isNaN(breedVal) && min <= breedVal && breedVal <= max;
    };

    return (b) => prev(b) && currFunc(b);
  }, () => true);

  return data.filter(filterFunc).map(toLightWeightData);
};


const searchBreedByQuizResults = (settings) => {
  const { quizAnswers, quiz, data, options = { limit: 5 } } = settings;
  const effects = getQuizEffects(quizAnswers, quiz);

  const summary = getEffectsSummary(effects);
  const eligibleBreeds = getQuizBreeds(data);

  const scores = eligibleBreeds.map(getQuizScoreForBreed(effects));
  let sortedScores = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, options.limit);

  if (!sortedScores.length) return { scores: []};

  const analysis = getEffectAnalysis(summary, sortedScores[2]);

  sortedScores = sortedScores.map(toLightWeightData);
  return { scores: sortedScores, analysis };
};

export { searchByBreedName, getBreedList, filterBreeds, searchBreedByQuizResults };