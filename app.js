const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const inventory = require('./API/inventory/inventory-router')
const user = require('./API/user/user-router')
const order = require('./API/order/order-router')
const ordered_item = require('./API/ordered_items/ordered_items-router')

const app = express()
const path = require('path')

app.use(cors())
app.use(helmet())
app.use(cookieParser())


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "img-src https: data:;")
  return next();
})
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

// API's
app.get('/api', (req, res) => {
    res.json({message: 'Welcome to your API' })
})

app.use('/api/inventory', inventory)
app.use('/api/user', user)
app.use('/api/order', order)
app.use('/api/ordered_item', ordered_item)

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something went wrong",
        error: err
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = app