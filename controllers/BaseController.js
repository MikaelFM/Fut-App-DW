class BaseController {
    constructor(service) {
        this.service = service;
    }

    handle = (fn) => {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (err) {
                if (err.name === "ValidationError") {
                    const errors = Object.values(err.errors).map(e => e.message);
                    return res.status(400).json({ errors });
                }

                res.status(500).json({ errors: [err.message || "Erro interno no servidor"] });
            }
        }
    }

    getAll = this.handle(async (req, res) => {
        const items = await this.service.getAll();
        res.status(200).json({ items });
    });

    getById = this.handle(async (req, res) => {
        const item = await this.service.getById(req.params.id);
        res.status(200).json({ item });
    });

    save = this.handle(async (req, res, next) => {
        await this.service.save(req.body);
        next();
    });

    delete = this.handle(async (req, res) => {
        await this.service.delete(req.params.id);
        res.redirect(req.headers.referer);
    });

    deleteAll = this.handle(async (req, res) => {
        await this.service.deleteAll();
        res.status(200).json({ msg: "success" });
    });
}

export default BaseController;
