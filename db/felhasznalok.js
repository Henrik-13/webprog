import pool from './connection.js';

try {
  await pool.query(`CREATE TABLE IF NOT EXISTS Felhasznalok (
    FelhasznaloID INT NOT NULL AUTO_INCREMENT,
      Nev VARCHAR(30),
      CONSTRAINT PK_Felhasznalok PRIMARY KEY (FelhasznaloID)
  );`);
  console.log('Felhasznalok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}

export async function findAllFelhasznalok() {
  const query = 'SELECT * FROM Felhasznalok';
  const valasz = await pool.query(query);
  return valasz;
}

export async function insertFelhasznalo(req) {
  const query = 'INSERT INTO Felhasznalok VALUES (?)';
  const res = await pool.query(query, [req.nev]);
  return res;
}
