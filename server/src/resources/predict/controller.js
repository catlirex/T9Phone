const { unigram } = require("unigram");

const wordsWithWeight = unigram.slice(0, 50000);
const numMap = {
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
};

const predict = (req, res) => {
  const input = [...req.params.input];
  let inputLength = input.length;
  const possibleOutput = getPossibleOutput(input, inputLength);
  console.log("possibleOutput", possibleOutput);
  return res.json({ result: possibleOutput });
};

const getPossibleOutput = (input, inputLength) => {
  let output = [];

  if (inputLength === 1) {
    output = numMap[input];
  } else {
    output = filterWords(input, inputLength);
  }

  if (!output || !output.length) {
    let dummy = input.map((num) => numMap[num][0]);
    output = [dummy.join("")];
  }

  return output;
};

const filterWords = (input, inputLength) => {
  let toFilterWord = wordsWithWeight;

  for (let i = 0; i < inputLength; i++) {
    if (!toFilterWord.length) return;

    let temp = [];
    for (let alphabet of numMap[input[i]]) {
      let match = toFilterWord.filter(
        (dictWord) =>
          dictWord.word[i] === alphabet && dictWord.word.length === inputLength
      );
      temp = [...temp, ...match];
    }
    toFilterWord = temp;
  }

  return toFilterWord.map((wordObject) => wordObject.word);
};

module.exports = { predict };
