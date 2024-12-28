const searchByBreedName = (name, data) => {
  if (!name) return;
  const lowerName = name.toLowerCase().replaceAll(' ', '-').trim();
  const found = data.find(dog => dog.slug === lowerName);

  return found;
};

const getBreedList = (data) => {
  return data.map(({ slug, breed }) => ({ slug, breed }));
};

export { searchByBreedName, getBreedList };