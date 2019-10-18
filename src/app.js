const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Check4DigiT',
        name: 'Axson Engineering'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Axson Engineering, Copy Right Jason'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'eMail Assistance.',
        title: 'Support',
        name: 'Axson Engineering'
    })
})
//------------------------------------------------
app.get('/MerchantRegisterForm', (req, res) => {
    res.render('MerchantRegisterForm', {
        clientsText: 'This is some helpful text for Clients !',
        title: 'Merchant Sign Up',
        name: 'Axson Engineering'
    })
})
app.get('/Login', (req, res) => {
    res.render('Login', {
        clientsText: 'This is a Login window for Clients !',
        title: 'Clients Login',
        name: 'Axson Engineering, Copy right:Jason Liang'
    })
})
app.get('/check4digipay', (req, res) => {
    res.render('check4digipay', {
        clientsText: 'This is some helpful info for bootstrap class !',
        title: 'Check4DigiPay',
        name: 'Axson Engineering'
    })
})
app.get('/securitycenter', (req, res) => {
    res.render('securitycenter', {
        clientsText: 'This is some helpful info for security !',
        title: 'Security Center',
        name: 'Axson Engineering'
    })
})
app.get('/clients', (req, res) => {
    res.render('clients', {
        clientsText: 'This is some helpful info for Clients !',
        title: 'Benefits for Clients',
        name: ' Axson Engineering Copy right:Jason Liang '
    })
})
app.get('/partners', (req, res) => {
    res.render('partners', {
        clientsText: 'This is some helpful info for Partners !',
        title: 'Benefits for Partners',
        name: ' Axson Engineering, Copy right: Jason Liang '
    })
})
app.get('/compliance', (req, res) => {
    res.render('compliance', {
        clientsText: 'This is some helpful info for Partners !',
        title: 'Federal Compliance',
        name: ' Axson Engineering, Copy right: Jason Liang '
    })
})
// //    app.get('/DigiCheck', (req, res) => {
//     if (!req.query.address){
//         return res.send({
//             error:"You need provide a search address"
//         }) 
//     } //

//-------------------------------------------------------
    app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide an address!'
            })
        }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
          
        if (error) {
              return res.send({error})

          } 

          forecast(latitude, longitude, (error, forecastData)=> {
              if (error) {
                  return res.send({error})

              }

              res.send({
                  forecast: forecastData,
                  location,
                  address: req.query.address
              })

          })
    })
    
})
   // })
app.get('/products', (req, res)=> {
    if (!req.query.search){
       return res.send({
             error: 'You must provide a search term'
         })   
    }

    console.log(req.query.search)
    res.send({
        products:[]

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('/digiPay/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Check 2 Pay Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
