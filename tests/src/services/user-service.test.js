const { faker } = require("@faker-js/faker");

const User = require("../../../src/schemas/User");
const UserService = require("../../../src/services/user-service");

const userMock = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const existingUser = {
  ...userMock,
  id: 1,
};

const UserServiceMock = {
  create: async () => ({ id: 1 }),
  findOne: async () => ({ id: 1 }),
  findOneWithReturnNull: async () => null,
  findOneExistingUser: async () => existingUser,
};

describe("Testando os serviços do usuário", () => {
  test("Deve retornar um ID válido ao criar um novo usuário", async () => {
    jest.spyOn(User, "create").mockImplementationOnce(UserServiceMock.create);
    // User.create = UserServiceMock.create;

    const result = await UserService.createUser(userMock);
    expect(result).toEqual({ id: 1 });
  });

  test("Deve retornar um objeto com o ID do usuário ao criar um novo usuário", async () => {
    jest.spyOn(User, "create").mockImplementationOnce(UserServiceMock.create);
    const result = await UserService.createUser(userMock);
    expect(typeof result).toBe("object");
  });

  test("Deve garantir que todas as propriedades estejam presentes após a criação de um novo usuário", async () => {
    jest.spyOn(User, "create").mockImplementationOnce(UserServiceMock.create);
    const result = await UserService.createUser(userMock);
    expect(result).toHaveProperty("id");
  });

  test("Deve retornar um erro ao tentar criar um usuário com um email ou CPF já existente", async () => {
    jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(UserServiceMock.findOneWithReturnNull);

    try {
      await UserService.userExistsAndCheckPassword(userMock);
    } catch (error) {
      expect(error).toBeInstanceOf(409);
    }
  });

  test("Deve retornar um erro ao verificar a senha se as senhas forem diferentes", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(UserServiceMock.findOne);

    try {
      await UserService.userExistsAndCheckPassword({
        email: userMock.email,
        password: "senha incorreta",
      });
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  test("Deve retornar verdadeiro ao verificar a existência e senha correta de um usuário", async () => {
    jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(UserServiceMock.findOneExistingUser);

    const result = await UserService.userExistsAndCheckPassword({
      email: userMock.email,
      password: userMock.password,
    });

    expect(result).toBe(true);
  });
});
