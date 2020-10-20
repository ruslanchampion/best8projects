const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
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
    greeting.textContent = 'Good Night';
  } else if (hour < 12) {   
    document.body.style.backgroundImage =
      `url('img/morning/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Morning';
  } else if (hour < 18) {
    document.body.style.backgroundImage =
    `url('img/day/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Afternoon';
  } else {
    document.body.style.backgroundImage =
    `url('img/evening/${getRandomInt(1, 20)}.jpg')`;
    greeting.textContent = 'Good Evening';
    document.body.style.color = 'white';
  }
}

//
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
            focus.placeholder = '[Press Your Name]';
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
        focus.placeholder = '[Press Your Name]';
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
  //

pressMe.addEventListener('blur', setPressMe);
pressMe.addEventListener('keypress', setPressMe);
pressMe.addEventListener('focus', clearValueOnFocus);

focus.addEventListener('blur', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('focus', clearValueOnFocus);

showTime();
setBgGreet();
getFocus();
getPressMe();