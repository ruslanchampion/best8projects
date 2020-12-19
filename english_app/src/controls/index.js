export function countAttemps(card, cardsMap) {
  const cardText = card.lastElementChild.firstElementChild.lastElementChild.innerText;
  const obj = {};

  Object.assign(obj, cardsMap.get(cardText));

  obj.attempts++;
  cardsMap.set(cardText, obj);
}

export function createCardsMap(cardsMap, data) {
  const statsObject = {
    attempts: 0,
    success: 0,
    failure: 0,
  };
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      cardsMap.set(data[i][j].word, statsObject);
    }
  }
}

export function createStarsLine() {
  const starsLine = document.createElement('div');
  starsLine.classList.add('stars-line');
  document.querySelector('.categories').prepend(starsLine);
}

export function createSrcContainer(arr) {
  const srcContainer = document.createElement('div');
  const srcUl = document.createElement('ul');

  for (let i = 0; i < arr.length; i++) {
    const src = document.createElement('li');
    src.innerText = arr[i];
    if (src.innerText !== '') {
      srcUl.append(src);
    }
  }

  srcContainer.append(srcUl);
  srcContainer.classList.add('src-container');

  document.querySelector('.main').after(srcContainer);
}

export function countSuccessFailure(card, res, cardsMap) {
  const catPathFrom = 18;
  let key = card.getAttribute('src');
  const carPathTo = key.length - 4;
  key = key.slice(catPathFrom, carPathTo);
  const obj = {};
  Object.assign(obj, cardsMap.get(key));
  if (res) {
    obj.success++;
  } else {
    obj.failure++;
  }
  cardsMap.set(key, obj);
}

export function addStars(src) {
  const line = document.querySelector('.stars-line');
  const star = document.createElement('img');

  star.setAttribute('src', src);
  star.classList.add('star');

  line.append(star);

  if (line.lastElementChild.getBoundingClientRect().left < document.querySelector('.categories').getBoundingClientRect().left) {
    line.prepend(star);
  }
}

export function countStats(fail, win) {
  let percent = 0;
  if (fail > 0 || win > 0) {
    percent = (fail / (win + fail)) * 100;
  }
  return percent.toFixed(2);
}

export function clearStatistic(e) {
  const { target } = e;
  if (target.innerText !== 'Reset') return;

  const td = document.querySelectorAll('.td-center');
  td.forEach((tdata) => { tdata.innerText = '0'; });
  createCardsMap();

  localStorage.removeItem('map');
}

export function sortLettersTable(n) {
  let rows;
  let switching;
  let i;
  let x;
  let y;
  let shouldSwitch;
  let dir;
  let switchcount = 0;

  const table = document.querySelector('.stats');
  switching = true;
  dir = 'asc';

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else if (switchcount === 0 && dir === 'asc') {
      dir = 'desc';
      switching = true;
    }
  }
}

export function sortNumbersTable(n) {
  let rows;
  let switching;
  let i;
  let x;
  let y;
  let shouldSwitch;
  let dir;
  let switchcount = 0;

  const table = document.querySelector('.stats');
  switching = true;
  dir = 'asc';

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      if (dir === 'asc') {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else if (switchcount === 0 && dir === 'asc') {
      dir = 'desc';
      switching = true;
    }
  }
}
