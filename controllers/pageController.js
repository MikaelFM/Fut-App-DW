export const index = async (req, res) => {
    res.render('index');
}

export const login = async (req, res) => {
    res.render('login');
}

export const newEvent = async (req, res) => {
    res.render('new');
}