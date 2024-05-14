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
export const findAllFelhasznalok = () => {
  const query = 'SELECT Nev FROM Felhasznalok';
  return pool.query(query);
};

export const insertFelhasznalo = (req) => {
  const query = 'INSERT INTO Felhasznalok VALUES (?)';
  return pool.query(query, [req.nev]);
};

// export const deleteAllFelhasznalo = () => {
//   const query = 'DELETE FROM Felhasznalok';
//   return pool.query(query);
// };
