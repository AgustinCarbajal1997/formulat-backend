const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("API - GET - /api/blog/getAllNews", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/blog/getAllNews");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/blog/getAllNews");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});
describe("API - GET - /api/blog/getHighlights", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/blog/getAllNews");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/blog/getAllNews");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});
describe("API - GET - /api/blog/setHighlights/:articleId", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/blog/setHighlights/622a6309191ed76e704e7ec8"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get(
      "/api/blog/setHighlights/622a6309191ed76e704e7ec8"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 404 not found", async () => {
    let response = await request.get("/api/blog/setHighlights/");
    expect(response.status).to.eql(404);
  });
});
describe("API - GET - /api/blog/getLatest", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/blog/getLatest");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/blog/getLatest");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});
describe("API - GET - /api/blog/getNewsBySlug/:slug", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/blog/getNewsBySlug/equipos-rechazan-la-peticion-de-haas-de-extender-su-test-1646964910003"
    );
    expect(response.status).to.eql(201);
  });
  it("Should return an object", async () => {
    let response = await request.get(
      "/api/blog/getNewsBySlug/equipos-rechazan-la-peticion-de-haas-de-extender-su-test-1646964910003"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
  it("Should return status 404 not found", async () => {
    let response = await request.get(
      "/api/blog/getNewsBySlug/equipos-rechazan-la-peticion-de-haas-de-extender-su-test-164696491000"
    );
    expect(response.status).to.eql(404);
  });
});
describe("API - POST - /api/blog/obtainSeveralIds", () => {
  it("Should return status 200", async () => {
    let response = await request
      .post("/api/blog/obtainSeveralIds")
      .send({
        ids: [
          "622a6309191ed76e704e7ec8",
          "622a6395191ed76e704e7ecd",
          "622a63ed191ed76e704e7ed0",
        ],
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request
      .post("/api/blog/obtainSeveralIds")
      .send({
        ids: [
          "622a6309191ed76e704e7ec8",
          "622a6395191ed76e704e7ecd",
          "622a63ed191ed76e704e7ed0",
        ],
      })
      .set("Accept", "application/json");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request
      .post("/api/blog/obtainSeveralIds")
      .send({
        ids: { a: "23123123", b: "23123123", c: "23123123" },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(400);
  });
});
describe("API - POST - /api/blog/postNews", () => {
  it("Should return status 201", async () => {
    let response = await request
      .post("/api/blog/postNews")
      .send({
        article: {
          title: "Gasly perdio el mundial",
          image: "http://image.com",
          description: "Revento alpha tauri",
          markdown: "Fallo el motor del coche",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(201);
  });
  it("Should return an object", async () => {
    let response = await request
      .post("/api/blog/postNews")
      .send({
        article: {
          image: "",
          description: "Revento alpha tauri",
          markdown: "Fallo el motor del coche",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(400);
  });
  it("Should return status 400 bad request", async () => {
    let response = await request
      .post("/api/blog/postNews")
      .send({
        article: {
          title: "Gasly perdio el mundial",
          image: "http://image.com",
          description: "Revento alpha tauri",
          markdown: "Fallo el motor del coche",
        },
      })
      .set("Accept", "application/json");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
});

describe("API - PUT - /api/blog/putNews", () => {
  it("Should return status 201", async () => {
    let response = await request
      .put("/api/blog/putNews/62311bd9be1a6f99389a39f0")
      .send({
        article: {
          title: "Kviat perdio el mundial",
          description: "Revento alpha tauri",
          markdown: "Fallo el motor del coche",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(201);
  });
  it("Should return an object", async () => {
    let response = await request
      .put("/api/blog/putNews/62311bd9be1a6f99389a39f0")
      .send({
        article: {
          image: "",
          description: "Revento alpha tauri",
          markdown: "Fallo el motor del coche",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(400);
  });
  it("Should return status 201", async () => {
    let response = await request
      .put("/api/blog/putNews/62311bd9be1a6f99389a39f0")
      .send({
        article: {
          title: "Kviat perdio el mundial",
          description: "Revento alpha tauri",
          markdown: "Fallo el motor del coche",
        },
      })
      .set("Accept", "application/json");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
});

describe("API - DELETE - /api/blog/deleteNews", () => {
  it("Should return status 200", async () => {
    let response = await request.delete(
      "/api/blog/deleteNews/62311e8027c084a07e048012"
    );
    expect(response.status).to.eql(200);
  });
});
