import express from 'express';

const app = express();
const data = [];
let idCount = 0;

app.post('/submit', express.urlencoded({ extended: true }), (req, res) => {
  req.body.id = (idCount++).toString();
  // Date.now().toString(36);
  data.push(req.body);
  res.send(req.body.id);
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
  // console.log(searchData);
  res.send(JSON.stringify(searchData));
});

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Elindult a szerver');
});
