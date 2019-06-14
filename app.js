let express = require('express');
let app = express();
let request = require('request');
let fs = require('fs');
let ejs = require('ejs');
let argv = require('yargs').argv;
require('dotenv').config();

let city = argv.c || 'seoul';
const apiKey = process.env.OPEN_API_KEY;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

app.set('view engine','ejs');
var port;
port=3000;
app.listen(port, ()=>{
    console.log('Server is starting in ',port);
});

app.get('/', (req, res)=> {
    request(url, (err, request, body) => {
        if(err) {
            console.log('error:'+error);            
        };

        var weather = JSON.parse(body);
        var message = `${weather.name} 의 지금 온도는 ${(weather.main.temp-32)/1.8}도입니다. `;
        console.log(message);
        console.log("이것은 바디"+body);
        console.log("이것은 웨더"+weather);

        var result ={
            weatherResult: (weather.main.temp-32)/1.8,
            weatherMessage: message
        }
        fs.readFile('index.html','utf-8', (error, data)=>{
            if(error) {
                console.log(error);
            }
            res.send(
                ejs.render(data, {
                    data:result.weatherResult,
                    message:result.weatherMessage
                })

                // `<h1>${result.weatherResult}</h1><hr><h1>${result.weatherMessage}</h1><hr>`

            )
        });
        console.log(result);
    });

})