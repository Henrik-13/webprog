let nickname;
let money;
let currency;
let currentMoney;

function getWin() {

}

function getLoss() {
    
}

function revealImage(event) {
  const red = Math.floor(Math.random() * 3) + 1;
  const btn = event.target;
  const num = parseInt(btn.innerText, 10);
  if (num === red) {
    const redImg = document.createElement('img');
    redImg.src = 'red.png';
    const blackImg = document.getElementsByClassName('black-picture')[num - 1];
    document.getElementById('pictures').replaceChild(redImg, blackImg);
  }
}

function showPlayerInfo() {
  document.getElementById('player-name').innerText = nickname;
  document.getElementById('player-money').innerText = currentMoney;
}

function startButton() {
  console.log('Start pressed');
  nickname = document.getElementById('name').value;
  money = parseInt(document.getElementById('money').value, 10);
  currency = document.getElementById('currencies').value;
  //   console.log(nickname);
  //   console.log(money);
  //   console.log(currency);
  currentMoney = money;

  document.getElementById('player').style.display = 'block';
  document.getElementById('pictures').style.display = 'block';
  document.getElementById('buttons').style.display = 'block';
  document.getElementById('game-data').style.display = 'none';
  showPlayerInfo();
}

window.onload = () => {
  document.getElementById('start').addEventListener('click', startButton);
  Array.from(document.getElementsByClassName('guess-buttons')).forEach((elem) => {
    elem.addEventListener('click', revealImage);
  });
};
