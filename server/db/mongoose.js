const mongoose = require('mongoose');

//↓↓↓↓↓↓ Local address ↓↓↓↓↓↓
// mongoose.connect('mongodb://127.0.0.1:27017/beat-mor',

// mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.sibae.mongodb.net/${'myFirstDatabase'}?retryWrites=true&w=majority`,

mongoose.connect('mongodb+srv://mordi:FvrfzqluBJ6Ioo1Z@cluster0.sibae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
