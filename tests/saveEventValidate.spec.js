import { saveEventValidate } from '../middlewares/eventsMiddleware.js';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';

describe('saveEventValidate middleware', () => {
    const mockReq = (body) => ({ body });
    const mockRes = () => {
        const res = {};
        res.render = jest.fn();
        return res;
    };
    const mockNext = jest.fn();

    beforeEach(() => {
        mockNext.mockClear();
    });

    test('deve retornar erro quando campos obrigatórios estão vazios', () => {
        const req = mockReq({
            titulo: '',
            data: '',
            hora_inicio: '',
            hora_fim: '',
            local: '',
            numero_jogadores: '',
            valor: '',
            data_limite_confirmacao: '',
            hora_limite_confirmacao: '',
            confirmados: []
        });
        const res = mockRes();

        saveEventValidate(req, res, mockNext);

        expect(res.render).toHaveBeenCalledWith('form', expect.objectContaining({
            errors: expect.objectContaining({
                titulo: expect.any(String),
                data: expect.any(String)
            })
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve retornar erro quando hora fim <= hora início', () => {
        const req = mockReq({
            titulo: 'Racha Teste',
            data: '2099-12-20',
            hora_inicio: '20:00',
            hora_fim: '19:00',
            local: 'Quadra Central',
            numero_jogadores: '10',
            valor: '25.00',
            data_limite_confirmacao: '2099-12-19',
            hora_limite_confirmacao: '18:00',
            confirmados: []
        });
        const res = mockRes();

        saveEventValidate(req, res, mockNext);

        expect(res.render).toHaveBeenCalledWith('form', expect.objectContaining({
            errors: expect.objectContaining({
                hora_fim: 'A hora de término do evento deve ser maior que a de inicío'
            })
        }));
        expect(mockNext).not.toHaveBeenCalled();
    });
});
