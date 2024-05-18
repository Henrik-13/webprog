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

export async function findByParameters(jarat) {
  let query = 'SELECT * FROM Jaratok WHERE 1 = 1';
  const params = [];
  if (jarat.kiindulopont) {
    console.log('kiindulopont');
    query += ' AND Honnan = ?';
    params.push(jarat.kiindulopont);
  }
  if (jarat.celpont) {
    console.log('celpont');
    query += ' AND Hova = ?';
    params.push(jarat.celpont);
  }
  if (jarat.min_ar) {
    console.log('min_ar');
    query += ' AND JegyAr >= ?';
    params.push(jarat.min_ar);
  }
  if (jarat.max_ar) {
    console.log('max_ar');
    query += ' AND JegyAr <= ?';
    params.push(jarat.max_ar);
  }
  const res = await pool.query(query, params);
  return res;
}

export async function findDayByJaratID(id) {
  const query = 'SELECT Nap FROM Jaratok WHERE JaratID = ?';
  const [res] = await pool.query(query, id);
  return res;
}

export async function insertJarat(req) {
  const query = 'INSERT INTO Jaratok VALUES (?, ?, ?, ?, ?, ?, ?)';
  const res = await pool.query(query, [req.jaratid, req.honnan, req.hova, req.napok, req.ora, req.ar, req.vonattipus]);
  return res;
}
