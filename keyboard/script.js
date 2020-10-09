const body = document.body

const createElement = function (tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Создание скилета html
const screen = createElement('input', 'screen');
body.appendChild(screen);
const openKeyboard = createElement('button', 'button', 'Keyboards');
body.appendChild(openKeyboard);
const keyboard = createElement('div', 'keyboard');
body.appendChild(keyboard);
const poolOfKeys = createElement('div', 'pool');
keyboard.appendChild(poolOfKeys)
const divEl = createElement('div', 'el', '~');
poolOfKeys.appendChild(divEl);
const pool = body.querySelector('.pool');
const element = poolOfKeys.querySelector('div');

//Создание кнопок
const createbutton = function (nameBut) {
  let clonedElement = element.cloneNode(true);
  clonedElement.textContent = nameBut;
  pool.appendChild(clonedElement);
}
//Кнопки

// document.addEventListener("keydown", function(event) {
//    console.log(event.code)
//         keyboards.push(event.key)
//         console.log(keyboards)
// })
 const keyboards =  ["1","2","3","4","5","6","7","8","9","0","-","=","Backspace","Tab","q","w","e","r","t","y","u","i","o",
    "p","[","]","\\","CapsLock", "a","s","d","f","g","h","j","k","l",";","'","enter","shiftl","z","x","c","v","b","n","m",
    ",",".","/","shiftr","Control","OS","Alt","space","Alt","ContextMenu","Controlr","ArrowLeft","ArrowDown","ArrowUp","ArrowRight"]
 
  for (let i = 0; i<keyboards.length; i++) {
    let clonedElement = element.cloneNode(true);
    if (keyboards[i].length<2) {
      clonedElement.textContent = keyboards[i];
        } else {
          clonedElement.textContent = ''
        }
      clonedElement.setAttribute("data-", `${keyboards[i]}`); 
      clonedElement.classList.add(`${keyboards[i]}`);
      pool.appendChild(clonedElement);
      }
// Функциональные кнопки
const contextMenu = document.querySelector('.ContextMenu')
const backspace = document.querySelector('.Backspace')
const enter = document.querySelector('.enter')
const arrowLeft = document.querySelector('.ArrowLeft');
const arrowDown = document.querySelector('.ArrowDown')
const arrowUp = document.querySelector('.ArrowUp')
const arrowRight = document.querySelector('.ArrowRight')
const tab = document.querySelector('.Tab')
const capsLock = document.querySelector('.CapsLock')
const shiftr = document.querySelector('.shiftr')
const shiftl = document.querySelector('.shiftl')
const control = document.querySelector('.Control')
const os = document.querySelector('.OS')
const controlr = document.querySelector('.Controlr')



window.addEventListener('keydown', function(event){
  const screen = document.querySelector('.screen')
  console.log(event.key);
  if (event.key == 'Backspace') {
    
    screen.textContent = screen.textContent.slice(0, -1);
  } 
  else if (event.key == 'CapsLock') {
    screen.setAttribute("type", "text") 
     if (screen.hasAttribute('onkeyup')){
    screen.removeAttribute("oninput", "oninput()")   
  } else {
    screen.setAttribute("oninput", "oninput()")
  }
    }
  else {
  screen.textContent +=event.key
    }
  
});
backspace.addEventListener('click', function(){
  screen.value = screen.value.slice(0, -1);
});


/// УБрать клаву
openKeyboard.addEventListener('click', function(){
  pool.classList.toggle('poolnone')
});
const keysPool =  document.querySelectorAll('.el')
const screeb =  document.querySelector('.screen')

for (let i = 0; i<keysPool.length; i++) {
  keysPool[i].addEventListener('click', function(){
    if (keysPool[i].classList.contains('capitalize')) {
    screen.value += keysPool[i].textContent.toUpperCase()
    } else {
    screen.value += keysPool[i].textContent
    }})
  }
  const oninput = function () {
  for (let i = 0; i<keysPool.length; i++) {
    keysPool[i].addEventListener('click', function(){
      if (keysPool[i].classList.contains('capitalize')) {
      screen.value += keysPool[i].textContent.toUpperCase()
      } else {
      screen.value += keysPool[i].textContent
      }})
    }}
    
  // capsLock.addEventListener('click', function(){
  //   screen.setAttribute("onkeyup", "this.value = this.value.toUpperCase();")
  // });

  for (let key of keysPool) {
    capsLock.addEventListener('click', function(){
      key.classList.toggle('capitalize')
    });
  }
  