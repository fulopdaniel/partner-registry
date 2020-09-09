/* Creating promise based queries */

const run = (db, script) =>
  new Promise((resolve, reject) => {
    db.run(script, (errors) => {
      if (errors) {
        reject(errors);
      }
      resolve();
    });
  });

const all = (db, script) =>
  new Promise((resolve, reject) => {
    db.all(script, (errors, data) => {
      if (errors) {
        reject(errors);
      }
      resolve(data);
    });
  });

const get = (db, script, params) =>
  new Promise((resolve, reject) => {
    const statement = db.prepare(script);
    statement.get([...params], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });

const insert = (db, script, params) =>
  new Promise((resolve, reject) => {
    const statement = db.prepare(script);
    statement.run([...params], (err) => {
      if (err) {
        reject(err);
      }
      db.get("SELECT last_insert_rowid() as insertId", (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response.insertId);
      });
    });
  });

const preparedRun = (db, script, params) =>
  new Promise((resolve, reject) => {
    const statement = db.prepare(script);
    statement.run([...params], (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

module.exports = {
  run,
  all,
  insert,
  get,
  preparedRun,
};
