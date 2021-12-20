const express = require('express')
const cors = require('cors')
// const helmet = require('helmet')
// const cookieParser = require('cookie-parser')

const inventory = require('./API/inventory/inventory-router')
// const user = require('./API/user/user-router')

const app = express()
const path = require('path')

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))


// API's
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to your API'
    })
})

app.use('/api/inventory', inventory)
// app.use('/api/user', user)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = app