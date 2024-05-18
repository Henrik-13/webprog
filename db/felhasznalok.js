import pool from './connection.js';
/*
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS felhasznalok (

  )`);
  console.log('Felhasznalok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}
*/
export async function findAllFelhasznalok() {
  const query = 'SELECT * FROM Felhasznalok';
  const valasz = await pool.query(query);
  return valasz;
}

export async function findIDByName(nev) {
  const query = 'SELECT 1 FelhasznaloID FROM Felhasznalok WHERE Nev = ?';
  const valasz = await pool.query(query, nev);
  return valasz;
}

export async function insertFelhasznalo(req) {
  const query = 'INSERT INTO Felhasznalok VALUES (?)';
  const res = await pool.query(query, [req.nev]);
  return res;
}

// export const deleteAllFelhasznalo = () => {
//   const query = 'DELETE FROM Felhasznalok';
//   return pool.query(query);
// };
