
const authPage = (permision) => {

    return (req, res, next) => {
        const { role } = req.payload;

        if (!role) {
            return res.status(403).json('You need sign in');
        }
        if (!permision.includes(role)) {
            return res.status(401).json('You dont have a permission');

        }
        next();
    }
}

module.exports = { authPage }