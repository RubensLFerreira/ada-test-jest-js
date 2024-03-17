require('dotenv').config();
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');

const SessionService = require('../../../src/services/session-service');

const email = faker.internet.email();

describe('Testando sessão de serviço', () => {
    test('Deve retornar um verify token do tipo object', () => {

        const returnSign = SessionService.generateToken(email);

        const verifyToken = jwt.verify(returnSign, process.env.SECRET_KEY);

        expect(verifyToken).toBeInstanceOf(Object)
    });

    test('Lança uma exceção quando a chave secreta não existe no ambiente', () => {
        expect(() => {
            delete process.env.SECRET_KEY

            SessionService.generateToken(email);
        }).toThrow();
    });

    
    test('Lança uma exceção quando o email não existe no ambiente', () => {
        expect(() => {
            SessionService.generateToken();
        }).toThrow();
    });
});