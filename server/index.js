require('dotenv').config()
const massive = require('massive')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ctrl = require('./controller')
const session = require('express-session')
const checkUserSession = require('./middleware/checkUserSession')

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET,
} = process.env

const app = express()

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.use(bodyParser.json())
app.use(cors())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkUserSession)

app.post('/api/login', ctrl.loginUser)
app.post('/api/register', ctrl.registerUser)



app.listen(SERVER_PORT, () => console.log(`Hey mang I'm glistening on port ${SERVER_PORT}`))
