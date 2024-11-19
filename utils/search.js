const searchByBreedName = (name, data) => {
  if (!name) return;
  const lowerName = name.toLowerCase().replaceAll(' ', '-').trim();
  const found = data.find(dog => dog.breed.toLowerCase().replaceAll(' ', '-').trim() === lowerName);

  return found;
};


export {searchByBreedName};