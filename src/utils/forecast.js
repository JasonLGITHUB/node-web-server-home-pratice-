const request = require('request')

const forecast = (latitude, longitude, callback) => {
     
           const url =  'https://api.darksky.net/forecast/1ae4568c4c4fb5e0533198852221a828/' + latitude + ',' + longitude 

           request ({url:url, json:true}, (error, response) => {

            
            if (error) { //low level error

                callback('Unable to connect to weather services!', undefined) 

        } else if (response.body.error) {

                callback('Unable to find location.Try another search', undefined)

        } else {
                callback(undefined, response.body.daily.data[0].summary +'It is currently', response.body.currently.temperature +' dgrees out' + response.body.currently.precipProbability + '% chance of rain')
           }
})

}


module.exports = forecast