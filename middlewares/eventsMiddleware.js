import { parseDateTime } from '../utils/utils.js'

export const saveEventValidate = (req, res, next) => {
    const requiredFields = {
        titulo: 'titulo',
        data: 'data',
        hora_inicio: 'hora de início',
        hora_fim: 'hora de término',
        local: 'local',
        numero_jogadores: 'número de jogadores',
        valor: 'valor',
        data_limite_confirmacao: 'data limite de confirmação',
        hora_limite_confirmacao: 'hora limite de confirmação'
    };

    req.body.confirmados = req.body.confirmados || [];

    let errors = {};

    for (let field in requiredFields) {
        if (req.body[field] !== undefined && req.body[field].length === 0) {
            errors[field] = `O campo ${requiredFields[field]} é obrigatório`;
        }
    }

    if (
        !errors.hasOwnProperty('data') &&
        !errors.hasOwnProperty('hora_inicio') &&
        !errors.hasOwnProperty('hora_fim')
    ) {
        const data_inicio = parseDateTime(req.body.data, req.body.hora_inicio);
        const data_final = parseDateTime(req.body.data, req.body.hora_fim);

        if(req.body.id == '' && data_inicio <= new Date()) {
            errors['data'] = `A data do evento deve ser maior que a data atual`;
        }

        if (data_inicio >= data_final) {
            errors['hora_fim'] = `A hora de término do evento deve ser maior que a de inicío`;
        }

        if (
            !errors.hasOwnProperty('data_limite_confirmacao') &&
            !errors.hasOwnProperty('hora_limite_confirmacao') &&
            parseDateTime(req.body.data_limite_confirmacao, req.body.hora_limite_confirmacao) > data_inicio
        ) {
            errors['data_limite_confirmacao'] = `A data limite de confirmação não pode ser maior que a data de início do evento`;
        }
    }

    if(
        !errors.hasOwnProperty('hora_inicio') &&
        !errors.hasOwnProperty('hora_fim') &&
        parseDateTime(req.body.data, req.body.hora_inicio) >= parseDateTime(req.body.data, req.body.hora_fim)
    ){
        errors['hora_fim'] = `A hora de término do evento deve ser maior que a de inicío`;
    }

    if(req.body.confirmados.length > req.body.numero_jogadores){
        errors['numero_jogadores'] = "O número de jogadores não pode ser menor que o número de confirmados";
    }

    if (Object.values(errors).length > 0) {
        return res.render('form', { fields: req.body, errors })
    }

    next();
}