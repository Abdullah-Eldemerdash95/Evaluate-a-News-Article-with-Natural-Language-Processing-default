const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');//npm install node-fetch from google search
const app = express()
const apiKey = process.env.API_KEY
const port = 8000 ;// use 8000 in development and 8001 in prod

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    console.log(res)
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})


app.post('/ArticleURL', async function (req, res) {
    const ArticleURL = req.body.url
    console.log(ArticleURL)
    const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${ArticleURL}&lang=en`
    const dataUsed = await fetch(apiURL)
    let data = await dataUsed.json()
    if (data && data.status.code == 0)
        res.send(data)
    else res.status(500).send({ message: "Server Error" })
})

module.exports={app}