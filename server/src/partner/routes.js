const express = require("express");
const dbUtils = require("../dbUtils");

const partnerRoutes = express.Router();

partnerRoutes.get("/", async (req, res) => {
  try {
    const data = await dbUtils.all(
      req.app.get("db"),
      "SELECT * FROM partner LEFT JOIN city ON partner.city_id = city.city_id LEFT JOIN company_type ON partner.company_type_id = company_type.company_type_id"
    );

    res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

partnerRoutes.post("/", async (req, res) => {
  try {
    const {
      tax_number,
      registration_number,
      address,
      phone_number,
      comments,
      name,
      company_type_id,
      city_id,
    } = req.body;

    const insertId = await dbUtils.insert(
      req.app.get("db"),
      `INSERT INTO partner 
      ("tax_number", "registration_number", "address", "phone_number", "comments", "name", "company_type_id", "city_id") 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tax_number,
        registration_number,
        address,
        phone_number,
        comments,
        name,
        company_type_id,
        city_id,
      ]
    );

    const insertedItem = await dbUtils.get(
      req.app.get("db"),
      `SELECT * FROM partner LEFT JOIN city ON partner.city_id = city.city_id LEFT JOIN company_type ON partner.company_type_id = company_type.company_type_id WHERE partner.partner_id=?`,
      [insertId]
    );

    res.send(insertedItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

partnerRoutes.post("/delete", async (req, res) => {
  try {
    const { partner_id } = req.body;

    await dbUtils.preparedRun(
      req.app.get("db"),
      `DELETE FROM partner WHERE partner_id=?`,
      [partner_id]
    );

    res.send("Success");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

partnerRoutes.put("/", async (req, res) => {
  try {
    const {
      partner_id,
      tax_number,
      registration_number,
      address,
      phone_number,
      comments,
      name,
      company_type_id,
      city_id,
    } = req.body;

    const possibleUpdates = {
      tax_number,
      registration_number,
      address,
      phone_number,
      comments,
      name,
      company_type_id,
      city_id,
    };

    const filteredUpdateKeys = Object.keys(possibleUpdates).filter(
      (key) => possibleUpdates[key] !== undefined
    );

    const sqlScript = filteredUpdateKeys.map((key) => `${key}=?`).join(",");

    await dbUtils.preparedRun(
      req.app.get("db"),
      `UPDATE partner 
        SET ${sqlScript}
        WHERE partner_id=${partner_id}`,
      filteredUpdateKeys.map((key) => possibleUpdates[key])
    );

    const updatedItem = await dbUtils.get(
      req.app.get("db"),
      `SELECT * FROM partner JOIN city ON partner.city_id = city.city_id JOIN company_type ON partner.company_type_id = company_type.company_type_id WHERE partner.partner_id=?`,
      [partner_id]
    );
    if (updatedItem) {
      res.send(updatedItem);
    } else {
      res.status(400).send("Not found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = partnerRoutes;
