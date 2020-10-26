const isAlphabetical = (word: string): boolean => {
  return /^[a-zA-z]+$/.test(word);
};

export default isAlphabetical;
