// TODO
// add forecast for following 5 days, currently only have current day loading
// add weather icons
// create local storage so the previous searches save
// fix dates

//these will be used to define our current location.
var latitude; 
var longitude; 

//Get the user's local coordinates. 
getLocalCoordinates(); 

//Functions 

function getLocalCoordinates() {
    //Access the user's local coordinates from the navigator object. 
    navigator.geolocation.getCurrentPosition(locationRetrieved); 
}

// getting locations based on lat and lon
function locationRetrieved(position) {
    //Save latitude and longitude that are retrieved from getCurrentPosition. 
    latitude = position.coords.latitude; 
    longitude = position.coords.longitude; 

    //In the meantime, call the function that makes the reqest once the coordinates load. 
    requestCurrent(); 
}

function requestCurrent(event) {
    //This function makes a call to the weather API to retrieve locations. 

    //Set up the weather API request. 
    // var weatherAPI = 'ab855531e2a84587938c2262d8863c07'
    var localQuery = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=ab855531e2a84587938c2262d8863c07'; 

    //Make API call.
    $.ajax({
        url: localQuery,
        method: "GET"
    }).then(function(response){
        console.log(response)

        // onclick event for current location. Will append info to page only when clicked 
    $('#current').on('click',function(event){
        event.preventDefault();

        // to append current city name
    var currentWeather=document.querySelector('#current-weather')
    var currentCity=document.createElement('h4');
    currentCity.textContent=response.name;
    currentWeather.append(currentCity);

    // adding icons
    if (response.weather[0].main==='Clouds'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3bjRqzFjxkmvAWL3ff72-tH8UidJ4UxFzmQ&usqp=CAU' height=200px width:200px />");
    }
    else if(response.weather[0].main==='Haze'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3bjRqzFjxkmvAWL3ff72-tH8UidJ4UxFzmQ&usqp=CAU' height=200px width:200px />");
    }
    else if(response.weather[0].main==='Clear'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQB5rA_3-rOSGZygBtaYfgA6YdfW9pRFav4vQ&usqp=CAU' height=200px width:200px />");
    }
    else if(response.weather[0].main==='Rain'){
        $("#image-div").html("<img src='https://lh3.googleusercontent.com/proxy/osGz8h9UkfY_pgBR60hlzNuBDfubrEzmOeipoz54xKwsrl900mZEQl8pru8LAWpLxpwlWaQUCJclxaj6oQZhkjA4Tx6RfGpXEJRwNV2Ug9PcAxFkZDmX7EOfyT5_t7UyhMTxSM8WgOLOfxc5tpf_adMnsp-D2KcocJyrFAk7V4_JFWQQPLnddvUKaRw' height=200px width:200px />");
    }
    else if(response.weather[0].main==='Thunderstorm'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHUzZMG5T41Na5OYewYjGrMwy56nxcyl1vJQ&usqp=CAU' height=200px width:200px />");
    }
    else if(response.weather[0].main==='snow'){
        $("#image-div").html("<img src='https://lh3.googleusercontent.com/proxy/2ZPXMzmsBUygSnCxTujchS45Ry6QCRfhbt_xPGOKdxOpcMs_AMkMBKtG3Zblqgalyxu-vKRilAeQPkp4JOEPTYGMR0343H2DoqGr-nQU-tHhbIcmkQDzOnM-uBGDF1BqFklABBYkSgt3KTy_Mh0aW8KeNV91uVW9CTB9j41dcy0B5wr8LIXm0on7G0VmiJpqaPlk9Q' height=200px width:200px />");
    }

    // to append date
    var date=document.createElement('h5');
    date.textContent=response.dt;
    currentWeather.append(date);

    // to append current city weather
    var main=document.createElement('h5');
    main.textContent='Weather Conditions: '+response.weather[0].main;
    currentWeather.append(main);

    // to append current city temp
    var currentTemp=document.createElement('h5');
    currentTemp.textContent='Temperature: '+ Math.round((response.main.temp- 273.15) * (9 / 5) + 32)
    currentWeather.append(currentTemp);

    // to append current humidity
    var humidity=document.createElement('h5');
    humidity.textContent='Humidity: ' + response.main.humidity;
    currentWeather.append(humidity);

    // to append current windspeed
    var windSpeed=document.createElement('h5');
    windSpeed.textContent='Wind Speed: '+ response.wind.speed;
    currentWeather.append(windSpeed);
    
    // having issues finding uv index
})
    })
};

// function to search a specific city
function weatherSearch(){

    var search=$('#keyTerm').val();
        
    var searchQuery='http://api.openweathermap.org/data/2.5/weather?q='+search+'&appid=ab855531e2a84587938c2262d8863c07'

    // API call
    $.ajax({
        url: searchQuery,
        method: "GET"
    }).then(function(res){
        console.log(res)

        // to append city name
        var searchWeather=document.querySelector('#searched-city');
        searchCity=document.createElement('h4');
        searchCity.textContent=res.name;
        searchWeather.append(searchCity);

        // adding icons
    if (res.weather[0].main==='Clouds'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3bjRqzFjxkmvAWL3ff72-tH8UidJ4UxFzmQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.weather[0].main==='Haze'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3bjRqzFjxkmvAWL3ff72-tH8UidJ4UxFzmQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.weather[0].main==='Clear'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQB5rA_3-rOSGZygBtaYfgA6YdfW9pRFav4vQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.weather[0].main==='Rain'){
        $("#image-div").html("<img src='https://lh3.googleusercontent.com/proxy/osGz8h9UkfY_pgBR60hlzNuBDfubrEzmOeipoz54xKwsrl900mZEQl8pru8LAWpLxpwlWaQUCJclxaj6oQZhkjA4Tx6RfGpXEJRwNV2Ug9PcAxFkZDmX7EOfyT5_t7UyhMTxSM8WgOLOfxc5tpf_adMnsp-D2KcocJyrFAk7V4_JFWQQPLnddvUKaRw' height=200px width:200px />");
    }
    else if(res.weather[0].main==='Thunderstorm'){
        $("#image-div").html("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHUzZMG5T41Na5OYewYjGrMwy56nxcyl1vJQ&usqp=CAU' height=200px width:200px />");
    }
    else if(res.weather[0].main==='snow'){
        $("#image-div").html("<img src='https://lh3.googleusercontent.com/proxy/2ZPXMzmsBUygSnCxTujchS45Ry6QCRfhbt_xPGOKdxOpcMs_AMkMBKtG3Zblqgalyxu-vKRilAeQPkp4JOEPTYGMR0343H2DoqGr-nQU-tHhbIcmkQDzOnM-uBGDF1BqFklABBYkSgt3KTy_Mh0aW8KeNV91uVW9CTB9j41dcy0B5wr8LIXm0on7G0VmiJpqaPlk9Q' height=200px width:200px />");
    }

    // to append date
    // date doesn't come out correctly , might just use moment();
        var sdate=document.createElement('h5');
        sdate.textContent=res.dt;
        searchWeather.append(sdate);
    
        // to append current city weather
        var smain=document.createElement('h5');
        smain.textContent='Weather Conditions: '+res.weather[0].main;
        searchWeather.append(smain);
    
        // to append current city temp
        var searchTemp=document.createElement('h5');
        searchTemp.textContent='Temperature: '+Math.round((res.main.temp - 273.15) * (9/5) + 32)
        searchWeather.append(searchTemp);
    
        // to append current humidity
        var shumidity=document.createElement('h5');
        shumidity.textContent='Humidity: ' + res.main.humidity;
        searchWeather.append(shumidity);
    
        // to append current windspeed
        var swindSpeed=document.createElement('h5');
        swindSpeed.textContent='Wind Speed: '+ res.wind.speed;
        searchWeather.append(swindSpeed);
    
})  
};

// creating onclick for weathersearch function/search button
$('#searchBtn').on('click',function(event){
    event.preventDefault();
    weatherSearch();
    
    
    })