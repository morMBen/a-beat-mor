const express = require("express")
const router = express.Router()
const auth = require('../middeleware/auth')
const Sounds = require('../models/Sounds.model')


router
    //Add new sound
    .post('/', auth, async (req, res) => {
        const sound = new Sounds({
            ...req.body,
            owner: req.user._id
        })
        try {
            await sound.save()
            res.status(201).send(sound)
        } catch (e) {
            res.status(400).send(e)
        }
    })
    .get('/list', async (req, res) => {
        try {
            const sound = await Sounds.find();

            res.status(200).send(sound.map(e => {
                return { _id: e._id, name: e.name, tags: e.tags }
            }))
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .get('/tags/:name', async (req, res) => {
        try {
            const sound = await Sounds.find({ tags: { "$in": [req.params.name] } });
            res.status(200).send(sound.map(e => { return { id: e._id, name: e.name, tags: e.tags } }))
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .get('/tags', async (req, res) => {
        try {
            const sound = await Sounds.find({});
            const tags = [];
            sound.forEach(e => {
                e.tags.forEach(tag => {
                    if (!tags.includes(tag)) {
                        tags.push(tag)
                    }
                })
            })
            res.status(200).send(tags)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const sound = await Sounds.find({ '_id': req.params.id });
            res.status(200).send(sound)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    .get('/', async (req, res) => {
        try {
            const sound = await Sounds.find();
            res.status(200).send(sound)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
module.exports = router;