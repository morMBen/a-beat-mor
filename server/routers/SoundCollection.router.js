const express = require("express")
const router = express.Router()
const auth = require('../middeleware/auth')
const SoundCollection = require('../models/SoundCollection.model')


router
    //Add new sound
    .post('/', auth, async (req, res) => {

        const sC = new SoundCollection({
            ...req.body,
            owner: req.user._id,
            ownerName: req.user.userName
        })
        console.log(sC._id)
        try {
            await sC.save()
            res.status(201).send(sC)
        } catch (e) {
            console.log(e.message)
            res.status(400).send({ 'error': e.message })
        }
    })
    .get('/', async (req, res) => {
        try {
            const sound = await SoundCollection.find({}).select('name ownerName');

            res.status(200).send(sound)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const sound = await SoundCollection.find({ '_id': req.params.id });
            res.status(200).send(sound)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
module.exports = router;