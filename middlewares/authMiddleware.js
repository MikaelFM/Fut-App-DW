export const authValidate = (req, res, next) => {
    if(!req.session?.user?._id){
        res.redirect("/login");
        return;
    }
    next();
}

export const usernameValidate = (req, res, next) => {
    if(req.body?.username?.length < 4){
        return res.render("login", { error: "Username deve conter pelo menos 4 caracteres" });
    }
    if(req.body?.username?.length > 15){
        return res.render("login", { error: "Username deve conter no máximo 15 caracteres" });
    }
    next();
}