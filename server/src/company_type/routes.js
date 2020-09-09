const express = require("express");
const dbUtils = require("../dbUtils");

const companyTypeRoutes = express.Router();

companyTypeRoutes.get("/", async (req, res) => {
  try {
    const data = await dbUtils.all(
      req.app.get("db"),
      "SELECT * FROM company_type"
    );
    res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

companyTypeRoutes.post("/", async (req, res) => {
  try {
    const { company_type } = req.body;

    const insertId = await dbUtils.insert(
      req.app.get("db"),
      `INSERT INTO company_type 
        ("company_type") 
        VALUES (?)`,
      [company_type]
    );

    const insertedItem = await dbUtils.get(
      req.app.get("db"),
      `SELECT * FROM company_type WHERE company_type_id=?`,
      [insertId]
    );

    res.send(insertedItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = companyTypeRoutes;
