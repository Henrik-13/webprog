import { findUserByUsername } from '../db/felhasznalok.js';
import { deleteFoglalas as dbDeleteFoglalas, findFelhasznaloIDByFoglalasID } from '../db/foglalasok.js';

export async function deleteFoglalas(req, res) {
  const { foglalasID } = req.params;
  try {
    const result1 = await findFelhasznaloIDByFoglalasID(foglalasID);
    const result2 = await findUserByUsername(req.session.username);
    const user = result2[0][0];
    // console.log(result1.FelhasznaloID, req.session.userID);
    if (user.FelhasznaloID === result1.FelhasznaloID || req.session.roleID === 1) {
      const result = await dbDeleteFoglalas(foglalasID);
      if (result.length > 0) {
        res.json(result[0]);
      }
    } else {
      res
        .status(403)
        .render('error', { title: '403 forbidden', message: 'Más felhasználó foglalását nem lehet törölni' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a foglalas torlesenel');
  }
}
