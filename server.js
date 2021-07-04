// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors') 
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,()=>{

 console.log("server running");
 console.log(`loalhost: ${port}`);

});

//array to store data
const WeatherData = []; 

//intialize get '/all' route and callback getData function 
app.get('/all' , getData) 
//callback function 
function getData ( req ,res) { 
  res.send(WeatherData)
 // console.log(WeatherData);
}

// intialize post '/addWeather and callback addWeratherData function
app.post('/addWeather' , addWeatherData)
// cllback function
function addWeatherData ( req , res){
    newEntry={
        date : req.body.date ,
        temperature : req.body.temp ,
        userInput : req.body.input
    }
    WeatherData.push(newEntry)
    res.send(WeatherData)
   // console.log(WeatherData) // print the data 
} 





