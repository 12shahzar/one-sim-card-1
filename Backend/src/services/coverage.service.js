const db = require("../config/db");

exports.getCoverage = async () => {
  const [rows] = await db.query("SELECT * FROM coverage");
  return rows;
};

exports.getCountries = async () => {
  const [rows] = await db.query(`
    SELECT DISTINCT countryName
    FROM coverage
    ORDER BY countryName 
  `);
  
   // Map to array of names
  const countries = rows.map(row => row.countryName);
  return countries;
};

exports.getOperatorsByCountry = async (countryName) => {
  const [rows] = await db.query(
    `SELECT id, operatorName, mccMnc, supportedNetworkTypes
     FROM coverage
     WHERE countryName = ?
     ORDER BY operatorName ASC`,
    [countryName]
  );

  return rows; // array of objects
};

