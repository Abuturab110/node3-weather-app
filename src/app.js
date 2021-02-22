const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express configurations
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abuturab Sayed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abuturab Sayed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Message',
        title: 'Help',
        name: 'Abuturab Sayed'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address entered'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, placeName: location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: response,
                location: location,
                address: address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Abuturab Sayed',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Abuturab Sayed',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})