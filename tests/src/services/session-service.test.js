require("dotenv").config();
const { faker } = require("@faker-js/faker");
const jwt = require("jsonwebtoken");

const SessionService = require("../../../src/services/session-service");

const email = faker.internet.email();

describe("Testando o serviço de sessão", () => {
  test("Deve retornar um token de verificação do tipo objeto", () => {
    const returnSign = SessionService.generateToken(email);
    const verifyToken = jwt.verify(returnSign, process.env.SECRET_KEY);
    expect(verifyToken).toBeInstanceOf(Object);
  });

  test("Deve lançar uma exceção quando a chave secreta não está definida no ambiente", () => {
    expect(() => {
      delete process.env.SECRET_KEY;
      SessionService.generateToken(email);
    }).toThrow();
  });

  test("Deve lançar uma exceção quando o email não está definido no ambiente", () => {
    expect(() => {
      SessionService.generateToken();
    }).toThrow();
  });
});
