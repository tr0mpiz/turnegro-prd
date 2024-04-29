export function isUser(req, res, next) {
    if (req.session.apellido) {
        //hacer el conts de datos con todos los datos del usuario
        const usuario = {
            puesto: req.session.puesto,
            nombre: req.session.nombre,
            apellido: req.session.apellido,
            permisos: req.session.permisos,
        };
        req.session.apellido = usuario;
        return next();
    }
    // return res.status(401).render("login", { error: "error de autenticacion!" });
    return res.redirect("/login");
}
export function isAdmin(req, res, next) {
    if (req.session.permisos) {
        return next();
    }
    // return res.status(401).render("login", { error: "error de autenticacion!" });
    return res.redirect("/login");
}

export function isLogin(req, res, next) {
    if (req.session.apellido) {
        console.log("ACASDASDASD"+req.session.apellido);
        return next();
    }
    // return res.status(401).render("login", { error: "error de autenticacion!" });
    return res.redirect("/login");
}
