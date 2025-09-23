export function requireAuth(req, res, next) {
    if (!req?.session?.user?._id) {
        return res.redirect('/login');
    }
    next();
}