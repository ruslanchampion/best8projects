/* eslint-disable import/no-named-as-default-member */
import './view/style.css';
import Card from './view/Card';
import data from './module/cards';
import successAudio from './assets/audio/correct.mp3';
import errorAudio from './assets/audio/error.mp3';
import winAudio from './assets/audio/success.mp3';
import failAudio from './assets/audio/failure.mp3';
import starEmpty from './assets/images/star.svg';
import starWin from './assets/images/star-win.svg';
import {
  countAttemps,
  createCardsMap,
  createStarsLine,
  createSrcContainer,
  sortLettersTable,
  sortNumbersTable,
  countSuccessFailure,
  addStars,
  countStats,
  clearStatistic,
} from './controls';

const menuSwitcher = document.querySelector('.menu-switcher');
const categories = document.querySelector('.categories');
const categoryLinks = document.querySelectorAll('.category-link');
const sticks = document.querySelectorAll('.hamburger');
const main = document.querySelector('.main');
const words = document.createElement('div');
words.classList.add('categories');
const menu = document.querySelector('.sliding-menu');
menuSwitcher.onclick = () => {
  document.querySelector('.sliding-menu').classList.toggle('hidden');
  sticks[0].classList.toggle('to-bottom');
  sticks[1].classList.toggle('fade');
  sticks[2].classList.toggle('to-top');
};
const playButton = document.createElement('button');
playButton.classList.add('play-button');
playButton.innerText = 'START';
const switcher = document.getElementById('switcher');

function closeAsideMenuOnDocumentClick(e) {
  if (menu.getBoundingClientRect().right > 0 && e.clientX > menu.getBoundingClientRect().right) {
    menuSwitcher.click();
  }
}

let isPlaying = false;
let cardsMap = new Map();
let cardsMapSaved;

window.onload = () => {
  cardsMapSaved = new Map(JSON.parse(localStorage.getItem('map')));
  createCardsMap(cardsMap, data);

  if (cardsMapSaved && cardsMapSaved.size > 0) {
    cardsMap = cardsMapSaved;
  }

  function createWordsField(collection) {
    main.lastElementChild.remove();
    words.innerHTML = '';
    collection.forEach((card) => {
      words.append(new Card(card).createCard(isPlaying));
      main.append(words);
    });
    [...words.children].forEach((word) => {
      word.onmouseleave = () => {
        if (word.classList.contains('transparent')) {
          word.classList.remove('transparent');
          word.firstElementChild.classList.remove('flipped');
          word.firstElementChild.firstElementChild.lastElementChild.lastElementChild.classList.remove('rotate-sym-hidden');
        }
      };
      word.onclick = (e) => {
        if (word.firstElementChild.classList.contains('flipped') || e.target.classList.contains('rotate-sym')) return;
        if (isPlaying) return;
        const audioSrc = word.getAttribute('data-audio');

        const phranse = new Audio(audioSrc);
        phranse.play();
        countAttemps(word, cardsMap);
      };
    });
    createStarsLine();
  }

  function revealCards(elem) {
    switcher.classList.remove('input-disabled');
    switcher.disabled = false;

    categoryLinks.forEach((link) => {
      link.classList.remove('category-link-active');
      if (elem.innerText === link.innerText) link.classList.add('category-link-active');
    });

    if (elem.classList.contains('category-link')) {
      elem.classList.add('category-link-active');
      menuSwitcher.click();
    }

    playButton.innerText = 'START';
    playButton.classList.remove('play-button-active');

    if (isPlaying && elem.innerText !== 'Main Page') {
      main.after(playButton);
    }

    if (document.querySelector('.statistic') !== null) {
      document.querySelector('.statistic').remove();
    }
    words.classList.remove('hidden-categories');
    document.querySelectorAll('.statistic-link').forEach((link) => link.classList.remove('statistic-link-active'));

    switch (elem.innerText) {
      case 'Main Page':
        main.lastElementChild.remove();
        playButton.remove();
        categories.classList.remove('hidden-categories');
        main.append(categories);
        break;
      case 'Action (set A)':
        createWordsField(data[0]);
        break;
      case 'Action (set B)':
        createWordsField(data[1]);
        break;
      case 'Action (set C)':
        createWordsField(data[2]);
        break;
      case 'Adjective':
        createWordsField(data[3]);
        break;
      case 'Animal (set A)':
        createWordsField(data[4]);
        break;
      case 'Animal (set B)':
        createWordsField(data[5]);
        break;
      case 'Clothes':
        createWordsField(data[6]);
        break;
      case 'Emotion':
        createWordsField(data[7]);
        break;
      default:
        break;
    }
  }

  function ifTargetTagNameA(e, target) {
    if (target.tagName !== 'A') return;
    e.preventDefault();
    revealCards(target);
  }

  function ifTargetTagNameIMG(target) {
    if (target.tagName !== 'IMG' || target.className === 'word-card' || target.className === 'rotate-sym') return;
    if (target.classList.contains('card-playing-solved') || target.classList.contains('star')) return;

    revealCards(target.parentElement);
  }

  function revealCardsByClick(e) {
    const { target } = e;

    ifTargetTagNameA(e, target);
    ifTargetTagNameIMG(target);
  }

  function rotateCard(e) {
    const { target } = e;
    if (target.className !== 'rotate-sym') return;
    target.parentElement.parentElement.parentElement.parentElement.classList.add('transparent');
    target.parentElement.parentElement.parentElement.classList.add('flipped');
    target.classList.add('rotate-sym-hidden');
  }

  function checkApplicationState() {
    const linksCollection = [...categories.children];
    const mainLink = document.querySelector('.back-to-main');
    const difficultWords = document.querySelectorAll('.difficult-words')[0];
    const refreshStats = document.querySelectorAll('.difficult-words')[1];
    let activeIndex;

    if (switcher.checked) {
      isPlaying = true;

      mainLink.classList.add('back-to-main-active');

      if (difficultWords !== undefined) {
        difficultWords.classList.add('difficult-words-active');
        refreshStats.classList.add('difficult-words-active');
      }

      if (categoryLinks[0].classList.contains('category-link-active')) {
        linksCollection.forEach((category) => {
          category.classList.add('category-card-play');
        });
      } else {
        for (let i = 0; i < categoryLinks.length; i++) {
          if (categoryLinks[i].classList.contains('category-link-active')) {
            activeIndex = i - 1;
          }
        }
        linksCollection.forEach((category) => {
          category.classList.add('category-card-play');
        });
        createWordsField(data[activeIndex]);
        main.after(playButton);
      }

      menu.classList.add('sliding-menu-play');
    } else {
      isPlaying = false;

      mainLink.classList.remove('back-to-main-active');
      if (difficultWords !== undefined) {
        difficultWords.classList.remove('difficult-words-active');
        refreshStats.classList.remove('difficult-words-active');
      }

      if (document.querySelector('.src-container') !== null) {
        document.querySelector('.src-container').remove();
      }

      playButton.classList.remove('play-button-active');
      playButton.innerText = 'START';

      if (categoryLinks[0].classList.contains('category-link-active')) {
        linksCollection.forEach((category) => {
          category.classList.remove('category-card-play');
        });
      } else {
        for (let i = 0; i < categoryLinks.length; i++) {
          if (categoryLinks[i].classList.contains('category-link-active')) {
            activeIndex = i - 1;
          }
        }
        linksCollection.forEach((category) => {
          category.classList.remove('category-card-play');
        });
        createWordsField(data[activeIndex]);
        playButton.remove();
      }

      menu.classList.remove('sliding-menu-play');
    }
  }

  function check() {
    switcher.checked = true;
  }

  function uncheck() {
    switcher.checked = false;
  }

  function toggleSwitcher(e) {
    const { target } = e;
    const play = document.querySelector('.play');
    const train = document.querySelector('.train');

    if (target.tagName !== 'INPUT') return;

    if (target.checked) {
      play.innerText = '';
      play.innerText = 'PLAY';
      train.innerText = '';
      check();
    } else {
      train.innerText = '';
      train.innerText = 'TRAIN';
      play.innerText = '';
      uncheck();
    }
    checkApplicationState();
  }

  // Game variables

  let currentSrc;
  let counter = 0;
  let errors = 0;

  // Game functions

  function shuffleAudioSrc(arr) {
    let newPos;
    let temp;

    for (let i = 0; i < arr.length; i++) {
      newPos = Math.floor(Math.random() * (i + 1));
      temp = arr[i].getAttribute('data-audio');
      arr[i] = arr[newPos];
      arr[newPos] = temp;
    }

    const audioSources = arr;
    createSrcContainer(audioSources);
  }

  function sayRandomWord(arr) {
    currentSrc = arr[counter];
    const audio = new Audio(arr[counter]);
    audio.play();
  }

  function startGame(e) {
    const { target } = e;

    if (target.tagName !== 'BUTTON') return;

    if (!target.classList.contains('play-button-active')) {
      if (document.querySelector('.src-container') !== null) {
        document.querySelector('.src-container').remove();
      }

      shuffleAudioSrc([...words.children], target);

      counter = 0;
      errors = 0;
      target.innerText = '';
      target.classList.add('play-button-active');
    }

    const audioSources = [];
    const nodeList = document.querySelectorAll('.src-container > ul > li');

    nodeList.forEach((node) => audioSources.push(node.innerText));
    setTimeout(() => {
      sayRandomWord(audioSources);
    }, 200);
  }

  function createResultImage(state, err) {
    const success = document.createElement('div');
    const phrase = document.createElement('p');
    success.classList.add('success');

    if (state) {
      phrase.innerText = 'Win!';

      const audio = new Audio(winAudio);
      audio.play();
    }
    if (!state) {
      success.classList.add('failure');
      phrase.innerText = `${err} Error(s)!`;

      const audio = new Audio(failAudio);
      audio.play();
    }

    const switcherBlock = document.querySelector('.mode-switcher');

    switcherBlock.remove();
    document.querySelector('.play-button').remove();
    success.prepend(phrase);
    document.querySelector('.categories').append(success);

    setTimeout(() => {
      categoryLinks.forEach((link) => {
        link.classList.remove('category-link-active');
        if (link.innerText === 'Main Page') link.classList.add('category-link-active');
      });

      success.remove();
      document.querySelector('.header').append(switcherBlock);
      main.lastElementChild.remove();
      playButton.remove();
      main.append(categories);
    }, 1500);
  }

  function checkIfTrue(e) {
    const { target } = e;

    if (target.className !== 'word-card' || !isPlaying) return;
    if (target.classList.contains('card-playing-solved')) return;
    if (!document.querySelector('.play-button').classList.contains('play-button-active')) return;
    const targetAudio = target.parentElement.parentElement.parentElement.getAttribute('data-audio');

    const audioSources = [];
    let isWin;
    let res;
    const nodeList = document.querySelectorAll('.src-container > ul > li');

    nodeList.forEach((node) => audioSources.push(node.innerText));

    if (targetAudio === currentSrc) {
      res = true;

      const starsLine = document.querySelector('.stars-line');

      if (counter === 7 && starsLine.children.length === 7) {
        isWin = true;
        setTimeout(() => {
          createResultImage(isWin);
        }, 1000);
      }

      if (counter === 7 && starsLine.children.length !== 7) {
        isWin = false;
        setTimeout(() => {
          createResultImage(isWin, errors);
        }, 1000);
      }

      countSuccessFailure(target, res, cardsMap);
      addStars(starWin);

      target.classList.add('card-playing-solved');

      const audio = new Audio(successAudio);
      audio.play();

      counter++;

      setTimeout(() => {
        sayRandomWord(audioSources);
      }, 800);
    } else {
      res = false;

      countSuccessFailure(target, res, cardsMap);
      addStars(starEmpty);

      errors++;

      const audio = new Audio(errorAudio);
      audio.play();
    }
  }

  // Statistic functions

  function createStatisticPage(e) {
    if (e.target.innerText !== 'Statistic') return;
    menuSwitcher.click();

    const statsPage = document.createElement('div');
    const statsHeader = document.createElement('div');
    const closeStats = document.createElement('div');
    const refreshStats = document.createElement('div');
    const difficultWords = document.createElement('div');
    const stats = document.createElement('table');
    const statsLink = document.querySelector('.statistic-link');
    const tr = document.createElement('tr');

    const statsHeaders = ['Word ⇅', 'Category ⇅', 'Translation ⇅', 'Training ⇅', 'Success ⇅', 'Fails ⇅', 'Fail % ⇅'];
    const categoriesName = ['Action set(A)', 'Action set(B)', 'Action set(C)', 'Adjective', 'Animal set(A)', 'Animal set(B)', 'Clothes', 'Emotion'];

    for (let i = 0; i < statsHeaders.length; i++) {
      const th = document.createElement('th');
      th.innerText = statsHeaders[i];
      if (i < 3) {
        th.onclick = () => sortLettersTable(i);
      } else if (i >= 3) th.onclick = () => sortNumbersTable(i);

      tr.append(th);
    }

    stats.append(tr);
    stats.classList.add('stats');

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        const td7 = document.createElement('td');
        const trow = document.createElement('tr');

        const { success } = cardsMap.get(data[i][j].word);
        const { failure } = cardsMap.get(data[i][j].word);

        td1.innerText = data[i][j].word;
        td2.innerText = categoriesName[i];
        td3.innerText = data[i][j].translation;
        td4.innerText = cardsMap.get(data[i][j].word).attempts;
        td5.innerText = success;
        td6.innerText = failure;
        td7.innerText = countStats(failure, success);

        td4.classList.add('td-center'); td5.classList.add('td-center');
        td6.classList.add('td-center'); td7.classList.add('td-center');

        trow.append(td1, td2, td3, td4, td5, td6, td7);

        stats.append(trow);
      }
    }

    statsPage.classList.add('statistic');
    statsHeader.classList.add('stats-header');
    closeStats.classList.add('close-stats');
    difficultWords.classList.add('difficult-words');
    difficultWords.innerText = 'Repeat difficult words';
    refreshStats.classList.add('difficult-words');
    refreshStats.innerText = 'Reset';
    statsLink.classList.add('statistic-link-active');

    if (isPlaying) {
      difficultWords.classList.add('difficult-words-active');
      refreshStats.classList.add('difficult-words-active');
    }

    statsHeader.append(difficultWords, refreshStats, closeStats);
    statsPage.append(statsHeader, stats);

    const currentPage = document.querySelector('.categories');

    if (document.querySelector('.statistic') === null) {
      main.prepend(statsPage);
      currentPage.classList.add('hidden-categories');
    }
    closeStats.onclick = () => {
      statsLink.classList.remove('statistic-link-active');
      refreshStats.classList.remove('difficult-words-active');
      statsPage.remove();
      currentPage.classList.remove('hidden-categories');
    };
  }

  function showDifficultWords(e) {
    const { target } = e;
    if (target.innerText !== 'Repeat difficult words') return;

    if (isPlaying) switcher.click();

    switcher.classList.add('input-disabled');
    switcher.disabled = true;

    const sortedCardsMap = new Map(
      Array.from(cardsMap).sort((a, b) => b[1].failure - a[1].failure),
    );
    const difficultCollection = Array.from(sortedCardsMap.keys()).splice(0, 9);
    const closeButton = document.querySelector('.close-stats');

    const wordsData = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        data[j].forEach((obj) => (obj.word === difficultCollection[i] ? wordsData.push(obj) : obj));
      }
    }

    main.lastElementChild.remove();
    words.innerHTML = '';
    wordsData.forEach((card) => {
      if (cardsMap.get(card.word).failure !== 0) {
        words.append(new Card(card).createCard(false));
        main.append(words);

        [...words.children].forEach((word) => {
          word.onmouseleave = () => {
            if (word.classList.contains('transparent')) {
              word.classList.remove('transparent');
              word.firstElementChild.classList.remove('flipped');
              word.firstElementChild.firstElementChild.lastElementChild.lastElementChild.classList.remove('rotate-sym-hidden');
            }
          };
          word.onclick = (evt) => {
            if (word.firstElementChild.classList.contains('flipped') || evt.target.classList.contains('rotate-sym')) return;
            if (isPlaying) return;
            const audioSrc = word.getAttribute('data-audio');

            const phranse = new Audio(audioSrc);
            phranse.play();
            countAttemps(word);
          };
        });
      } else {
        main.append(words);
      }
    });

    createStarsLine();

    if (document.querySelector('.stats') !== null) {
      closeButton.click();
    }
  }

  document.addEventListener('click', createStatisticPage);

  document.addEventListener('click', (e) => {
    revealCardsByClick(e);
    rotateCard(e);
    toggleSwitcher(e);
    startGame(e);
    closeAsideMenuOnDocumentClick(e);
    checkIfTrue(e);
    showDifficultWords(e);
    clearStatistic(e);
  });

  window.addEventListener('unload', () => {
    const cardsMapSave = JSON.stringify(Array.from(cardsMap.entries()));
    localStorage.setItem('map', cardsMapSave);
  });
};
