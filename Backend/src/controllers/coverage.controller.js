const coverageService = require("../services/coverage.service");

exports.getCoverage = async (req, res) => {
  try {
    const data = await coverageService.getCoverage();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching coverage data");
  }
};

exports.getCountries = async (req, res) => {
  try {
    const data = await coverageService.getCountries();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching countries");
  }
};

exports.getOperatorsByCountry = async (req, res) => {
  try {
    const country = req.query.country;

    if (!country) {
      return res
        .status(400)
        .json({ message: "Country query parameter is required" });
    }

    const data = await coverageService.getOperatorsByCountry(country);
    res.json(data); // returns array of objects with id, operatorName, mccMnc, supportedNetworkTypes
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching operators");
  } 
};

