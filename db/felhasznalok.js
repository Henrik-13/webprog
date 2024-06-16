import pool from './connection.js';

try {
  await pool.query(`CREATE TABLE IF NOT EXISTS Felhasznalok (
    FelhasznaloID INT NOT NULL AUTO_INCREMENT,
      Nev VARCHAR(30),
      Jelszo VARCHAR(100),
      CONSTRAINT PK_Felhasznalok PRIMARY KEY (FelhasznaloID)
  );`);
  console.log('Felhasznalok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}

export async function findAllUsers() {
  const query = 'SELECT * FROM Felhasznalok';
  const res = await pool.query(query);
  return res;
}

export async function insertUser(name, hashedPassword) {
  const query = 'INSERT INTO Felhasznalok(Nev, Jelszo, JogID) VALUES (?, ?, ?)';
  const res = await pool.query(query, [name, hashedPassword, 0]);
  return res;
}

export async function findUserByUsername(username) {
  const query = 'SELECT * FROM Felhasznalok WHERE Nev = ?';
  const res = await pool.query(query, username);
  return res;
}

export async function isUsernameTaken(username) {
  const query = 'SELECT 1 FROM Felhasznalok WHERE Nev = ?';
  const res = await pool.query(query, username);
  return res;
}

export async function findRoleIDByUserID(userID) {
  const query = 'SELECT JogID from Felhasznalok WHERE FelhasznaloID = ?';
  const res = await pool.query(query, userID);
  return res;
}
