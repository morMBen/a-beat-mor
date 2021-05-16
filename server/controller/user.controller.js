const User = require("../models/user.model");


const getUser = async (req, res) => {
    let result;
    try {
        result = await User.find({});
    } catch (e) {
        throw new Error(e)
    }
    return result
}

const addUser = async (req, res) => {
    let user = new User(req.body)
    try {
        const token = await user.generateToken()
        await user.save();
        return { user, token }
        // return user;
    } catch (e) {
        throw new Error(e)
    }
}

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedKeys = ['first', 'last', 'email', 'password', 'phone']
    const isValidKeys = updates.every(update => allowedKeys.includes(update))

    if (!isValidKeys) {
        throw new Error("error: Invalid updates")
    }
    try {
        // const user = await User.findById({ _id: req.params.id })
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        return req.user.user;
    } catch (e) {
        throw new Error(e)
    }
}

const userLogin = async (req, res) => {
    try {
        //findByCredentials - madeup function that has been created at the user model
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateToken()
        return { user, token }
    } catch (e) {
        throw new Error(e)
    }
}

const deleteUser = async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        req.user.remove()
        res.send(req.user)


    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    userLogin,
    deleteUser
};