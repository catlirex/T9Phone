export const removeLastChar = (currentWord) => {
  let toRemoveNum = 0;
  for (
    let i = currentWord.length;
    currentWord[i - 1] === currentWord[currentWord.length - 1];
    i--
  ) {
    toRemoveNum--;
  }
  return currentWord.slice(0, toRemoveNum);
};
