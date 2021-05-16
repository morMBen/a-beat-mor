const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require('../middeleware/auth')

//find all users
router
    .get("/", async (req, res) => {
        //get all users
        try {
            const users = await userController.getUser(req, res);
            res.send(users)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    //using authentication
    .get("/me", auth, async (req, res) => {
        //get user profile
        try {
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })

    .get("/:id", (req, res) => {
        //get specific user
        userController.getUser(req, res);
    })
    .post("/", async (req, res) => {
        //create user
        try {
            const addUser = await userController.addUser(req, res);
            res.status(201).send(addUser)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .post('/login', async (req, res) => {
        //user login
        try {
            const user = await userController.userLogin(req, res);
            res.send(user)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .post('/logout', auth, async (req, res) => {
        //user logout
        try {
            req.user.tokens = req.user.tokens.filter(token => {
                return token.token !== req.token
            })
            // console.log(req.user)
            await req.user.save();

            res.send()
        } catch (e) {
            res.status(500).send(e.message)
        }
    })
    .patch('/me', auth, async (req, res) => {
        //update user
        try {
            const user = await userController.updateUser(req, res);
            res.send(user)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .delete("/me", auth, async (req, res) => {
        //delete user
        try {
            const user = await userController.deleteUser(req, res);
            res.send(user)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .delete("/", (req, res) => {
        //delete all users
        userController.deleteUsers(req, res);
    });

module.exports = router;