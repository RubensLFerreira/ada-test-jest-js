const { faker } = require("test/test-helpers");

const sessionController = require("../../../src/controllers/session-ctrl");

const reqMock = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
};

describe("Testando o controller de sessão", () => {
  test("Deve retornar um token ao autenticar um usuário", async () => {
    await sessionController.create()

    expect().toBe();
  });
});
