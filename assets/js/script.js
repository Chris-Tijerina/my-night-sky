timeStampArray = JSON.parse(localStorage.getItem("My Night Sky"))

var subBtn = document.getElementById("sub-btn")
var cityInput = document.getElementById("city-finder")
var weatherInfoDiv = document.getElementById("weatherInfo")
var sunMoonDiv = document.getElementById("sunMoon")
var moonDiv = document.getElementById("moonLocation")
// lat-lon variables
var latitude;
var longitude;
var issLat;
var issLon;

function getCityDetails(CitySearch) {
    let getThoseDetails = "https://api.openweathermap.org/data/2.5/weather?q=" + CitySearch + "&units=imperial&appid=6803214db5809206d0fa99b36f47790d";

    fetch(getThoseDetails).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //Lat & Lon
                latitude = data.coord.lat
                longitude = data.coord.lon

                getMoreCityDetails(latitude, longitude)
                findIss();

            })

        }
    })
}

//Second API request for more details
function getMoreCityDetails(Lat, Lon) {
    let getMoreDetails = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Lat + "&lon=" + Lon + "&units=imperial&appid=6803214db5809206d0fa99b36f47790d"

    fetch(getMoreDetails).then(function (response) {

        if (response.ok) {
            response.json().then(function (moreData) {
                console.log(moreData)
                weatherInfoDiv.textContent = ""

                //Time stamp
                let timeStamp = moreData.current.dt
                let theDate = new Date(timeStamp * 1000)
                let timeStampHour = theDate.getHours()
                let timeStampMinutes = theDate.getMinutes()
                console.log(timeStampHour, timeStampMinutes)


                //Sunrise time
                let sunRiseTimeData = moreData.current.sunrise
                let sunRiseFullTime = new Date(sunRiseTimeData * 1000)
                let sunRiseTimeHour = sunRiseFullTime.getHours()
                let sunRiseTimeMinute = sunRiseFullTime.getMinutes()
                let sunRiseShowTime = sunRiseTimeHour + ":" + sunRiseTimeMinute

                //Sunset time
                let sunSetTimeData = moreData.current.sunset
                let sunSetFullTime = new Date(sunSetTimeData * 1000)
                let sunSetTimeHour = sunSetFullTime.getHours()
                let sunSetTimeMinute = sunSetFullTime.getMinutes()
                let sunSetShowTime = sunSetTimeHour + ":" + sunSetTimeMinute

                //Clouds Info
                let cloudData = moreData.current.clouds

                //Icon
                let weatherIcon = moreData.current.weather[0].icon
                let iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

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
                weatherInfoDiv.appendChild(weatherDiv)

                iconImg = document.createElement("img")
                $(iconImg).addClass("weather-icon")

                pOne = document.createElement("p")
                pTwo = document.createElement("p")
                pThree = document.createElement("p")
                pFour = document.createElement("p")
                pFive = document.createElement("p")
                pSix = document.createElement("p")
                pSeven = document.createElement("p")

                pOne.textContent = "Your GPS coordanites: " + Lat + "," + Lon
                pTwo.textContent = "Sunrise Time : " + sunRiseShowTime
                pThree.textContent = "Sunset Time : " + sunSetShowTime
                pFour.textContent = "Cloudiness: " + cloudData + " % "
                pSix.textContent = "Moonrise: " + moonRiseShowTime
                pSeven.textContent = "Moonset: " + moonSetShowTime

                weatherDiv.appendChild(iconImg)
                $(".weather-icon").attr("src", iconUrl)
                weatherDiv.appendChild(pOne)
                weatherDiv.appendChild(pTwo)
                weatherDiv.appendChild(pThree)
                weatherDiv.appendChild(pFour)
                weatherDiv.appendChild(pSix)
                weatherDiv.appendChild(pSeven)

                timeStampInfo = {
                    searchTime: timeStampHour + ":" + timeStampMinutes,
                    location: Lat + ", " + Lon
                }
                console.log(timeStampInfo)


                if (timeStampArray == null) {
                    timeStampArray = []
                    timeStampArray.push(timeStampInfo)
                    localStorage.setItem("My Night Sky", JSON.stringify(timeStampArray))
                }
                else {
                    timeStampArray.push(timeStampInfo)
                    localStorage.setItem("My Night Sky", JSON.stringify(timeStampArray))
                }
                
                moonDiv.textContent = "";
                var moonIcon = document.createElement("img");
                moonIcon.className = 'moonIcon';
                if(moonPhase > 0 && moonPhase < .25) {
                    pFive.textContent = "Moon Phase: " + "Waxing Crescent";
                    moonIcon.setAttribute("src", "./assets/images/waxingcrescenticon.png"); 
                    moonIcon.setAttribute("alt", "Waxing Crescent Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonIcon);
                }

                else if(moonPhase == .25) {
                    pFive.textContent = "Moon Phase: " + "First Quarter Moon";
                    moonIcon.setAttribute("src", "./assets/images/firstquartericon.png"); 
                    moonIcon.setAttribute("alt", "First Quarter Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonicon);
                }

                else if (moonPhase > .25 && moonPhase < .50) {
                    pFive.textContent = "Moon Phase: " + "Waxing Gibbous"
                    moonIcon.setAttribute("src", "./assets/images/waxinggibousicon.png"); 
                    moonIcon.setAttribute("alt", "Waxing Gibbous Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonIcon);
                }

                else if (moonPhase == .50) {
                    pFive.textContent = "Moon Phase: " + "First Full Moon"
                    moonIcon.setAttribute("src", "./assets/images/fullmoonicon.png"); 
                    moonIcon.setAttribute("alt", "First Full Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonIcon);
                }

                else if(moonPhase > .50 && moonPhase < .75) {
                    pFive.textContent = "Moon Phase: " + "Waning Gibbous";
                    moonIcon.setAttribute("src", "./assets/images/waninggibousicon.png"); 
                    moonIcon.setAttribute("alt", "Waning Gibbous Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonIcon);
                }

                else if(moonPhase == .75){
                    pFive.textContent = "Moon Phase: " + "Last Quarter Moon";
                    moonIcon.setAttribute("src", "./assets/images/lastquartericon.png"); 
                    moonIcon.setAttribute("alt", "Last Quarter moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonIcon);
                }

                else if( moonPhase > .75 && moonPhase < 1 ) {
                    pFive.textContent = "Moon Phase: " + "Waning Crescent";
                    moonIcon.setAttribute("src", "./assets/images/waningcrescenticon.png"); 
                    moonIcon.setAttribute("alt", "Waning Crescent Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive)
                    moonDiv.appendChild(moonIcon);
                }

                else if( moonPhase == 0 || moonPhase == 1){
                    pFive.textContent = "Moon Phase: " + "New Moon";
                    moonIcon.setAttribute("src", "./assets/images/newmoonicon.png"); 
                    moonIcon.setAttribute("alt", "New Moon");
                    console.log(pFive)
                    moonDiv.appendChild(pFive);
                    moonDiv.appendChild(moonIcon);
                }

                getPlanetInfo(Lat, Lon);
            })
        }
    })
}

function getPlanetInfo(latVar, lonVar) {
    let planetInfo = "https://visible-planets-api.herokuapp.com/v2?latitude=" + latVar + "&longitude=" + lonVar + "&showCoords=true"

    fetch(planetInfo).then(function (response) {
        if (response.ok) {
            response.json().then(function (planetData) {
                sunMoonDiv.textContent = ""

                var planets = planetData.data
                console.log(planets)
                planetDiv = document.createElement("div")
                sunMoonDiv.appendChild(planetDiv)
                planetDiv.setAttribute("style", "border: 3px solid black;")

                for (i = 0; i < planets.length; i++) {
                    let planetName = planets[i].name
                    let planetRiseHour = planets[i].rightAscension.hours
                    let planetRiseMinutes = planets[i].rightAscension.minutes
                    let planetRiseSeconds = planets[i].rightAscension.seconds

                    let planetHorizon = planets[i].aboveHorizon

                    if (planetHorizon == true) {
                        pHorizon = planetName + " Is currently above the Horizon."
                    }

                    h2El = document.createElement("h2")
                    p2El = document.createElement("p")

                    h2El.textContent = "Planet Name: " + planetName
                    p2El.textContent = pHorizon

                    planetDiv.appendChild(h2El)
                    planetDiv.appendChild(p2El)
                }
            })
        }
    })
}

subBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var cityName = cityInput.value
    console.log(cityName)

    getCityDetails(cityName)
})

function findIss() {
    var issApi = "http://api.open-notify.org/iss-now.json";
    // make the request 
    fetch(issApi).then(function (response) {
        if (response.ok) {
            //log the data
            response.json().then(function (data) {
                issLat = data.iss_position.latitude;
                issLon = data.iss_position.longitude;
                console.log(data)
                console.log(issLat)
                console.log(issLon)
            })
                .then(function (data) {
                    mapMaker()
                });
        }
    });
};

function mapMaker() {
    //Clear Map

    //create map

    var map = L.map('map').setView([latitude, longitude], 13);

    // add layers to the map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 1,
        maxZoom: 1,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hyaXMtdGlqZXJpbmEiLCJhIjoiY2t3eTMzeDQyMGg4djJ1cXZhbTBybnh0MCJ9.8p4s1rao5HyWsSbPOO8slg'
    }).addTo(map);


    // put marker on home position
    L.marker([latitude, longitude]).addTo(map);

    // put iss marker
    L.marker([issLat, issLon]).addTo(map);

}

// On click of button, run the geo location function
$(".geoBtn").on("click", function () {
    geoCheck();
})

// check whether or not geolocation is available for the user
function geoCheck() {
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
function geoLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

// get coordinates
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getMoreCityDetails(latitude, longitude)
    findIss();
}
