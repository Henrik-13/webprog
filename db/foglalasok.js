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
export const findAllFoglalasok = () => {
  const query = `SELECT F.FoglalasID, FE.Nev, J.Honnan, J.Hova, FO.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS FO
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON FO.FelhasznaloID = FE.FelhasznaloID
    `;
  return pool.query(query);
};

export const insertFoglalas = (req) => {
  const query = 'INSERT INTO Foglalasok VALUES (?, ?, ?)';
  return pool.query(query, [req.felhasznaloid, req.jaratid, req.datum]);
};

// export const deleteAllFoglalasok = () => {
//   const query = 'DELETE FROM Foglalasok';
//   return pool.query(query);
// };
