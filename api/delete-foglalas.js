import { deleteFoglalas as dbDeleteFoglalas } from '../db/foglalasok.js';

export async function deleteFoglalas(req, res) {
  const { foglalasID } = req.params;
  try {
    const result = await dbDeleteFoglalas(foglalasID);
    if (result.length > 0) {
      res.json(result[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a deletenel');
  }
}
