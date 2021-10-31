import { removeLastChar } from "../helper";

test("remove last character for non-predict mode, all duplicate number will remove", () => {
  expect(removeLastChar("111233332")).toBe("11123333");
  expect(removeLastChar("12333333")).toBe("12");
  expect(removeLastChar("1239878988")).toBe("12398789");
  expect(removeLastChar("0000")).toBe("");
  expect(removeLastChar("123456789")).toBe("12345678");
  expect(removeLastChar("1")).toBe("");
});
