fetch("https://geocoding-api.open-meteo.com/v1/search?name=Fargo&count=100&language=en&format=json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
    }
        return response.json();
    })

    .then(data => { console.log(data); })

    .catch(error => {
        console.error("Error fetching data: ", error);

        for (let i = 0; i < data.length; i++) {
            const meteo = document.getElementById("fargo");
            const geo = meteo.createElements("li");
            geo.innerText = data[i].name;
            meteo.appendChild(geo);
        }




    });