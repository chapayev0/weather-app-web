const jsonFileUrl = 'data/cities.json';

const apiKey = "e3fee7cef45997315031fdd443f662ff"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const units = "metric"; 

const citycodes = [];

const targetTimeZone = 'America/New_York';
const currentDate = new Date();

const options = {
    timeZone: targetTimeZone,
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: 'numeric',
  };

const date_time = new Intl.DateTimeFormat('en-US', options).format(currentDate);


const container = document.getElementById('card-container');


fetch(jsonFileUrl)
    .then(response => response.json())
    .then(data => {
        // Loop  the JSON data to extract and store city codes
        for (const city of data.List) {
            citycodes.push(city.CityCode);
        }

      
        const weatherPromises = citycodes.map(cityCode => {
            const requestUrl = `${apiUrl}?id=${cityCode}&appid=${apiKey}&units=${units}`;

            return fetch(requestUrl)
                .then(response => response.json())
                .then(weatherData => {
                    


                    // get relevant weather data from the API response
                    const temperature = weatherData.main.temp;
                    const maxTemp = weatherData.main.temp_max;
                    const minTemp = weatherData.main.temp_min;
                    const presher = weatherData.main.pressure;
                    const humidity = weatherData.main.humidity;

                    const wind_speed = weatherData.wind.speed;
                    const deg = weatherData.wind.deg;
                    

                    const visibality = weatherData.visibility/1000;
                    const weatherDescription = weatherData.weather[0].description;

                    
                    const sunriseTimestamp = weatherData.sys.sunrise * 1000; // Convert to milliseconds
                    const sunsetTimestamp = weatherData.sys.sunset * 1000;
                    const city = weatherData.name;
                    const county = weatherData.sys.country;
                    const sunriseDate = new Date(sunriseTimestamp);
                    const format_sunrise =sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
 
                    const sunsetDate = new Date(sunsetTimestamp);
                    const format_sunset =sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                    var ico_path = "";
                    // var bg_color = "";
                    var cid = "";

                    if (weatherDescription === "few clouds" || weatherDescription === "overcast clouds") {
                        ico_path = "img/few-cloud.png";
                        bg_color = "388EE7";
                        cid = "fc";
                    } else if (weatherDescription === "broken clouds" || weatherDescription === "scattered clouds" ) {
                        bg_color = "6249CC";
                        ico_path = "img/broke-cloud.png";
                        cid = "bc";
                    } else if (weatherDescription === "clear sky") {
                        bg_color = "40B681";
                        ico_path = "img/clear-sky.png";
                        cid = "cs";
                    } else if (weatherDescription === "light rain") {
                        bg_color = "D18B49";
                        ico_path = "img/light-rain.png";
                        cid = "lr";
                    } else if (weatherDescription === "mist") {
                        bg_color = "9C3A3A";
                        ico_path = "img/mist.png";
                        cid = "fc";
                    }else{
                        bg_color = "40B681";
                        cid = "cs";

                        ico_path = "img/clear-sky.png";
                    }



                   
// html card

const cardHTML = `
<!-- Card start -->
<div class="col-md-5">
    <div class="card custom-card ${cid}"> <!-- Use the class here -->

    <div class="row">

    <!-- Move the button container to the right -->
    <div class="col-sm-10"></div>
    <div class="col-sm-2 text-right"> <!-- Add text-right class here -->

        <!-- Style the button container to align it to the top-right corner -->
        <div style="position: absolute; top: -15px; right: 18px;">
            <button style="width: 20px; height: 20px; background: none;   background-image: url('img/close.png'); /* Replace with your image path */
            background-size: cover;
            background-repeat: no-repeat; border:none;"></button>
        </div>

    </div>
</div>

    

    <div class="row back-img">
    <div class="col-sm-6 align-middle order-1 order-md-1"> <!-- Vertically align content -->

        <div class="card-img-top">
            <img src="img/cloud_bg.png" alt="Image Alt Text">
        </div>

        <div class="text-center">
            <div class="d-flex align-items-center location" style="display:flex;  padding-left: 30px;">${city}, ${county}</div>
            <div class="d-flex align-items-center datetime" style="display:flex; padding-left: 40px;">${date_time}</div>
            <div class="d-flex align-items-center datetime" style="padding-left: 10px;">
                <div class="weather-indicate-image" style="display:contents; justify-content: center; align-items:center; text-align:center; padding-left: 10px;"><img src=${ico_path} alt=""></div>
                <div class="weather">${weatherDescription}</div>
            </div>
        </div>
    </div>

    <div class="col-sm-6 align-middle order-2 order-md-2"> <!-- Vertically align content -->

        <div class="text-center" style=" font-size: 28px; text-align: center;">
            <div class="temperature">${temperature}&#176C</div>
            <div class="man-temp" style=" font-size: 10px; text-align: center;">Temp Min: ${minTemp} &#176 C</div>
            <div class="mix-temp" style=" font-size: 10px; text-align: center;">Temp Max: ${maxTemp} &#176 C</div>
        </div>
    </div>
</div>


        <!-- New Div -->
        <div class="new-div">
            <div class="bg-dark new-div-content">
                <div class="new-div-part">
                    <div>Pressure:${presher}hPa</div>
                    <div>Humidity:${humidity}%</div>
                    <div>Visibility:${visibality}km</div>
                </div>

                <div class="vertical-line"></div>

                <div class="new-div-part">
                    <div class="nav_img"><img src="img/nav.png" alt=""></div>
                    <div>${wind_speed}m/s ${deg} Degree</div>
                </div>

                <div class="vertical-line1"></div>

                <div class="new-div-part">
                    <div>Sunrise:${format_sunrise}</div>
                    <div>Sunset:${format_sunset}</div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- card end -->
`;

container.insertAdjacentHTML("beforeend", cardHTML);

// card colors
const customCardDivs = document.querySelectorAll(`.${cid}`);
const bgColors = {
  'fc': '#388EE7', // Few Clouds
  'bc': '#6249CC', // Broken Clouds or Scattered Clouds
  'cs': '#40B681', // Clear Sky
  'lr': '#D18B49', // Light Rain
  'mist': '#9C3A3A', // Mist
};

customCardDivs.forEach(customCardDiv => {
  customCardDiv.style.backgroundColor = bgColors[cid] || '#40B681'; // Default color
});


                   
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    return `${cityCode}: Weather data not available`;
                });
        });

       
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
       
    });
