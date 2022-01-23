export class User {
  constructor() {
    this.id = '';
    this.mail = '';
    this.pass = '';
  }

  userLogin(id, mail, pass) {
    this.id = id;
    this.mail = mail;
    this.pass = pass;
  }

  userLogOut(id, mail, pass) {
    this.id = '';
    this.mail = '';
    this.pass = '';
  }
}
