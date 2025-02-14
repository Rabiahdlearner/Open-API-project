
document.addEventListener("DOMContentLoaded", function () {
    let hourlyweather = function () {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,snow_depth,weather_code,visibility,wind_speed_80m,soil_temperature_6cm")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let outputDiv = document.getElementById("weather-output");

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

    hourlyweather();


    let dailyweather = function () {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,sunrise,daylight_duration,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let outputDiv = document.getElementById("weather-out");

                let dates = data.daily.time
                let temp_day = data.daily.temperature_2m_max[0];
                let sun_day = data.daily.sunrise[0];
                let day = data.daily.daylight_duration[0];
                let precip_day = data.daily.precipitation_sum[0];
                let rain_day = data.daily.rain_sum[0];
                let showers_day = data.daily.showers_sum[0];
                let snow_day = data.daily.snowfall_sum[0];
                let weather_day = data.daily.weather_code[0];
                let precipitation_hours = data.daily.precipitation_hours[0];




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
                }


            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                document.getElementById("weather-out").innerText = "Failed to load data.";
            });
    };

    dailyweather();

    
    function plotWeatherGraph() {
        let ctx = document.getElementById("weather-chart").getContext("2d");

        // Get selected data options
        let selectedOptions = Array.from(document.querySelectorAll(".data-option:checked"))
            .map(option => option.value);

        // Define dataset mapping
        let datasetMap =  {
            "temp": {
                    label: "Temperature (°C)",
                    data: data.daily.temperature_2m_max,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)"
                },
                "sun": {
                    label: "Daily Sunrise",
                    data: data.daily.sunrise,
                    borderColor: "rgb(187, 234, 250)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)"
                },
                "day": {
                    label: "Daylight Duration (hours)",
                    data: data.daily.daylight_duration,
                    borderColor: "rgb(16, 255, 255)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                },
                "precip": {
                    label: "Precipitation Sum",
                    data: data.daily.precipitation_sum,
                    borderColor: "rgb(214, 214, 214)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                },
                "rain": {
                    label: "Daily Rainfall Sum",
                    data: data.daily.rain_sum,
                    borderColor: "rgb(201, 157, 228)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                },
                "showers": {
                    label: "Showers Sum",
                    data: data.daily.showers_sum,
                    borderColor: "rgb(236, 255, 178)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                },
                "snow": {
                    label: "Snowfall Sum",
                    data: data.daily.snowfall_sum,
                    borderColor: "rgb(161, 192, 75)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                },
                "weather": {
                    label: "Weather Code",
                    data: data.daily.weather_code,
                    borderColor: "rgb(192, 75, 75)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                },
                "prec_hrs": {
                    label: "Precipita1tion Hours(Hours)",
                    data: data.daily.precipitation_hours,
                    borderColor: "rgb(75, 97, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                }


            };
       
            
        // Create dataset based on selected options
        let datasets = selectedOptions.map(option => datasetMap[option]);

        // Destroy previous chart instance if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Create a new chart
        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: weatherData.dates,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    

    // Event listener for the "Update Chart" button
    document.getElementById("updateChart").addEventListener("click", plotWeatherGraph);
};
    // Fetch weather data on page load

    plotWeatherGraph();
});
