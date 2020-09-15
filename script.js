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
    //This function makes a call to the Zomato API to retrieve locations. 

    //Set up the weather API request. 
    // var weatherAPI = 'ab855531e2a84587938c2262d8863c07'
    var weatherQuery = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&APPID=ab855531e2a84587938c2262d8863c07'; 

    //Add code here to see if search input was used. If so, add search keywords to the query string. 

    //Make API call.
    $.ajax({
        url: weatherQuery,
        method: "GET"
    }).then(function(response){
        console.log(response.list[0])
    })
    
};