import { saveUserValidate } from '../middlewares/userMiddleware.js';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';

describe('saveUserValidate middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            render: jest.fn(),
        };
        next = jest.fn();
    });

    test('deve retornar erro quando algum campo obrigatório está vazio', () => {
        req.body = {
            nome: '',
            sobrenome: 'Fernandes',
            email: 'mikael@email.com',
            senha: '123456',
            confirmar_senha: '123456',
        };

        saveUserValidate(req, res, next);

        expect(res.render).toHaveBeenCalledWith(
            'register',
            expect.objectContaining({
                errors: expect.objectContaining({
                    nome: 'O campo nome é obrigatório',
                }),
            })
        );
        expect(next).not.toHaveBeenCalled();
    });

    test('deve retornar erro quando as senhas não conferem', () => {
        req.body = {
            nome: 'Mikael',
            sobrenome: 'Fernandes',
            email: 'mikael@email.com',
            senha: '123456',
            confirmar_senha: 'abcdef',
        };

        saveUserValidate(req, res, next);

        expect(res.render).toHaveBeenCalledWith(
            'register',
            expect.objectContaining({
                errors: expect.objectContaining({
                    confirmarSenha: 'As senhas não conferem',
                }),
            })
        );
        expect(next).not.toHaveBeenCalled();
    });
});
