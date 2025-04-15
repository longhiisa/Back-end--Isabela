const User = require("./user.js");

const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require("./mysql");

class UserService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUser();
        this.nextId = this.getNextId();
    }

    loadUser() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf8');
                if (!data.trim()) return [];
                return JSON.parse(data);
            }
        } catch (erro) {
            console.log("Erro ao carregar o arquivo!", erro);
        }
        return [];
    }

    getNextId() {
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro) {
            console.log("Erro na busca pelo ID", erro);
            return 1;
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2));
        } catch (erro) {
            console.log("Erro ao salvar o arquivo!", erro);
        }
    }

    async addUser(nome, email, senha, endereço, cpf, telefone) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `INSERT INTO usuario (nome, email, senha, endereço, cpf, telefone)
                 VALUES (?, ?, ?, ?, ?, ?);`,
                [nome, email, senhaCripto, endereço, cpf, telefone]
            );
            return resultados;

        } catch (erro) {
            console.log("Falha ao criar um usuário!", erro);
            throw erro;
        }
    }

    getUsers() {
        try {
            return this.users;
        } catch (erro) {
            console.log("Falha ao buscar os usuários.", erro);
            return [];
        }
    }

    deleteUser(id) {
        try {
            const usuarioEncontrado = this.users.find(user => user.id === id);
            if (!usuarioEncontrado) {
                throw new Error("Usuário não encontrado!");
            }
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
            return { mensagem: "Usuário excluído com sucesso!" };
        } catch (erro) {
            console.log("Falha ao excluir usuário!", erro);
            throw erro;
        }
    }
    async updateUser(id, nome, email, senha, endereço, cpf, telefone) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);
    
            const resultados = await mysql.execute(
                `UPDATE usuario 
                 SET nome = ?, email = ?, senha = ?, endereço = ?, cpf = ?, telefone = ? 
                 WHERE idusuario = ?;`,
                [nome, email, senhaCripto, endereço, cpf, telefone, id]
            );
    
            return {
                mensagem: "Usuário atualizado com sucesso!",
                resultados
            };
    
        } catch (erro) {
            console.log("Erro ao atualizar o usuário", erro);
            throw erro;
        }
    }}
    
module.exports = new UserService();
