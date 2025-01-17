const weekday = ['Vasarnap', 'Hetfo', 'Kedd', 'Szerda', 'Csutortok', 'Pentek', 'Szombat'];
const trainTypes = ['Gyors', 'Regionalis', 'Expressz', 'Szemely'];

export default function validateJarat(req, res, next) {
  if (!req.body.honnan || !req.body.hova) {
    console.error('Ervenytelen kiindulo vagy celpont');
    res.sendStatus(400);
    return;
  }

  if (Number.isNaN(req.body.ar)) {
    console.error('Ervenytelen jegyar');
  }

  if (!weekday.includes(req.body.napok)) {
    console.error('Ervenytelen nap');
    res.sendStatus(400);
    return;
  }

  const t = /^\d{2}:\d{2}$/;
  if (!t.test(req.body.ora)) {
    console.error('Ervenytelen ora');
    res.sendStatus(400);
    return;
  }

  if (!trainTypes.includes(req.body.vonattipus)) {
    console.error('Ervenytelen vonattipus');
    res.sendStatus(400);
    return;
  }
  next();
}
