import express from 'express';

const app = express();
const data = [];
// let idCount = 0;

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

function isValidTrain(train) {
  if (train === 'gyors' || train === 'regionalis' || train === 'expressz' || train === 'szemely') {
    return true;
  }
  return false;
}

app.post('/submit', express.urlencoded({ extended: true }), (req, res) => {
  let err = false;
  if (
    !req.body.honnan ||
    !req.body.hova ||
    !isValidDay(req.body.napok) ||
    !isValidTime(req.body.ora) ||
    Number.isNaN(req.body.ar) ||
    !isValidTrain(req.body.vonattipus)
  ) {
    err = true;
  }
  if (err === false) {
    req.body.id = Date.now().toString(36);
    //  (idCount++).toString();
    data.push(req.body);
    res.send(req.body.id);
  } else {
    res.status(404).send('Error');
  }
});

app.post('/foglalas', express.urlencoded({ extended: true }), (req, res) => {
  let found = false;
  const id = req.body.jaratid;
  for (let i = 0; i < data.length; i++) {
    if (id === data[i].id) {
      found = true;
    }
  }
  if (found) {
    res.send('Sikeres foglalas');
  } else {
    res.send('Nem talalhato ilyen id-val rendelkezo vonat');
  }
});

app.post('/kereses', express.urlencoded({ extended: true }), (req, res) => {
  if (!Number.isNaN(req.body.max_ar) && !Number.isNaN(req.body.min_ar)) {
    const searchData = [];
    const maxPrice = parseInt(req.body.max_ar, 10);
    const minPrice = parseInt(req.body.min_ar, 10);
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].ar <= maxPrice &&
        data[i].ar >= minPrice &&
        (data[i].honnan === req.body.kiindulopont || req.body.kiindulopont === '') &&
        (data[i].hova === req.body.celpont || req.body.celpont === '')
      ) {
        searchData.push(data[i]);
      }
    }
    res.send(JSON.stringify(searchData));
  } else {
    res.status(404).send('Error');
  }
  // console.log(searchData);
});

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Elindult a szerver');
});
