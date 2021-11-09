const passwordRegExp = /^[2-9,+]*$/;
const validateInput = (input) => passwordRegExp.test(input);

module.exports = { validateInput };
