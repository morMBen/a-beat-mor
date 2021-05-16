const express = require("express")
const router = express.Router()
const SoundsRouter = require('./Sounds.router')
const UserRouter = require('./user.router')
const SoundCollection = require('./SoundCollection.router')

router.use('/sounds/', SoundsRouter)
router.use('/users/', UserRouter)
router.use('/sound-collection/', SoundCollection)

module.exports = router;