const server = require("../../index");
const request = require("supertest");

afterAll(function (done) {
  server.close(done);
});

describe("GET /predict", () => {
  test("should return 200 & valid response if request param list is set", (done) => {
    request(server)
      .get(`/predict/6666`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toEqual(expect.arrayContaining(["moon"]));
        done();
      });
  });

  test("should return 400 if request param is missing", (done) => {
    request(server)
      .get(`/predict/`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ ERROR: "route no set, please check" });
        done();
      });
  });

  test("should return 400 if request param is not valid", (done) => {
    request(server)
      .get(`/predict/123123`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ ERROR: "input not valid" });
        done();
      });
  });
});
