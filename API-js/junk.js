table = document.createElement("table");




outputHTML += `
                   <thead> <tr><strong>Date:</strong> ${dates[i]}
                   </tr>
                   </thead>
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
