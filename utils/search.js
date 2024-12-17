const searchByBreedName = (name, data) => {
  if (!name) return;
  const lowerName = name.toLowerCase().replaceAll(' ', '-').trim();
  const found = data.find(dog => dog.slug === lowerName);

  return found;
};


export { searchByBreedName };