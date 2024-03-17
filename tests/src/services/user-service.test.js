const { faker } = require('@faker-js/faker');

const User = require('../../../src/schemas/User');
const UserService = require('../../../src/services/user-service');

const userMock = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

const UserServiceMock = {
    create: async () => ({ id: 1 })
}

describe('Testando os serviços do user', () => {
    test('Deve retornar um id válido da criação do usuário', async () => {
        jest.spyOn(User, 'create').mockImplementationOnce(UserServiceMock.create);
        // User.create = UserServiceMock.create;

        const result = await UserService.createUser(userMock);
        expect(result).toEqual({ id: 1 });
    });

    test('Deve retornar um', async () => {
        jest.spyOn(User, 'create').mockImplementationOnce(UserServiceMock.create);
        const result = await UserService.createUser(userMock);
        expect(typeof result).toBe('object');
    });

    test('Deve possuir todos os propriedades estabelcidas', async () => {
        jest.spyOn(User, 'create').mockImplementationOnce(UserServiceMock.create);
        const result = await UserService.createUser(userMock);
        expect(result).toHaveProperty('id');
    });
});