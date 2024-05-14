import pool from './connection.js';
/*
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS Jaratok
  JaratID VARCHAR(20) PRIMARY KEY,
  Honnan VARCHAR(30),
  Hova VARCHAR(30),
  Nap VARCHAR(15),
  Ora TIME,
  JegyAr INT,
  VonatTipus VARCHAR(30)
  `);
  console.log('Jaratok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}
*/
export const findAllJaratok = () => {
  const query = 'SELECT * FROM Jaratok';
  return pool.query(query);
};

export const insertJarat = (req) => {
  const query = 'INSERT INTO Jaratok VALUES (?, ?, ?, ?, ?, ?, ?)';
  return pool.query(query, [req.jaratid, req.honnan, req.hova, req.napok, req.ora, req.ar, req.vonattipus]);
};

// export const deleteAllJaratok = () => {
//   const query = 'DELETE FROM Jaratok';
//   return pool.query(query);
// };
