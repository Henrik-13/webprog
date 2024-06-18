import pool from './connection.js';

try {
  await pool.query(`CREATE TABLE IF NOT EXISTS Jaratok (
    JaratID VARCHAR(20) NOT NULL,
    Honnan VARCHAR(30),
    Hova VARCHAR(30),
    Nap VARCHAR(15),
    Ora TIME,
    JegyAr INT,
    VonatTipus VARCHAR(30),
      CONSTRAINT PK_Jaratok PRIMARY KEY (JaratID)
  );`);
  console.log('Jaratok tabla sikeresen letrehozva');
} catch (err) {
  console.error(`Create table error: ${err}`);
  process.exit(1);
}

export async function findAllJaratok() {
  const query = 'SELECT * FROM Jaratok';
  const res = await pool.query(query);
  return res;
}

export async function findJaratByID(id) {
  const query = 'SELECT * FROM Jaratok WHERE JaratID = ?';
  const res = await pool.query(query, id);
  return res;
}

export async function findByParameters(jarat) {
  // console.log(jarat);
  let query = 'SELECT * FROM Jaratok WHERE 1 = 1';
  const params = [];
  if (jarat.kiindulopont) {
    query += ' AND Honnan LIKE ?';
    params.push(`${jarat.kiindulopont}%`);
  }
  if (jarat.celpont) {
    query += ' AND Hova LIKE ?';
    params.push(`${jarat.celpont}%`);
  }
  if (jarat.min_ar) {
    query += ' AND JegyAr >= ?';
    params.push(jarat.min_ar);
  }
  if (jarat.max_ar) {
    query += ' AND JegyAr <= ?';
    params.push(jarat.max_ar);
  }
  if (jarat.napok !== 'Osszes') {
    query += ' AND Nap = ?';
    params.push(jarat.napok);
  }
  if (jarat.vonattipus !== 'Osszes') {
    query += ' AND VonatTipus = ?';
    params.push(jarat.vonattipus);
  }
  const res = await pool.query(query, params);
  return res;
}

export async function findDayByJaratID(id) {
  const query = 'SELECT Nap FROM Jaratok WHERE JaratID = ?';
  const [res] = await pool.query(query, id);
  return res;
}

export async function insertJarat(jarat) {
  const query = 'INSERT INTO Jaratok VALUES (?, ?, ?, ?, ?, ?, ?)';
  const jaratid = Date.now().toString(36);
  const res = await pool.query(query, [
    jaratid,
    jarat.honnan,
    jarat.hova,
    jarat.napok,
    jarat.ora,
    jarat.ar,
    jarat.vonattipus,
  ]);
  return res;
}

export async function deleteJarat(jaratid) {
  const query = 'DELETE FROM Jaratok WHERE JaratID = ?';
  const res = await pool.query(query, jaratid);
  return res;
}

export async function findAtszallasosJaratok(jarat) {
  if (!jarat.kiindulopont || !jarat.celpont || !jarat.napok) {
    return [];
  }
  // console.log(jarat);
  const params = [];
  let query = `
    SELECT J1.Honnan, J1.Hova Megallo, J2.Hova, J1.Nap
    FROM Jaratok J1 JOIN Jaratok J2 ON J1.Hova = J2.Honnan
    WHERE J1.Hova != J2.Hova AND J1.Honnan != J2.Hova AND J1.Nap = J2.Nap`;
  query += ' AND J1.Honnan LIKE ?';
  params.push(`${jarat.kiindulopont}%`);
  query += ' AND J2.Hova LIKE ?';
  params.push(`${jarat.celpont}%`);
  if (jarat.napok !== 'Osszes') {
    query += ' AND Nap = ?';
    params.push(jarat.napok);
  }
  if (jarat.vonattipus !== 'Osszes') {
    query += ' AND VonatTipus = ?';
    params.push(jarat.vonattipus);
  }
  const res = await pool.query(query, params);
  return res;
}
