const databases = require("../../data/nonPredict.json");

const translate = (req, res) => {
  const input = req.params.input;
  const separatedInput = separateInput(input);
  const separatedOutput = getOutput(separatedInput);
  return res.json({ output: separatedOutput.join("") });
};

const separateInput = (input) => {
  let separated = [];
  let temp = input[0];

  for (let i = 1; i < input.length; i++) {
    if (input[i] === input[i - 1]) temp += input[i];

    if (input[i] !== input[i - 1]) {
      separated.push(temp);
      temp = input[i];
    }
    if (i === input.length - 1) separated.push(temp);
  }

  if (input.length === 1) separated.push(temp);
  return separated.filter((target) => target !== "+");
};

const getOutput = (separatedInput) =>
  separatedInput.map((target) => {
    let result = databases[target];
    let n = 0;
    while (!result) {
      n++;
      //   "7, 9" key has 4 alphabet, other has 3
      if (!result && target[0] !== "7" && target[0] !== "9")
        result = databases[target.substring(3 * n)];
      else if ((!result && target[0] === "7") || target[0] === "9")
        result = databases[target.substring(4 * n)];
    }
    return result;
  });

module.exports = { translate, separateInput };
