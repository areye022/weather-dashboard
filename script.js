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
    currentTemp.textContent='Temperature: '+(response.main.temp - 273.15) * 1.8 + 32
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
        searchTemp.textContent='Temperature: '+(res.main.temp - 273.15) * 1.8 + 32
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