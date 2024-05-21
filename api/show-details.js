import { findJaratByID } from '../db/jaratok.js';

export async function showDetails(req, res) {
  const { id } = req.params;
  try {
    const result = await findJaratByID(id);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('Jarat nem talalhato');
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a selectnel');
  }
}
