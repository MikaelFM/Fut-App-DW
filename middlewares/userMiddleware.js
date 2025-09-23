export const saveUserValidate = (req, res, next) => {
    const senha = req.body?.senha ?? null;
    const fields = {
        nome: 'nome',
        sobrenome: 'sobrenome',
        senha: 'senha',
        email: 'e-mail',
    };

    let errors = {};

    for (let field in fields) {
        if (req.body[field] !== undefined && req.body[field].length === 0) {
            errors[field] = `O campo ${fields[field]} é obrigatório`;
        }
    }

    if (senha && senha !== req.body?.confirmar_senha){
        errors['confirmarSenha'] = "As senhas não conferem";
    }

    if (senha.length < 8){
        errors['senha'] = `O campo senha deve ter ao menos 8 dígitos`;
    }

    if (Object.values(errors).length > 0) {
        return res.render('register', { fields: req.body, errors })
    }

    next();
}