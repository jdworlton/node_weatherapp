const yargs = require('yargs')
const request = require('postman-request')


let findCords = '84070'

yargs.version('1.1.0')

yargs.command({
    command: 'find',
    describe: 'lookup place in the world',
    builder: {
        place: {
            describe: 'place in the world',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        findCords = argv.place
        
        
    }
})

yargs.parse()

let placename = ''


const mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + findCords + '.json?access_token=pk.eyJ1Ijoiandvcmx0b24iLCJhIjoiY2w5bmJuZnVlMDQ5YTNvbjAzNHoybTh3NiJ9.bIX18qsYcZlLtf2V4e-yqA&limit=1'
request({url: mapbox, json:true}, (error, response) => {
        if (error){
            console.log('network error! critical!') 
        } else if (response.body.features.length === 0) {
            console.log('bad coordinates! no location found!')
        } else {
            let long_lat = response.body.features[0].center
            placeName = response.body.features[0].place_name
            const getWeather ='http://api.weatherstack.com/current?access_key=8c080e69283cfe45e52943ca11cbba17&query=' +long_lat[1] +',' +long_lat[0] + '&units=f' 
    
            request({url: getWeather, json:true}, (error, response) => {
                if (error) {
                    console.log('bust')
                } else if (response.body.error){
                    console.log('critical! server error!')
                } else {
                    console.log(`The temp in ${placeName} is ${response.body.current.temperature}`)  
                    console.log(`${response.body.current.weather_descriptions}`)  
                }
            })
        }    
})