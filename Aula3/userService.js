const User = require("./user"); // Ensure 'user' is capitalized if it's a class.

class UserService {
    constructor() {
        this.users = []; // Array to store users
        this.nextId = 1; //contador para gerar id
    }

    addUser(nome, email) {
        const user = new User(this.nextId++, nome, email);
        this.users.push(user);
        return user;
    }

    getUsers() {
        return this.users;
    }
}

module.exports = new UserService();
