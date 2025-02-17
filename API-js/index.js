


let resetButton;

let hourlyWeather = function () {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,snow_depth,weather_code,visibility,wind_speed_80m,soil_temperature_6cm")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            todayDiv.hidden = false;
            weekDiv.hidden = true;
            weekly.hidden = true;
            resetButton.hidden = false;


            let outputDiv = document.getElementById("weather-today");

            let temp = data.hourly.temperature_2m[0];
            let precip = data.hourly.precipitation[0];
            let snow = data.hourly.snow_depth[0];
            let weather = data.hourly.weather_code[0];
            let visibility = data.hourly.visibility[0];
            let wind = data.hourly.wind_speed_80m[0];
            let soil = data.hourly.soil_temperature_6cm[0];

            let outputHTML = `     <p><strong>Temperature:</strong> ${temp}°C</p>
                    <p><strong>Precipitation:</strong> ${precip} mm</p>
                    <p><strong>Snow Depth:</strong> ${snow} cm</p>
                    <p><strong>Weather Code:</strong> ${weather}</p>
                    <p><strong>Visibility:</strong> ${visibility} m</p>
                    <p><strong>Wind Speed (80m):</strong> ${wind} km/h</p>
                    <p><strong>Soil Temperature (6cm):</strong> ${soil}°C</p>
                `;

            outputDiv.innerHTML = outputHTML;


        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            document.getElementById("weather-output").innerText = "Failed to load data.";
        });
};




let weeklyWeather = function () {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,sunrise,daylight_duration,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            let outputDiv = document.getElementById("weather-week");

            //weekDiv.hidden = false;
            todayDiv.hidden = true;
            hourly.hidden = true;
            resetButton.hidden = false;
            weekSection.hidden = false;




            let dates = data.daily.time;
            console.log(dates);
            let temp_day = data.daily.temperature_2m_max;
            let sun_day = data.daily.sunrise;
            let day = data.daily.daylight_duration;
            let precip_day = data.daily.precipitation_sum;
            let rain_day = data.daily.rain_sum;
            let showers_day = data.daily.showers_sum;
            let snow_day = data.daily.snowfall_sum;
            let weather_day = data.daily.weather_code;
            let precipitation_hours = data.daily.precipitation_hours;


            console.log(outputDiv);




            let outputHTML = "<h3>Weather Forecast</h3>"

            for (let i = 0; i < dates.length; i++) {


                outputHTML += `
                   <strong>Date:</strong> ${dates[i]}
                   <strong>Temperature:</strong> ${temp_day[i]}°C
                    <strong>Sunrise:</strong> ${sun_day[i]}
                    <strong>Daylight Duration:</strong> ${day[i]} hours
                    <strong>Precipitation:</strong> ${precip_day[i]} mm
                    <strong>Rain:</strong> ${rain_day[i]} mm
                    <strong>Showers:</strong> ${showers_day[i]} mm
                    <strong>Snowfall:</strong> ${snow_day[i]} cm
                    <strong>Weather Code:</strong> ${weather_day[i]}
                    <strong>Precipitation Hours:</strong> ${precipitation_hours[i]} hours
                `;

                console.log(outputHTML);

            }
            outputDiv.innerHTML = outputHTML;



        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            document.getElementById("weather-out").innerText = "Failed to load data.";
        });
};



let reset = function () {
    console.log("Today Div: ", todayDiv.style);
    console.log("Weekly Div: ", weekDiv.style);
    todayDiv.hidden = true;
    // weekDiv.hidden = true;
    hourly.hidden = false;
    weekly.hidden = false;
    resetButton.hidden = true;
    weekSection.hidden = true;

    //if (weekDiv.hidden === true) {}


    //weekDiv.style.display = "none";

    console.log("Today Div: ", todayDiv.style);
    console.log("Weekly Div: ", weekDiv.style);

}




const todayDiv = document.getElementById("weather-today");
const weekDiv = document.getElementById("weather-week");

const weekSection = document.getElementById("week-id");
weekSection.hidden = true;

todayDiv.hidden = true;
//weekDiv.hidden = true;



let hourly = document.getElementById("hour");
hourly.addEventListener("click", hourlyWeather);

let weekly = document.getElementById("week");
weekly.addEventListener("click", weeklyWeather);

//Reset button
resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", reset);

resetButton.hidden = true;
