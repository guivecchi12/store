const express = require('express')
const app = express()

const port = process.env.PORT || 3001
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))


// API's
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to your API'
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () =>{
    console.log(`\n *** Server started on port ${port} ***\n`)
})
