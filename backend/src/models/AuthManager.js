const AbstractManager = require("./AbstractManager");

class AuthManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  /**
   * user = {
   *    name: "AnthoLeBG",
   *    email: "test@test.fr",
   *    password : hash password
   * }
   */
  add(user) {
    return this.connection.query(
      `insert into ${this.table} (name, email, password) VALUES (?, ?, ?)`,
      [user.name, user.email, user.password]
    );
  }

  /**
   * user = {
   *  email: email@provider.com
   *  password: secretPassw0rd!
   * }
   *
   */
  findUser(user) {
    return this.connection.query(
      `select * from ${this.table} where email = ?`,
      [user.email]
    );
  }
}

module.exports = AuthManager;
