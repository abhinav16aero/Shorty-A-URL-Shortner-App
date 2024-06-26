const express = require('express')
const {connectDB} = require('./connectionDB/connection.js')
const cors = require('cors')
const authcontrollers = require('./controllers/authControllers.js')
const cookieParser = require('cookie-parser')
const {userValidation} = require('./middleware/authmiddleware.js')
const urlcontrollers = require('./controllers/urlControllers.js')

const app = express()

import http from 'http';
 
// Create a server object
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // Write some text to the response
    res.end('Welcome to my simple Node.js app!');
});
 

require('dotenv').config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(cors({
    origin: ''
}))
// Connect to MongoDB

connectDB(process.env.URI).then(()=>{
    console.log("connected to DB...")
    app.listen(process.env.PORT, ()=>console.log(`Server started on PORT: ${process.env.PORT}`))
})


// Url Routes

app.get('/api/user',urlcontrollers.get_url)
app.post('/api/user', urlcontrollers.post_url)
app.delete('/:shortid', urlcontrollers.delete_url)
app.get('/:shortid', urlcontrollers.get_click_short_url)
app.post('/api/user/premium', urlcontrollers.post_premium_url)
app.get('/analytics/:shortid', urlcontrollers.get_clicks_data)

// Auth routes
app.post('/signup', authcontrollers.signup_post)
app.post('/login', authcontrollers.login_post)
app.post('/workspace', userValidation)