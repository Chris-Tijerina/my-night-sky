// lat-lon variables
var latitude
var longitude

var findIss = function () {
    var issApi = "http://api.open-notify.org/iss-now.json";
    // make the request 
    fetch(issApi).then(function (response) {
        if (response.ok) {
            //log the data
            response.json().then(function (data) {
                var issLat = data.iss_position.latitude;
                var issLon = data.iss_position.longitude; 
                console.log (data)
                console.log (issLat)
                console.log (issLon)
            });
        }
    });
};

var mapMaker = function () {
    //create map
    var map = L.map('map').setView([latitude, longitude], 13);

    // add layers to the map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hyaXMtdGlqZXJpbmEiLCJhIjoiY2t3eTMzeDQyMGg4djJ1cXZhbTBybnh0MCJ9.8p4s1rao5HyWsSbPOO8slg'
    }).addTo(map);

    // put marker on home position
    var markerHome = L.marker([latitude, longitude]).addTo(map);
    // put iss marker
}

// On click of button, run the geo location function
$(".geoBtn").on("click", function () {
    geoCheck();
})

// check whether or not geolocation is available for the user
var geoCheck = function () {
    if ('geolocation' in navigator) {
        console.log("location is available")
        // if geolocation is available, get current position from navigator
        geoLocation()
    } else {
        // if geolocation is not available, 
        console.log("geolocation is not available, please enter a city into the search.")
    }
}

// get current position from navigator
var geoLocation = function () {
    navigator.geolocation.getCurrentPosition(showPosition);
}

// get coordinates
var showPosition = function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // $(".lat-lon").text("latitude" + latitude + "......\n" + "longitude" + longitude);
    findIss();
    mapMaker();
}







