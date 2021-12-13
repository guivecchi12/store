const express = require('express')

const inventory = require('./API/inventory/inventory-router')

const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))


// API's
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to your API'
    })
})

app.use('/api/inventory', inventory);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = app