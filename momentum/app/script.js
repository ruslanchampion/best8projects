const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  focus = document.querySelector('.focus'),
  pressMe = document.querySelector('.press_me'),
  btn = document.querySelector('.btn');
const showAmPm = false;
let base = 'img/night/';
let i = 0;

function showTime() {
  let today = new Date(),
    month = today.getMonth(),
    weeks = today.getDay(),
    days = today.getDate(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  
    const amPm = hour >= 12 ? 'PM' : 'AM';

  if (showAmPm) {
      hour = hour % 12 || 12;
  }
  const listWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',  'Thursday',  'Friday',  'Saturday']
  const listMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December']

  time.textContent = `${hour}:${addZero(min)}:${addZero(sec)} ${showAmPm ? amPm : '' }`;
  date.textContent = `${listWeeks[weeks]}, ${addZero(days)} ${listMonth[month]}`;
  if (min == 0 && sec == 0) {
    getImage(); 
  }
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
 
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    greeting.textContent = 'Good Night';
    base = 'img/night/';
  } else if (hour < 12) {   
    greeting.textContent = 'Good Morning';
    base = 'img/morning/';
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon';
    base = 'img/day/';
  } else {
    greeting.textContent = 'Good Evening';
    base = 'img/evening/';
  }
}

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

function shuffle(images) {
  for (let i = images.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  return images
}
shuffle(images)
function viewBgImage(data) {
    const container = document.querySelector('.container');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
      container.style.backgroundImage = `url(${src})`;
    }; 
  }
  
function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
  } 
 
function getPressMe() {
    if (localStorage.getItem('pressMe') === null) {
        pressMe.placeholder = '[Press Your Name]';
    } else {
        pressMe.placeholder = localStorage.getItem('focus')
        pressMe.value = localStorage.getItem('pressMe');
    }
  }
  
  function setPressMe(e) {

    if (e.type === 'keypress') {
      if  (e.which == 13 || e.keyCode == 13) {
        if (pressMe.value == '' && localStorage.getItem('pressMe') !== null) {
            pressMe.placeholder = `${localStorage.getItem('pressMe')}`;
            pressMe.blur();
        }
        else if  (pressMe.value == '' && localStorage.getItem('pressMe') === null) {
            pressMe.placeholder = '[Press Your Name]';
            pressMe.blur();
           }
        else {
            localStorage.setItem('pressMe', pressMe.value);
            pressMe.blur();
        }
      }
    } 
    else {
        if (pressMe.value == '' && localStorage.getItem('pressMe') !== null) {
            pressMe.placeholder = `${localStorage.getItem('pressMe')}`;
        } 
       else if  (pressMe.value == '' && localStorage.getItem('pressMe') === null) {
         pressMe.placeholder = '[Press Your Name]';
        }
        else {
            localStorage.setItem('pressMe', pressMe.value);
      }
    }

  }

  function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.placeholder = '[Press Your Focus]';
    } else {
        focus.placeholder = localStorage.getItem('focus')
        focus.value = localStorage.getItem('focus');
    }
  }
  
  function setFocus(e) {

    if (e.type === 'keypress') {
      if  (e.which == 13 || e.keyCode == 13) {
        if (focus.value == '' && localStorage.getItem('focus') !== null) {
            focus.placeholder = `${localStorage.getItem('focus')}`;
            focus.blur();
        }
        else if  (focus.value == '' && localStorage.getItem('focus') === null) {
            focus.placeholder = '[Press Your Focus]';
            focus.blur();
           }
        else {
            localStorage.setItem('focus', focus.value);
            focus.blur();
        }
      }
    } 
    else {
        if (focus.value == '' && localStorage.getItem('focus') !== null) {
            focus.placeholder = `${localStorage.getItem('focus')}`;
        } 
       else if  (focus.value == '' && localStorage.getItem('focus') === null) {
        focus.placeholder = '[Press Your Focus]';
        }
        else {
            localStorage.setItem('focus', focus.value);
      }
    }

  }

  function clearValueOnFocus() {
    this.placeholder = ''
    this.value = ''
  }

pressMe.addEventListener('blur', setPressMe);
pressMe.addEventListener('keypress', setPressMe);
pressMe.addEventListener('focus', clearValueOnFocus);

focus.addEventListener('blur', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('focus', clearValueOnFocus);

function loader() { 
    btn.disabled = true;
    getImage()
    setTimeout(function() { btn.disabled = false }, 1000);
}

btn.addEventListener('click', loader);
document.addEventListener('DOMContentLoaded', shuffle)
showTime();
setBgGreet();
getFocus();
getPressMe();
getImage();