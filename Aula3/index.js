const express = require("express");  // Importando o express
const userService = require("./userService");  // Importando o serviço de usuários

const app = express();  // Criando a instância do express
app.use(express.json());  // Middleware para processar JSON no corpo da requisição

// Rota para criar um novo usuário
app.post("/users", (req, res) => {
    const { nome, email, senha, endereco, telefone, CPF } = req.body;  // Recebendo dados do corpo da requisição

    // Verifica se todos os campos necessários foram informados
    if (!nome || !email || !senha || !endereco || !telefone || !CPF) {
        return res.status(400).json({ error: "Nome, email, senha, endereço, telefone e CPF são obrigatórios" });
    }

    // Chama o método addUser passando todos os parâmetros
    const user = userService.addUser(nome, email, senha, endereco, telefone, CPF);

    // Se ocorrer erro (exemplo: CPF já cadastrado), retorna o erro
    if (user.error) {
        return res.status(400).json({ error: user.error });
    }

    // Caso contrário, retorna o usuário criado
    return res.status(201).json({ user });
});

// Rota para obter todos os usuários
app.get("/users", (req, res) => {
    const users = userService.getUsers();
    return res.json(users);
});

// Definindo a porta do servidor
const port = 3001;
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);  // Mensagem indicando que o servidor está rodando
});
