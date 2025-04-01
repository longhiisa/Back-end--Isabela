const User = require("./user");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

class UserService {
    constructor() {
        this.filePath = path.join(__dirname, "user.json");
        this.users = this.loadUsers();
        this.nextID = this.getNextId();
    }

    loadUsers() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, "utf8");
                return JSON.parse(data) || [];
            }
        } catch (erro) {
            console.log("Erro ao carregar arquivo:", erro);
        }
        return [];
    }

    getNextId() {
        return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 4));
        } catch (erro) {
            console.log("Erro ao salvar usuários:", erro);
        }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf) {
        if (this.users.some(user => user.cpf === cpf)) {
            throw new Error("CPF já cadastrado.");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const user = new User(this.nextID++, nome, email, senhaCriptografada, endereco, telefone, cpf);
        
        this.users.push(user);
        this.saveUsers();
        return user;
    }

    getUsers() {
        return this.users;
    }

    deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) throw new Error("Usuário não encontrado.");

        this.users.splice(userIndex, 1);
        this.saveUsers();
    }
    async editUser(id, nome, email, senha, endereco, telefone, cpf) {
        const user = this.users.find(user => user.id === id);
        if (!user) return null;
    
        if (cpf && cpf !== user.cpf) {
            if (this.users.some(u => u.cpf === cpf && u.id !== id)) {
                console.log("🚨 Tentativa de alterar CPF para um já existente!");
                throw new Error("Este CPF já está cadastrado para outro usuário.");
            }
        }
    
        user.nome = nome || user.nome;
        user.email = email || user.email;
        user.senha = senha ? await bcrypt.hash(senha, 10) : user.senha;
        user.endereco = endereco || user.endereco;
        user.telefone = telefone || user.telefone;
        user.cpf = cpf || user.cpf;
    
        this.saveUsers();
        return user;
    }
    
        
}

module.exports = new UserService();
