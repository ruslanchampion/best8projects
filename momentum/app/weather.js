const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const forecast = document.querySelector('.forecast');
const humidity = document.querySelector('.humidity');
const speed = document.querySelector('.speed');
const pressure = document.querySelector('.pressure');
const error = document.querySelector('.error'); 


async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value || 'Minsk'}&appid=4468abd9423421e94dcc96dbe813f5ac&units=metric`;
  const response  = await fetch(url);
  const data = await response.json()

  if (response.ok) {
    error.textContent = ''
  } else {
    error.textContent = '!!!WORNG CITY!!!'
    localStorage.setItem('city', 'Minsk');
    city.placeholder = localStorage.getItem('city')
  }


  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `Temperature: ${data.main.temp.toFixed(0)}°C`;
  forecast.textContent = `${data.weather[0].description.toUpperCase()}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`
  speed.textContent = `Wind Speed: ${data.wind.speed} m/s `
  pressure.textContent = `Pressure: ${data.main.pressure} ISA`                       
 
}

function getCity() {
  if (localStorage.getItem('city') === null) {
    city.placeholder = '[Your City]';
  } else {
    city.placeholder = localStorage.getItem('city')
      city.value = localStorage.getItem('city');
  }
}

function setCity(e) {

  if (e.type === 'keypress') {
    if  (e.which == 13 || e.keyCode == 13) {
      if (city.value == '' && localStorage.getItem('city') !== null) {
        city.placeholder = `${localStorage.getItem('city')}`;
        getWeather();
        city.blur();
      }
      else if  (city.value == '' && localStorage.getItem('city') === null) {
        city.placeholder = '[Your City]';
        city.blur();
         }
      else {
          localStorage.setItem('city', city.value);
          getWeather();
          city.blur();
      }
    }
  } 
  else {
      if (city.value == '' && localStorage.getItem('city') !== null) {
        city.placeholder = `${localStorage.getItem('city')}`;
        getWeather();
      } 
     else if  (city.value == '' && localStorage.getItem('city') === null) {
      city.placeholder = '[Your City]';
      }
      else {
          localStorage.setItem('city', city.value);
          getWeather();
    }
  }

}

function clearValueOnFocus() {
  this.placeholder = ''
  this.value = ''
}

city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('focus', clearValueOnFocus);

document.addEventListener('DOMContentLoaded', getWeather);

getCity()