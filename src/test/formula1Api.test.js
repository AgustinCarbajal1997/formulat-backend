const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("API - GET - /api/formula1/getF1DataApi/:endPoint", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/formula1/getF1DataApi/driverStandings"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request.get(
      "/api/formula1/getF1DataApi/driverStandings"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get("/api/formula1/getF1DataApi/driverStandi");
    expect(response.status).to.eql(400);
  });
});
describe("API - GET - /api/formula1/getData/:type", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/formula1/getData/pilotos");
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request.get("/api/formula1/getData/pilotos");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get("/api/formula1/getData/pilot");
    expect(response.status).to.eql(400);
  });
});

describe("API - GET - /api/formula1/getDataBySlug/:type/:slug", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/formula1/getDataBySlug/pilotos/charles-leclerc-1646861424244"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request.get(
      "/api/formula1/getDataBySlug/pilotos/charles-leclerc-1646861424244"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get(
      "/api/formula1/getDataBySlug/pilot/charles-leclerc-1646861424244"
    );
    expect(response.status).to.eql(400);
  });
});

describe("API - POST - /api/formula1/postData/:type", () => {
  it("Should return status 200", async () => {
    let response = await request
      .post("/api/formula1/postData/pilotos")
      .send({
        newData: {
          name: "Valteri Bottas",
          image: "http://image.com",
          team: "Alfa Romeo",
          carNumber: "77",
          country: "Finlandia",
          nationality: "Finland",
          wins: "11",
          championships: "0",
          birthDate: "1988-10-04",
          descriptionMarkdown:
            "La sombra de Hamilton durante su paso por Mercedes",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(201);
  });
  it("Should return an object", async () => {
    let response = await request
      .post("/api/formula1/postData/pilotos")
      .send({
        newData: {
          name: "Valteri Bottas",
          image: "http://image.com",
          team: "Alfa Romeo",
          carNumber: "77",
          country: "Finlandia",
          nationality: "Finland",
          wins: "11",
          championships: "0",
          birthDate: "1988-10-04",
          descriptionMarkdown:
            "La sombra de Hamilton durante su paso por Mercedes",
        },
      })
      .set("Accept", "application/json");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
  it("Should return status 400", async () => {
    let response = await request
      .post("/api/formula1/postData/pilot")
      .send({
        newData: {
          name: "Valteri Bottas",
          image: "http://image.com",
          team: "Alfa Romeo",
          carNumber: "77",
          country: "Finlandia",
          nationality: "Finland",
          wins: "11",
          championships: "0",
          birthDate: "1988-10-04",
          descriptionMarkdown:
            "La sombra de Hamilton durante su paso por Mercedes",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(400);
  });
});

describe("API - POST - /api/formula1/putData/:type/:id", () => {
  it("Should return status 200", async () => {
    let response = await request
      .put("/api/formula1/putData/pilotos/62312812d27ca670f9ae92a5")
      .send({
        newData: {
          name: "Valteri Bottas",
          image: "http://image.com",
          team: "Alfa Romeo",
          carNumber: "77",
          country: "Finlandia",
          nationality: "Finland",
          wins: "11",
          championships: "0",
          birthDate: "1988-10-04",
          descriptionMarkdown:
            "La sombra de Hamilton durante su paso por Mercedes",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(201);
  });
  it("Should return an object", async () => {
    let response = await request
      .put("/api/formula1/putData/pilotos/62312812d27ca670f9ae92a5")
      .send({
        newData: {
          name: "Valteri Bottas",
          image: "http://image.com",
          team: "Alfa Romeo",
          carNumber: "77",
          country: "Finlandia",
          nationality: "Finland",
          wins: "11",
          championships: "0",
          birthDate: "1988-10-04",
          descriptionMarkdown:
            "La sombra de Hamilton durante su paso por Mercedes",
        },
      })
      .set("Accept", "application/json");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
  it("Should return status 400", async () => {
    let response = await request
      .put("/api/formula1/putData/pilot/62312812d27ca670f9ae92a5")
      .send({
        newData: {
          name: "Valteri Bottas",
          image: "http://image.com",
          team: "Alfa Romeo",
          carNumber: "77",
          country: "Finlandia",
          nationality: "Finland",
          wins: "11",
          championships: "0",
          birthDate: "1988-10-04",
          descriptionMarkdown:
            "La sombra de Hamilton durante su paso por Mercedes",
        },
      })
      .set("Accept", "application/json");
    expect(response.status).to.eql(400);
  });
});

// describe("API - DELETE - /api/formula1/deleteData/:type/:id", () => {
//     it("Should return status 200", async () => {
//       let response = await request.delete(
//         "/api/formula1/deleteData/pilotos/622e643894ddefa4cdbd5433"
//       );
//       expect(response.status).to.eql(200);
//     });
//   });
