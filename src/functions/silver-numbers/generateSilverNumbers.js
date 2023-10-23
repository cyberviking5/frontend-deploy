import { findRepNumber } from "../findRepeatedNums";

export const generateSilverNumbers = (number) => {
  //------------------------------------------Functions for all same or at least 9 same numbers---------------------------

  //generate rand number, except some number
  function randomExcluded(excluded) {
    var n = Math.floor(Math.random() * 9);
    if (n >= excluded) n++;
    return n;
}

  const randSingleDigit = findRepNumber(number)
    ? findRepNumber(number)
    : Math.floor(Math.random() * 9); // Generate a random digit (0 to 9)

  const fiveRepeatNumberArray = Array(5).fill(randSingleDigit);
  const fourRepeatNumberArray = Array(4).fill(randSingleDigit);
  const threeRepeatNumberArray = Array(3).fill(randSingleDigit);

  for (let i = 0; i < 5; i++) {
    fiveRepeatNumberArray.splice(
        Math.floor(Math.random() * 9),
        0,
        randomExcluded(randSingleDigit)
      );
  }

  const fiveRepeatNumber = fiveRepeatNumberArray.join("");

  for (let i = 0; i < 6; i++) {
    fourRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      randomExcluded(randSingleDigit)
    );
  }

  const fourRepeatNumber = fourRepeatNumberArray.join("");

  for (let i = 0; i < 7; i++) {
    threeRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      Math.floor(Math.random() * 9)
    );
  }

  const threeRepeatNumber = threeRepeatNumberArray.join("");

  const similarNumbers = [];

  similarNumbers.push(fiveRepeatNumber, fourRepeatNumber, threeRepeatNumber);

  return similarNumbers;
};