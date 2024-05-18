import pool from './connection.js';
/*
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS Foglalasok (
    FoglalasID INT PRIMARY KEY,
    JaratID VARCHAR(30) FOREIGN KEY REFERENCES Jaratok(JaratID),
    Datum DATE
  )`);
  console.log('Foglalasok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}
*/
export async function findAllFoglalasok() {
  const query = `SELECT F.FoglalasID, FE.Nev, J.Honnan, J.Hova, F.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS F
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON F.FelhasznaloID = FE.FelhasznaloID;
    `;
  const [foglalasok] = await pool.query(query);
  return foglalasok;
}

export async function findFoglalasByID(id) {
  const query = `SELECT F.FoglalasID, J.JaratID, FE.Nev, J.Honnan, J.Hova, F.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS F
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON F.FelhasznaloID = FE.FelhasznaloID
    WHERE J.JaratID = ?;
    `;
  const foglalasok = await pool.query(query, id);
  return foglalasok;
}

export const insertFoglalas = (user) => {
  const query = 'INSERT INTO Foglalasok(FelhasznaloID, JaratID, Datum) VALUES (?, ?, ?)';
  return pool.query(query, [user.id, user.jaratid, user.datum]);
};
