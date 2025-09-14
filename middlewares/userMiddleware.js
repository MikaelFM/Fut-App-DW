export const saveUserValidate = (req, res, next) => {
    const senha = req.body?.senha ?? null;
    if(senha && senha !== req.body?.confirmar_senha){
        return res.render("login", { error: "As senhas não conferem" });
    }
    next();
}