// const { faker } = require("@faker-js/faker");

const SessionController = require("../../../src/controllers/session-ctrl");
const Email = require('../../../src/utils/email-validator');
const UserService = require('../../../src/services/user-service');
const SessionService = require('../../../src/services/session-service');

const reqMock = {
  body: {
    email: 'rubens@gmail.com',
    password: 'senha123',
  },
};

const resMock = {
  status: () => {
    return {
      json: () => { }
    }
  }
};
const userMock = {
  email: 'rubens@gmail.com',
  password: 'senha123',
}

const userServiceMock = {
  create: async () => userMock
}

const sessionServiceMock = {
  generateToken: async () => 'token'
}

describe("Testando o controller de sessão", () => {
  test('Deve retornar um erro 400 quando o email é inválido', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(() => false);
    const resStatusSpy = jest.spyOn(resMock, 'status');
    await SessionController.create(reqMock, resMock);
    expect(resStatusSpy).toHaveBeenCalledWith(400);
  });

  test('Deve retornar um erro 400 quando a senha é inválida ou ausente', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(() => true);

    reqMock.body.password = '';
    const resStatusSpy = jest.spyOn(resMock, 'status');
    await SessionController.create(reqMock, resMock);
    expect(resStatusSpy).toHaveBeenCalledWith(400);
  });

  test('Deve retornar um erro 404 quando o usuário não existe', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(() => true);
    jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(() => {
      throw { status: 404, message: 'Usuário não encontrado' };
    });
    const resStatusSpy = jest.spyOn(resMock, 'status');
    await SessionController.create(reqMock, resMock);
    expect(resStatusSpy).toHaveBeenCalledWith(404);
  });

  test('Deve retornar um erro 500 quando ocorrer um erro inesperado', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(() => true);
    jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(() => {
      throw new Error('Erro inesperado');
    });

    try {
      await SessionController.create(reqMock, resMock);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  // test('Deve retornar um token ao criar uma sessão', async () => {
  //   jest.spyOn(Email, 'isValid').mockImplementationOnce(() => true);
  //   jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(() => true);
  //   jest.spyOn(SessionService, 'generateToken').mockImplementationOnce(() => 'token');
  //   const resStatusSpy = jest.spyOn(resMock, 'status');
  //   const resJsonSpy = jest.spyOn(resMock, 'status').mockReturnValue({ json: jest.fn() });

  //   await SessionController.create(reqMock, resMock);
  //   expect(resStatusSpy).toHaveBeenCalledWith(200);
  //   expect(resJsonSpy).toHaveBeenCalledWith({ token: 'token' });
  // });
});
