const { separateInput } = require("./controller.js");

test("separate the input number string into array by number", () => {
  expect(separateInput("111233332")).toStrictEqual(["111", "2", "3333", "2"]);
  expect(separateInput("1234")).toStrictEqual(["1", "2", "3", "4"]);
  expect(separateInput("8988")).toStrictEqual(["8", "9", "88"]);
  expect(separateInput("0000")).toStrictEqual(["0000"]);
  expect(separateInput("2")).toStrictEqual(["2"]);
});

test("if there is + sign it will slice the string", () => {
  expect(separateInput("11+12")).toStrictEqual(["11", "1", "2"]);
});
