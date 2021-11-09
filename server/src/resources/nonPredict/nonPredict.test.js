const { separateInput } = require("./controller.js");
const server = require("../../index");
const request = require("supertest");

describe("separateInput", () => {
  test("should separate the input number string into array by number", () => {
    expect(separateInput("111233332")).toStrictEqual(["111", "2", "3333", "2"]);
    expect(separateInput("1234")).toStrictEqual(["1", "2", "3", "4"]);
    expect(separateInput("8988")).toStrictEqual(["8", "9", "88"]);
    expect(separateInput("0000")).toStrictEqual(["0000"]);
    expect(separateInput("2")).toStrictEqual(["2"]);
  });

  test("should slice the string when there is +", () => {
    expect(separateInput("11+12")).toStrictEqual(["11", "1", "2"]);
  });
});

afterAll(function (done) {
  server.close(done);
});

describe("GET /nonPredict", () => {
  test("should return 200 & valid response if request param list is set", (done) => {
    request(server)
      .get(`/nonPredict/234`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ output: "adg" });
        done();
      });
  });

  test("should return 400 if request param is missing", (done) => {
    request(server)
      .get(`/nonPredict/`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ ERROR: "route no set, please check" });
        done();
      });
  });

  test("should return 400 if request param is not valid", (done) => {
    request(server)
      .get(`/nonPredict/123123`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ ERROR: "input not valid" });
        done();
      });
  });
});
