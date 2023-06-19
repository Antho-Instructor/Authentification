const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  /**
   *
   * Nous pouvons créer n'importe quelle méthode, n'importe quand.
   * Donc moi, maintenant, je souhaite créer une méthode pour enregistrer un user
   * J'appel donc `registerUser`, celui prend 1 paramètre, c'est un obj `user`
   * qui contiendra les informations suivantes :
   * - name
   * - email
   * - password -> celui ci, sera le password hashé bien entendu
   */

  registerUser(user) {
    return this.connection.query(
      `insert into ${this.table} (name, email, password) VALUES (?, ?, ?)`,
      [user.name, user.email, user.password]
    );
  }

  /**
   * Une autre façon de faire
   */
  // registerUser(name, email, password) {
  //   return this.connection.query(
  //     `insert into ${this.table} (name, email, password) VALUES (?, ?, ?)`,
  //     [name, email, password]
  //   );
  // }

  /**
   * Pour le bien de mon projet, j'ai du créer une méthode findByMail
   * Pourquoi ?
   * Pour retrouver un user via son email, si j'avais besoin d'autre chose, alors je peux créer autant de fonction que necessaire
   */
  findByMail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
