const weekday = ['vasarnap', 'hetfo', 'kedd', 'szerda', 'csutortok', 'pentek', 'szombat'];
const trainTypes = ['gyors', 'regionalis', 'expressz', 'szemely'];

export default function validateJarat(req, res, next) {
  console.log(req.body);
  if (!req.body.honnan || !req.body.hova) {
    console.log('Ervenytelen kiindulo vagy celpont');
    res.sendStatus(400);
    return;
  }

  if (Number.isNaN(req.body.ar)) {
    console.log('Ervenytelen jegyar');
  }

  if (!weekday.includes(req.body.napok)) {
    console.log('Ervenytelen nap');
    res.sendStatus(400);
    return;
  }

  const t = /^\d{2}:\d{2}$/;
  if (!t.test(req.body.ora)) {
    console.log('Ervenytelen ora');
    res.sendStatus(400);
    return;
  }

  if (!trainTypes.includes(req.body.vonattipus)) {
    console.log('Ervenytelen vonattipus');
    res.sendStatus(400);
    return;
  }
  next();
}
