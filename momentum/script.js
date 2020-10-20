const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  pressMe = document.querySelector('.press_me');

const showAmPm = true;

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  time.textContent = `${hour}:${addZero(min)}:${addZero(sec)} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getRandomInt(min, max) {
    let randomNumber =  Math.floor(Math.random() * Math.floor(max-min)+min);
    return randomNumber<10 ? '0' + randomNumber : randomNumber + ''
}
 
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    document.body.style.backgroundImage =
    `url('img/night/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {   
    document.body.style.backgroundImage =
      `url('img/morning/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage =
    `url('img/day/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
  } else {
    document.body.style.backgroundImage =
    `url('img/evening/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', focus.textContent);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', focus.textContent);
  }
}
//
function getPressMe() {
    if (localStorage.getItem('pressMe') === null) {
        pressMe.placeholder = '[Press Me]';
    } else {
        pressMe.value = localStorage.getItem('pressMe');
    }
  }
  
  function setPressMe(e) {

    if (e.type === 'keypress') {
      if  (e.which == 13 || e.keyCode == 13) {
        if (pressMe.value == '' && localStorage.getItem('pressMe') !== null) {
            pressMe.placeholder = `${localStorage.getItem('pressMe')}`;
            pressMe.blur();
            // localStorage.removeItem('pressMe', pressMe.value);
    
        }
        else {
            localStorage.setItem('pressMe', pressMe.value);
            pressMe.blur();
            pressMe.placeholder = pressMe.value;
        }
      }
    } 
    else {
        if (pressMe.value == '' && localStorage.getItem('pressMe') !== null) {
            pressMe.placeholder = `${localStorage.getItem('pressMe')}`;
            // localStorage.removeItem('pressMe', pressMe.value);
        } 
        else {
            pressMe.placeholder = pressMe.value;
            localStorage.setItem('pressMe', pressMe.value);
      }
    }

  }

  function clearValueOnFocus() {
    this.placeholder = ''
    this.value = ''
  }
  //
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
pressMe.addEventListener('blur', setPressMe);
pressMe.addEventListener('keypress', setPressMe);
pressMe.addEventListener('focus', clearValueOnFocus);
name.addEventListener('focus', clearValueOnFocus);
focus.addEventListener('focus', clearValueOnFocus);

showTime();
setBgGreet();
getName();
getFocus();
getPressMe();