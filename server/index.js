const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express();
require('./db/mongoose');
const route = require('./routers/Index.router')

const PORT = process.env.PORT || 5000;

require('dotenv').config()



app.use(express.json({ limit: "5mb" }))
app.use(cors())
app.use('/api', route);

// app.use((req, res) => {
//     res.status(404).send('Error: Something went wrong... try again')
// })

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})
