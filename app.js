const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const inventory = require('./API/inventory/inventory-router')
const user = require('./API/user/user-router')

const app = express()
const path = require('path')

app.use(cors())
app.use(helmet())
app.use(cookieParser())

app.use(
    // [
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", 'https://checkout.stripe.com'],
        frameSrc: ["'self'", 'https://checkout.stripe.com'],
        childSrc: ["'self'", 'https://checkout.stripe.com'],
        scriptSrc: ["'self'", 'https://checkout.stripe.com'],
        styleSrc: [
          "'self'",
          'https://fonts.googleapis.com',
          'https://checkout.stripe.com',
        ],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
        baseUri: ["'self'"],
      },
    })
    // ]
  )

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

// API's
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to your API'
    })
})

app.use('/api/inventory', inventory)
app.use('/api/user', user)

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