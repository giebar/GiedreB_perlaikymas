const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("results");

searchButton.addEventListener("click", getForecasts);

function showAlert(message) {
    let alert = document.createElement("p");
    alert.textContent = message;
    searchResults.appendChild(alert);
}

function getForecasts(e) {
    const xhr = new XMLHttpRequest(); // sukuriamas užklausos objektas
    xhr.open("GET", `https://api.meteo.lt/v1/places/${searchInput.value}/forecasts/long-term`); // atidaroma užklausa
    xhr.onreadystatechange = function() { // callback, vykdoma įvykdžius užklausą
        if (this.status === 200) {
            let forecasts = JSON.parse(xhr.responseText);
            searchResults.innerHTML = '';
            forecasts.forecastTimestamps.forEach(function(forecast) {
                searchResults.innerHTML +=
                    `<table class="table">
                        <thead>
                            <tr class="d-flex">
                            <th class="col-3">Prognozės laikas</th>\n
                            <th class="col-3">Oro temperatūra, °C</th>\n
                            <th class="col-3">Debesuotumas, %</th>\n
                            <th class="col-3">Vėjo greitis, m/s</th>\n
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="d-flex">
                            <td class="col-3"><p>${forecast.forecastTimeUtc}</p></td>    
                            <td class="col-3"><p>${forecast.airTemperature}</p></td>                              
                            <td class="col-3"><p>${forecast.cloudCover}</p></td>
                            <td class="col-3"><p>${forecast.windSpeed}</p></td>  
                            </tr>
                        </tbody>
                    </table> `;
            });
        } else {
            searchResults.innerHTML = '';
            showAlert("Miestas nerastas.");
        }
    }

    searchButton.onclick = function() { // eventas po button paspaudimo
        xhr.send(); // siunčia užklausą
    }

    e.preventDefault();

}