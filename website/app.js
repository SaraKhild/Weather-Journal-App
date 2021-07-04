/* Global Variables */
//let baseURL = 'https://api.openweathermap.org/data/2.5/forecast?id=';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2f5fb0ba24a053204a5a2c8255a45f6e&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// The eventListner 
document.getElementById('generate').addEventListener('click', performAction);

function performAction (e) {
    // take zip code and feeling from the values entered by the user
    const zipCode = document.getElementById('zip').value;
    const Userfeelings = document.getElementById('feelings').value;
    // for get the weather data 
    getWeatherData( baseURL, zipCode ,apiKey)
    // we will post data into 'postData'
    .then(function(data){
        console.log(data)
        postData("/addWeather",{date:d , temp:data.main.temp , input:Userfeelings});

        updateUI(); // this is for Dynamic UI updates 

    });
}

const getWeatherData = async(baseURL,zipcode, apikey)=>{
    
    const res = await fetch(baseURL+zipcode+apikey)
    try{
        const data = await res.json();
     //   console.log(data)
        return data;
    }catch(error){
        console.log("error",error);
    }
}

//POST 
const postData = async(url ='' , data = {})=>{

    const res = await fetch(url,{
      method: 'POST',
      credentials:'same-origin',
      headers:{
              'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data), // body data type must be match "'Content-Type"

    });

    try{
      const newData = await res.json();
     // console.log(newData);
      return newData
    } catch(e){ console.log("error",e);}
  }
  
  //Dynamically Update UI Demo
  const updateUI = async ()=>{
    
    const req = await fetch('/all');
    try{
      
        const allData = await req.json();
        document.getElementById('date').innerHTML = `The date is : ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `The tempratuer is : ${allData[0].temperature}`;
        document.getElementById('content').innerHTML = `The feelling content is : ${allData[0].userInput}`;

    }catch(error){
        console.log("error",error);
    }

  }
