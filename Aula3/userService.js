const User = require("./user");
const path = require("path"); // módulo para manipular caminhos
const fs = require("fs"); // módulo para manipular arquivos
const bcrypt =require('bcryptjs'); //modulo para criar criptografia e senha

class UserService {
    constructor() {
        // quando não passa parâmetro, traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers(); // invoca o método para carregar os usuários
        this.nextID = this.getNextId(); // invoca o método para pegar o próximo ID
    }

    loadUsers() {
        try {
            // tenta executar o código
            if (fs.existsSync(this.filePath)) { // verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); // lê o arquivo
                return JSON.parse(data); // transforma o JSON em objeto
            }
        } catch (erro) { // caso ocorra um erro
            console.log("Erro ao carregar arquivo", erro);
        }
        return []; // retorna array vazio em caso de erro ou arquivo não encontrado
    }

    getNextId() {
        try {
            if (this.users.length === 0) return 1; // caso não haja nenhum usuário
            return Math.max(...this.users.map(user => user.id)) + 1; // retorna o maior id + 1
        } catch (erro) {
            console.log("Erro ao buscar o id", erro);
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users)); // salva os usuários no arquivo
        } catch (erro) {
            console.log("Não foi possível salvar o usuário", erro);
        }
    }

    async addUser(nome, email, senha, cpf, endereco, telefone) {
        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10)
            const user = new User(this.nextID++, nome, email, senhaCriptografada, cpf, endereco, telefone); // cria novo usuário
            this.users.push(user); // adiciona o novo usuário
            this.saveUsers(); // salva os usuários no arquivo
            return user;
        } catch (erro) {
            console.log("Erro ao adicionar usuário", erro);
        }
    }

    getUsers() {
        try {
            return this.users; // retorna os usuários
        } catch (erro) {
            console.log("Erro ao puxar os usuários", erro);
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id); // filtra os usuários que não são o id passado
            this.saveUsers(); // salva os usuários no arquivo
        } catch (erro) {
            console.log("Erro ao deletar usuário", erro);
        }
    }

    // Método para editar um usuário existente
    editUser(id, nome, email, senha, cpf, endereco, telefone) {
        try {
            // Encontra o usuário pelo id
            const user = this.users.find(user => user.id === id);

            if (!user) {
                return null; // Retorna null caso o usuário não seja encontrado
            }

            // Atualiza os dados do usuário
            user.nome = nome || user.nome;
            user.email = email || user.email;
            user.senha = senha || user.senha;
            user.cpf = cpf || user.cpf;
            user.endereco = endereco || user.endereco;
            user.telefone = telefone || user.telefone;

            this.saveUsers(); // Salva as alterações no arquivo

            return user; // Retorna o usuário atualizado
        } catch (erro) {
            console.log("Erro ao editar o usuário", erro);
        }
    }
}

// Definir e exportar a instância de userService
module.exports = new UserService();
