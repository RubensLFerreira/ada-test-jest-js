const { faker } = require('@faker-js/faker');

const Email = require('../../../src/utils/email-validator');

const email = faker.internet.email();

describe('Testando validação de e-mail', () => {
    test('Deve retornar true para e-mail válido', () => {
        expect(Email.isValid(email)).toBe(true);
    });

    test('Deve retornar false para e-mail inválido', () => {
        expect(Email.isValid('invalid_email')).toBe(false);
    });

    test('Deve retornar false para e-mail vazio', () => {
        expect(Email.isValid('')).toBe(false);
    });
}); 