var subBtn = document.getElementById("sub-btn")
var cityInput = document.getElementById("city-finder")
var goodieDiv = document.getElementById("all-the-goodies")

getCityDetails = function(C) {
    let getThoseDetails = "https://api.openweathermap.org/data/2.5/weather?q=" + C + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27";
    
    fetch(getThoseDetails).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
            
                //Lat & Lon
                let cityLat = data.coord.lat
                let cityLon = data.coord.lon
        
                getMoreCityDetails(cityLat, cityLon)
                // getPlanetInfo(cityLat, cityLon);
            }) 
            
        }
    })
}
//Second API request for more details
getMoreCityDetails =function(cityLat, cityLon) {
    let getMoreDetails = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27"

    fetch(getMoreDetails).then(function(response) {

        if(response.ok) {
            response.json().then(function(moreData) {
                console.log(moreData)
                goodieDiv.textContent = ""

                 //Sunrise time
                 let sunRiseTimeData = moreData.current.sunrise
                 let sunRiseFullTime = new Date(sunRiseTimeData * 1000)
                 let sunRiseTimeHour = sunRiseFullTime.getHours()
                 let sunRiseTimeMinute = sunRiseFullTime.getMinutes()
                 let sunRiseShowTime = sunRiseTimeHour + ":" +sunRiseTimeMinute
                 
                 //Sunset time
                 let sunSetTimeData = moreData.current.sunset
                 let sunSetFullTime = new Date(sunSetTimeData * 1000)
                 let sunSetTimeHour = sunSetFullTime.getHours()
                 let sunSetTimeMinute = sunSetFullTime.getMinutes()
                 let sunSetShowTime = sunSetTimeHour + ":" +sunSetTimeMinute
 
                 //Clouds Info
                 let cloudData = moreData.current.clouds
                 
                 //Icon
                 let weatherIcon = moreData.current.weather[0].icon
                 let iconUrl = "http://openweathermap.org/img/wn/"+weatherIcon+".png";
                                
                //Moon Phase
                let moonPhase = moreData.daily[0].moon_phase
                                
                //daily.moon_phase Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
                                
                //Moonrise time
                let moonRiseFullData = moreData.daily[0].moonrise
                let moonRiseFullTime = new Date(moonRiseFullData * 1000)
                let moonRiseHour = moonRiseFullTime.getHours();
                let moonRiseMinute = moonRiseFullTime.getMinutes()
                let moonRiseShowTime = moonRiseHour + ":" + moonRiseMinute
                
                //Moonset Time
                let moonSetFullData = moreData.daily[0].moonset
                let moonSetFullTime = new Date(moonSetFullData * 1000)
                let moonSetHour = moonSetFullTime.getHours();
                let moonSetMinute = moonSetFullTime.getMinutes()
                let moonSetShowTime = moonSetHour + ":" + moonSetMinute
                                
                weatherDiv = document.createElement("div")
                weatherDiv.setAttribute("style", "border: 3px solid red")
                goodieDiv.appendChild(weatherDiv)
                                              
                iconImg = document.createElement("img")
                $(iconImg).addClass("weather-icon")

                pOne = document.createElement("p")
                pTwo = document.createElement("p")
                pThree = document.createElement("p")
                pFour = document.createElement("p")
                pFive = document.createElement("p")
                pSix = document.createElement("p")
                pSeven = document.createElement("p")
                                
                pOne.textContent = "Your GPS coordanites: " + cityLat + "," + cityLon
                pTwo.textContent = "Sunrise Time : " + sunRiseShowTime
                pThree.textContent = "Sunset Time : "+ sunSetShowTime
                pFour.textContent = "Cloudiness: " + cloudData + " % "
                pFive.textContent = "Moon Phase: " + moonPhase
                pSix.textContent = "Moonrise: " + moonRiseShowTime
                pSeven.textContent = "Moonset: " + moonSetShowTime
                                
                weatherDiv.appendChild(iconImg)
                $(".weather-icon").attr("src", iconUrl)
                weatherDiv.appendChild(pOne)
                weatherDiv.appendChild(pTwo)
                weatherDiv.appendChild(pThree)
                weatherDiv.appendChild(pFour)
                weatherDiv.appendChild(pFive)     
                weatherDiv.appendChild(pSix)     
                weatherDiv.appendChild(pSeven)     
                
                getPlanetInfo(cityLat, cityLon);
            })
        }
    })
}

getPlanetInfo = function(latVar, lonVar) {
    let planetInfo = "https://visible-planets-api.herokuapp.com/v2?latitude="+latVar+"&longitude="+lonVar+"&showCoords=true"

    fetch(planetInfo).then(function(response) {
        if(response.ok) {
            response.json().then(function(planetData) {
                var planets = planetData.data
                console.log(planets)
                planetDiv = document.createElement("div")
                goodieDiv.appendChild(planetDiv)
                planetDiv.setAttribute("style", "border: 3px solid black;")
                
                for(i=0;i<planets.length; i++) {
                    let planetName = planets[i].name
                    let planetRiseHour= planets[i].rightAscension.hours
                    let planetRiseMinutes= planets[i].rightAscension.minutes
                    let planetRiseSeconds= planets[i].rightAscension.seconds

                    let planetHorizon = planets[i].aboveHorizon
                  
                    h2El = document.createElement("h2")
                    p2El = document.createElement("p")
                    
                    h2El.textContent = "Planet Name: " + planetName
                    p2El.textContent = "Above Horizon : " + planetHorizon

                    planetDiv.appendChild(h2El)
                    planetDiv.appendChild(p2El)
                }    
            })
        }
    })
}

subBtn.addEventListener("click", function(event) {
    event.preventDefault()
    var cityName = cityInput.value
    console.log(cityName)

    getCityDetails(cityName)
})

// Chris' Code

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
    getMoreCityDetails(latitude, longitude)
    findIss();
    mapMaker();
}
