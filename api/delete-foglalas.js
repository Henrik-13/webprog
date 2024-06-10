import { deleteFoglalas as dbDeleteFoglalas, findFelhasznaloIDByFoglalasID } from '../db/foglalasok.js';

export async function deleteFoglalas(req, res) {
  const { foglalasID } = req.params;
  try {
    const result1 = await findFelhasznaloIDByFoglalasID(foglalasID);
    // console.log(result1.FelhasznaloID, req.session.userID);
    if (req.session.userID !== result1.FelhasznaloID) {
      res
        .status(403)
        .render('error', { title: '403 forbidden', message: 'Más felhasználó foglalását nem lehet törölni' });
    } else {
      const result = await dbDeleteFoglalas(foglalasID);
      if (result.length > 0) {
        res.json(result[0]);
      }
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a deletenel');
  }
}
