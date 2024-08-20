const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city'); 

//Default cities when the page load
let cityInput = "London";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //Change from default city to the clicked one
        cityInput = e.target.innerHTML;
        /* Function that fetches and displays all the data from the weather api
    (We will write it soon)*/ 
    fetchWeatherData();
    //Fade out the app (simple animation)
    app.style.opacity = "1";
    });
});

//Add submit to the form
form.addEventListener('submit', (e) => {
    /*if the input field (serch bar) is empty, trow an alert*/
    if(search.value.length == 0) {
        alert('Please type in a city name');
    }else{
        /* Change from default city to the one written in the input field*/ 
        cityInput = search.value;
        /* Function that fetches and display all the data from the weather API
        (we will write it soon) */
        fetchWeatherData();
        //Remove all text from the input field
        search.value = "";
        //Fade out the app (simple animation)
        app.style.opacity = "1";
    }

    //Prevents the default behaviour of the form
    e.preventDefault();
});

/* Function that returns a day of the week
(Mondya, Tuesday, Friday...) from a date (17 08 2024)
we will use his function later*/
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
};
/*Function that fetches and dispalays
the data from the weather API*/
function fetchWeatherData() {
    /* Fetch the data  and dynamically add the city name with trempelate literals*/
    /*USE YOUR OWN KEY */
    fetch(`http://api.weatherapi.com/v1/current.json?key=1670b22de4f64e5cb69114444241708&q=${cityInput}`)
    /*Take the dta (Which is JSON format and convert it to a regular JS object) */
    .then(response => response.json())
    .then (data => {
        /* You can console log the data to see what is available */
        console.log(data);

        /*Let's start my adding the temperature and weather condition to the page */
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        /* Get the date and time from the city and extract
        the day, month, year and time data into individual variables */
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11); 

        const dayName = dayOfTheWeek(d, m, y); 

        /* Reformat the date into something more
        appealing and add it to the page*/
        /* Original format: 2024-08-09 06:52 */
        /* New Format: 18:53 - Saturday 17, 08 2024 */
        dateOutput.innerHTML = `${dayName} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        // Add the name of the city into the page
        nameOutput.innerHTML = data.location.name;
        // Get the corresponding icon url for the weather and extract a part of it
        // const iconId = data.current.condition.icon.substr(                              A
        //     "//cdn.weatherapi.com/weather/64*64/".length);                              v             
        // Refrence the icon url to your own                                               O
        // Local folder path and add it to the page                                        I
        // icon.src = `./icons/${iconId.replace('.png', '.svg')}`;                         D
        icon.src = `https:${data.current.condition.icon}`; 
        

            // Add the weather datails to the page
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            // Set default time of day
            let timeOfDay = "day";
            // Get  the unique id for each weather condition
            const code = data.current.condition.code;

            // Change to night if its night time in the city
            if(!data.current.is_day) {
                timeOfDay = "night";
                }
                
                if(code == 1000){
                    /* set the background image to
                clear if rhe weather is clear*/
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                /*Change the button bg color
                depending on if its day or night */
                btn.style.background = "#e5ba92"
                if(timeOfDay = "night"){
                    btn.style.background="#181e27"
                }
            }
            /* Same thing for cloudy weather */
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282 
            ) {
                app.style.backgroundImage = `
                url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if(timeOfDay == "night") {
                        btn.style.background= "#181e27"
                    }
                    // And rain
                    } else if (
                            code == 1063 ||
                            code == 1069 ||
                            code == 1072 ||
                            code == 1150 ||
                            code == 1153 ||
                            code == 1180 ||
                            code == 1183 ||
                            code == 1186 ||
                            code == 1189 ||
                            code == 1192 ||
                            code == 1195 ||
                            code == 1204 ||
                            code == 1207 ||
                            code == 1240 ||
                            code == 1243 ||
                            code == 1246 ||
                            code == 1249 ||
                            code == 1252 
                        ){
                                app.style.backgroundImage = `
                                url(./images/${timeOfDay}/rainy.jpg)`;
                                btn.style.background = "#647d75";
                                if(timeOfDay == "night"){
                                btn.style.background = "#325c80"
                            }
                            
                            /* And finally...Snow */
                        }else {
                            app.style.backgroundImage = `
                            url(./images/${timeOfDay}/snowy.jpg)`;
                            btn.style.background = "#4d72aa";
                            if(timeOfDay == "night"){
                            btn.style.background = "#1b1b1b"
                           }
                        }
                       /*  fade in the page once all is done*/
                        app.style.opacity = "1";
                        })
                        /*If the user types a city that doesn't exist,
                        throw an alert*/
                        .catch(() => {
                            alert('city not found, please try again');
                            app.style.opacity = "1";
                        });
                    }
                        // call the function on page load

                        fetchWeatherData();

                        //fade in the page
                        app.style.opacity  = "1";
                
                    