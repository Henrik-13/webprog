import pool from './connection.js';

try {
  await pool.query(`CREATE TABLE IF NOT EXISTS Foglalasok (
    FoglalasID INT NOT NULL AUTO_INCREMENT,
      FelhasznaloID INT,
      JaratID VARCHAR(20),
      Datum DATE,
      CONSTRAINT PK_Foglalasok PRIMARY KEY (FoglalasID),
      CONSTRAINT FK_Foglalasok_Felhasznalok FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalok(FelhasznaloID),
      CONSTRAINT FK_Foglalasok_Jaratok FOREIGN KEY (JaratID) REFERENCES Jaratok(JaratID)
  );`);
  console.log('Foglalasok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}

export async function findAllFoglalasok() {
  const query = `SELECT J.JaratID, F.FoglalasID, FE.Nev, J.Honnan, J.Hova, F.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS F
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON F.FelhasznaloID = FE.FelhasznaloID;
    `;
  const foglalasok = await pool.query(query);
  return foglalasok;
}

export async function findFoglalasByJaratID(id) {
  const query = `SELECT F.FoglalasID, J.JaratID, FE.Nev, J.Honnan, J.Hova, F.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS F
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON F.FelhasznaloID = FE.FelhasznaloID
    WHERE J.JaratID = ?;
    `;
  const foglalasok = await pool.query(query, id);
  return foglalasok;
}

export async function findFoglalasByFelhasznaloAndJarat(jaratid, nev) {
  const query = `SELECT F.FoglalasID, J.JaratID, FE.Nev, J.Honnan, J.Hova, F.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS F
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON F.FelhasznaloID = FE.FelhasznaloID
    WHERE J.JaratID = ? AND FE.Nev = ?;
    `;
  const foglalasok = await pool.query(query, [jaratid, nev]);
  return foglalasok;
}

export async function insertFoglalas(felhasznaloid, jaratid, datum) {
  const query = 'INSERT INTO Foglalasok(FelhasznaloID, JaratID, Datum) VALUES (?, ?, ?)';
  const res = await pool.query(query, [felhasznaloid, jaratid, datum]);
  return res;
}

export async function deleteFoglalas(id) {
  const query = 'DELETE FROM Foglalasok WHERE FoglalasID = ?';
  const res = await pool.query(query, id);
  return res;
}

export async function findFelhasznaloIDByFoglalasID(foglalasid) {
  const query = 'SELECT FelhasznaloID FROM Foglalasok WHERE FoglalasID = ?';
  const res = await pool.query(query, foglalasid);
  return res[0][0];
}

export async function findFoglalasokByFelhasznalo(nev) {
  const query = `SELECT J.JaratID, F.FoglalasID, FE.Nev, J.Honnan, J.Hova, F.Datum, J.Ora, J.JegyAr, J.VonatTipus
    FROM Foglalasok AS F
    INNER JOIN Jaratok AS J ON J.JaratID = F.JaratID
    INNER JOIN Felhasznalok AS FE ON F.FelhasznaloID = FE.FelhasznaloID
    WHERE FE.Nev = ?;
    `;
  const foglalasok = await pool.query(query, nev);
  return foglalasok;
}
