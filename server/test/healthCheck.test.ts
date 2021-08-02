import server from "../src/main";
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

chai.should();
chai.use(chaiHttp);

describe("API health check", () => {
  it("Test GET route /api/health-check", (done) => {
    chai
      .request(server)
      .get("/api/health-check")
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
