const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const seedScript = require("./seed");
const dbUtils = require("./dbUtils");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const { PORT = 8080 } = process.env;

app.use(bodyParser.json());
app.use(cors());

let db = new sqlite3.Database(":memory:", async (err) => {
  if (err) {
    return console.error(err.message);
  }

  const createTables = seedScript.createTables.map((script) =>
    dbUtils.run(db, script)
  );

  await Promise.all(createTables);
  await dbUtils.run(db, seedScript.createCompanyTypes);
  await dbUtils.run(db, seedScript.createCities);
  await dbUtils.run(db, seedScript.createPartners);
});

app.set("db", db);

app.use("/api/", routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
