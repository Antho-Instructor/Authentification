const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // registerUser(name, email, password) {
  //   return this.connection.query(
  //     `insert into ${this.table} (name, email, password) VALUES (?, ?, ?)`,
  //     [name, email, password]
  //   );
  // }

  registerUser(user) {
    return this.connection.query(
      `insert into ${this.table} (name, email, password) VALUES (?, ?, ?)`,
      [user.name, user.email, user.password]
    );
  }

  findByMail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
