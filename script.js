//Define current coordinates (which will be loaded from navigator object).
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

    //Add a button to the page with an event listener to pass in a request to the API using local coordinates.
    //HERE

    //In the meantime, call the function that makes the reqest once the coordinates load. 
    requestCurrent(); 
}

function requestCurrent(event) {
    //This function makes a call to the weather API to retrieve locations. 

    //Set up the weather API request. 
    // var weatherAPI = 'ab855531e2a84587938c2262d8863c07'
    var localQuery = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&APPID=ab855531e2a84587938c2262d8863c07'; 

    //Make API call.
    $.ajax({
        url: localQuery,
        method: "GET"
    }).then(function(response){
        console.log(response)

        // onclick event for current location. Will append info only when clicked 
    $('#current').on('click',function(event){
        event.preventDefault();

    for (results=0;results<5;results++){

        // to append current city name
    var currentWeather=document.querySelector('#current-weather')
    var currentCity=document.createElement('h3');
    currentCity.textContent=response.city.name;
    currentWeather.append(currentCity);

    // to append date
    var date=document.createElement('h3');
    date.textContent=response.list[results].dt_txt;
    currentWeather.append(date);

    // to append current city weather
    var main=document.createElement('h3');

    // when i put results in here it shows as undefined, why?
    main.textContent=response.list[0].weather[0].description;
    currentWeather.append(main);

    // to append current city temp
    var currentTemp=document.createElement('h3');
    currentTemp.textContent=(response.list[results].main.temp - 273.15) * 1.8 + 32
    currentWeather.append(currentTemp);

    // to append current humidity
    var humidity=document.createElement('h3');
    humidity.textContent='Humidity ' + response.list[results].main.humidity;
    currentWeather.append(humidity);

    // to append current windspeed
    var windSpeed=document.createElement('h3');
    windSpeed.textContent='Wind Speed '+ response.list[results].wind.speed;
    currentWeather.append(windSpeed);
    }
    // having issues finding uv index
})
    })
};

// when we click on current location button, the local city name will append to the #current weather div
$('#current').on('click',function(event){
    event.preventDefault();
        
})


// function to search a specific city
function weatherSearch(){

    var search=$('#keyTerm').val();
    
    var searchQuery='http://api.openweathermap.org/data/2.5/forecast?q='+search+'&appid=ab855531e2a84587938c2262d8863c07'

    $.ajax({
        url: searchQuery,
        method: "GET"
    }).then(function(res){
        console.log(res)
})
    console.log(search);
    
}
// creating onclick for weathersearch function/search button
$('#searchBtn').on('click',function(event){
    event.preventDefault();
    weatherSearch();
    
    
    })
