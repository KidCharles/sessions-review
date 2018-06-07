require('dotenv').config()
const massive = require('massive')
const express = require('express')
const bodyParser = require('body-parser')
//just in case anything wierd happens
const cors = require('cors')
const ctrl = require('./controller')
const session = require('express-session')
//this is middleware that checks if the user has a session on it, if not assigns one
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

//this checks if they have a session, then if not assigns one, check checkUserSession.js
app.use(checkUserSession)

app.post('/api/login', ctrl.loginUser)
app.post('/api/register', ctrl.registerUser)



app.listen(SERVER_PORT, () => console.log(`Hey mang I'm glistening on port ${SERVER_PORT}`))
