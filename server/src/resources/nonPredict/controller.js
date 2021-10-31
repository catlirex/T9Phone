const databases = require("../../data/nonPredict.json");

const translate = (req, res) => {
  const input = req.params.input;
  const separatedInput = separateInput(input);
  const separatedOutput = separatedInput.map((target) => databases[target]);
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

module.exports = { translate, separateInput };
