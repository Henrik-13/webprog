let nickname;
let money;
let currency;
let currentMoney;

function showPlayerInfo() {
  document.getElementById('player-name').innerText = nickname;
  document.getElementById('player-money').innerText = currentMoney;
}

function startButton() {
  console.log('Start pressed');
  nickname = document.getElementById('name').value;
  money = parseInt(document.getElementById('money').value, 10);
  currency = document.getElementById('currencies').value;
  console.log(nickname);
  console.log(money);
  console.log(currency);
  currentMoney = money;

    document.getElementById('player').style.display = 'block';
    document.getElementById('game-data').style.display = 'none';
  showPlayerInfo();
}

window.onload = () => {
  document.getElementById('start').addEventListener('click', startButton);
};
