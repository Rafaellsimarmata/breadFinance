const validate = (req, res, next) => {
    const { userName, email, password, fullName } = req.body;

    function validEmail(userEmail) {
        // eslint-disable-next-line no-useless-escape
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validUsername(userName) {
        return /^[^\s]+$/.test(userName);
    }

    function validPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    }

    if (!validEmail(email)) {
        return res.status(400).json({
            message: 'Invalid Email',
            status: 400,
        });
    }

    if (!validPassword(password)) {
        return res.status(400).json({
            message: 'Invalid password',
            status: 400,
        });
    }

    if (req.path === '/register') {
        if (![email, userName, password, fullName].every(Boolean)) {
            return res.status(400).json({
                message: 'Some fields are missing',
                status: 400,
            });
        }

        if (!validUsername(userName)) {
            return res.status(400).json({
                message: 'Invalid Username',
                status: 400,
            });
        }
    }

    if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.status(400).json({
                message: 'Some fields are missing',
                status: 400,
            });
        }
    }

    next();
};

export default validate;