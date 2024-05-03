import express from 'express';

const app = express();
const data = [];
const weekday = ['vasarnap', 'hetfo', 'kedd', 'szerda', 'csutortok', 'pentek', 'szombat'];

function isValidDay(day) {
  if (
    day === 'hetfo' ||
    day === 'kedd' ||
    day === 'szerda' ||
    day === 'csutortok' ||
    day === 'pentek' ||
    day === 'szombat' ||
    day === 'vasarnap'
  ) {
    return true;
  }
  return false;
}

function isValidTime(time) {
  const t = /^\d{2}:\d{2}$/;
  return t.test(time);
}

function isValidDate(date) {
  const d = /^\d{4}-\d{2}-\d{2}$/;
  return d.test(date);
}

function checkDayOfTheWeek(date, day) {
  const d = new Date(date);
  console.log(day, d.getDay(), weekday[d.getDay()]);
  return day === weekday[d.getDay()];
}

function isValidTrain(train) {
  if (train === 'gyors' || train === 'regionalis' || train === 'expressz' || train === 'szemely') {
    return true;
  }
  return false;
}

function checkError(req) {
  if (
    !req.body.honnan ||
    !req.body.hova ||
    !isValidDay(req.body.napok) ||
    !isValidTime(req.body.ora) ||
    Number.isNaN(req.body.ar) ||
    !isValidTrain(req.body.vonattipus)
  ) {
    return true;
  }
  return false;
}

app.post('/submit', express.urlencoded({ extended: true }), (req, res) => {
  const err = checkError(req);
  if (err === false) {
    req.body.id = Date.now().toString(36);
    req.body.foglalasok = 0;
    data.push(req.body);
    res.send(req.body.id);
  } else {
    res.status(400).send('Error');
  }
});

function searchTrain(train, minPrice, maxPrice, req) {
  return (
    (train.ar <= maxPrice || req.body.max_ar === '') &&
    (train.ar >= minPrice || req.body.min_ar === '') &&
    (train.honnan === req.body.kiindulopont || req.body.kiindulopont === '') &&
    (train.hova === req.body.celpont || req.body.celpont === '')
  );
}

app.post('/foglalas', express.urlencoded({ extended: true }), (req, res) => {
  let found = -1;
  const id = req.body.jaratid;
  for (let i = 0; i < data.length; i++) {
    if (id === data[i].id) {
      found = i;
    }
  }
  if (found >= 0 && isValidDate(req.body.datum) && checkDayOfTheWeek(req.body.datum, data[found].napok)) {
    data[found].foglalasok++;
    res.send('Sikeres foglalas');
  } else {
    res.status(404).send('Nem talalhato ilyen id-val rendelkezo vonat');
  }
});

app.post('/kereses', express.urlencoded({ extended: true }), (req, res) => {
  if (!Number.isNaN(req.body.max_ar) && !Number.isNaN(req.body.min_ar && req.body.kiindulopont && req.body.celpont)) {
    const searchData = [];
    const maxPrice = parseInt(req.body.max_ar, 10);
    const minPrice = parseInt(req.body.min_ar, 10);
    for (let i = 0; i < data.length; i++) {
      if (searchTrain(data[i], minPrice, maxPrice, req)) {
        searchData.push(data[i]);
      }
    }
    res.send(JSON.stringify(searchData));
  } else {
    res.status(400).send('Error');
  }
  // console.log(searchData);
});

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Elindult a szerver');
});
