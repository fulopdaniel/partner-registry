const express = require("express");
const dbUtils = require("../dbUtils");

const cityRoutes = express.Router();

cityRoutes.get("/", async (req, res) => {
  try {
    const data = await dbUtils.all(req.app.get("db"), "SELECT * FROM city");
    res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

cityRoutes.post("/", async (req, res) => {
  try {
    const { city_name } = req.body;

    const insertId = await dbUtils.insert(
      req.app.get("db"),
      `INSERT INTO city 
          ("city_name") 
          VALUES (?)`,
      [city_name]
    );

    const insertedItem = await dbUtils.get(
      req.app.get("db"),
      `SELECT * FROM city WHERE city_id=?`,
      [insertId]
    );

    res.send(insertedItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = cityRoutes;
