const { faker } = require("@faker-js/faker");

const sessionController = require("../../../src/controllers/session-ctrl");
const emailValidator = require('../../../src/utils/email-validator');
const userService = require('../../../src/services/user-service');

const reqMock = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
};

const userServiceMock = {
  create: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

describe("Testando o controller de sessão", () => {
  test("Deve retornar um token ao autenticar um usuário", async () => {
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => true);

    jest.spyOn(userService, 'userExistsAndCheckPassword').mockImplementationOnce(userServiceMock.create);
    
    
    const result = await sessionController.create(reqMock)


    console.log(result);
  });
});
