import { deleteJarat as dbDeleteJarat } from '../db/jaratok.js';

export async function deleteJarat(req, res) {
  const { jaratID } = req.params;
  // console.log(jaratID);
  try {
    if (req.session.roleID === 1) {
      const result = await dbDeleteJarat(jaratID);
      if (result.length > 0) {
        res.json(result[0]);
      }
    } else {
      res.status(403).render('error', { title: '403 forbidden', message: 'Admin jogosultság szükséges.' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a jarat torlesenel');
  }
}
