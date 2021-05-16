const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const auth = async (req, res, next) => {
    // console.log('Middleware is working')
    // next()
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismylogin')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ error: "Pleace authenticate" })
    }
}

module.exports = auth