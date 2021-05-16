const mongoose = require('mongoose');

const sound = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    audio: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
        validate(arr) {
            if (arr.length < 1)
                throw new Error('You must enter at least one tag')
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Sounds = mongoose.model('Sounds', sound)


module.exports = Sounds;