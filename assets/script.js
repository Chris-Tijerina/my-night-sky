var subBtn = document.getElementById("sub-btn")
var cityInput = document.getElementById("city-finder")


getCityDetails = function(C) {
    let getThoseDetails = "https://api.openweathermap.org/data/2.5/weather?q=" + C + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27";
    
    fetch(getThoseDetails).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data)

                //Lat & Lon
                let lat = data.coord.lat
                let lon = data.coord.lon
                console.log(lat, lon)
                
                //Sunrise time
                let sunRiseTimeData = data.sys.sunrise
                let sunRiseFullTime = new Date(sunRiseTimeData * 1000)
                let sunRiseTimeHour = sunRiseFullTime.getHours()
                let sunRiseTimeMinute = sunRiseFullTime.getMinutes()
                console.log(sunRiseTimeHour + ":" +sunRiseTimeMinute)
                //Sunset time
                let sunSetTimeData = data.sys.sunset
                let sunSetFullTime = new Date(sunSetTimeData * 1000)
                let sunSetTimeHour = sunSetFullTime.getHours()
                let sunSetTimeMinute = sunSetFullTime.getMinutes()
                console.log(sunSetTimeHour + ":" +sunSetTimeMinute)

                //Clouds Info
                let cloudData = data.weather[0].description
                console.log(cloudData)

                //Icon
                let weatherIcon = data.weather[0].icon
                let iconUrl = "http://openweathermap.org/img/wn/"+weatherIcon+".png";
                $(".weather-icon").attr("src", iconUrl)

                //Second API request for more details
                let getMoreCityDetails = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27"
                fetch(getMoreCityDetails).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(moreData) {
                            console.log(moreData)

                            //Moon Phase
                            let moonPhase = moreData.daily[0].moon_phase

                            //daily.moon_phase Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.

                            //Moonrise time
                            let moonRiseFullData = moreData.daily[0].moonrise
                            let moonRiseFullTime = new Date(moonRiseFullData * 1000)
                            let moonRiseHour = moonRiseFullTime.getHours();
                            let moonRiseMinute = moonRiseFullTime.getMinutes()
                            console.log(moonRiseHour + ":" + moonRiseMinute)
                            //Moonset Time
                            let moonSetFullData = moreData.daily[0].moonset
                            let moonSetFullTime = new Date(moonSetFullData * 1000)
                            let moonSetHour = moonSetFullTime.getHours();
                            let moonSetMinute = moonSetFullTime.getMinutes()
                            console.log(moonSetHour + ":" + moonSetMinute)



                            

                        })
                    }
                })




                

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