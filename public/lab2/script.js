// Bálint Henrik
// 521/1
// bhim2208

let nickname;
let money;
let currency;
let currentMoney;

function getWin() {
  switch (currency) {
    case 'ron':
      return 50;
    case 'usd':
      return 12;
    case 'eur':
      return 11;
    case 'chf':
      return 9;
    case 'huf':
      return 1000;
    case 'gbp':
      return 10;
    default:
      return 0;
  }
}

function getLoss() {
  switch (currency) {
    case 'ron':
      return 100;
    case 'usd':
      return 24;
    case 'eur':
      return 22;
    case 'chf':
      return 18;
    case 'huf':
      return 2000;
    case 'gbp':
      return 20;
    default:
      return 0;
  }
}

function endButton() {
  alert(`Koszonom a jatekot!\nMegmaradt penzosszeg:${currentMoney}${currency}`);
  document.getElementById('player').style.display = 'none';
  document.getElementById('pictures').style.display = 'none';
  document.getElementById('buttons').style.display = 'none';
  document.getElementById('end').style.display = 'none';
  document.getElementById('game-data').style.display = 'block';
}

function revealImage(event) {
  const red = Math.floor(Math.random() * 3) + 1;
  const btn = event.target;
  const num = parseInt(btn.innerText, 10);
  let img;
  const blackImg = document.getElementsByClassName('black-picture')[num - 1];
  if (num === red) {
    img = document.createElement('img');
    img.src = 'red.png';
    document.getElementById('pictures').replaceChild(img, blackImg);
    currentMoney += getWin();
    document.getElementById('player-money').innerText = currentMoney;
    setTimeout(() => {
      alert(`Nyertel! +${getWin()}${currency}`);
      document.getElementById('pictures').replaceChild(blackImg, img);
    }, 1000);
  } else {
    img = document.createElement('img');
    img.src = 'blue.png';
    document.getElementById('pictures').replaceChild(img, blackImg);
    currentMoney -= getLoss();
    document.getElementById('player-money').innerText = currentMoney;
    setTimeout(() => {
      alert(`Vesztettel! -${getLoss()}${currency}`);
      document.getElementById('pictures').replaceChild(blackImg, img);
      if (currentMoney < getLoss()) {
        endButton();
      }
    }, 1000);
  }
}

function showPlayerInfo() {
  document.getElementById('player-name').innerText = nickname;
  document.getElementById('player-money').innerText = currentMoney;
}

function startButton(event) {
  event.preventDefault();
  nickname = document.getElementById('name').value;
  money = parseInt(document.getElementById('money').value, 10);
  currency = document.getElementById('currencies').value;
  currentMoney = money;

  document.getElementById('player').style.display = 'block';
  document.getElementById('pictures').style.display = 'block';
  document.getElementById('buttons').style.display = 'block';
  document.getElementById('end').style.display = 'block';
  document.getElementById('game-data').style.display = 'none';
  showPlayerInfo();
}

window.onload = () => {
  document.getElementById('start').addEventListener('click', startButton);
  Array.from(document.getElementsByClassName('guess-buttons')).forEach((elem) => {
    elem.addEventListener('click', revealImage);
  });
  document.getElementById('end').addEventListener('click', endButton);
};
