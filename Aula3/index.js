const express = require('express');
const userService = require('./userService');

const app = express();
app.use(express.json()); // Ativa o JSON no Express

// Rota para criar um novo usuário
app.post("/users", (req, res) => {
    const { nome, email, senha, cpf, endereco, telefone } = req.body; // Recebe dados do corpo da requisição
    if (!nome || !email || !senha || !endereco || !telefone || !cpf) { // Verifica se todos os campos obrigatórios foram preenchidos
        return res.status(400).json({ error: "Nome, email, senha, CPF, endereço e telefone são obrigatórios" });
    }
    const user = userService.addUser(nome, email, senha, cpf, endereco, telefone); // Adiciona o novo usuário
    res.status(200).json({ user });
});

// Rota para listar todos os usuários
app.get("/users", (req, res) => {
    res.json(userService.getUsers());
});

// Rota para deletar um usuário pelo ID
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id); // Converte o ID para número
    try {
        userService.deleteUser(id); // Deleta o usuário
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (erro) {
        res.status(400).json({ error: "Usuário não encontrado" });
    }
});

// Rota para editar um usuário pelo ID (PUT)
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id); // Converte o ID para número
    const { nome, email, senha, cpf, endereco, telefone } = req.body; // Desestrutura os dados do corpo da requisição

    try {
        // Chama o método para editar o usuário
        const user = userService.editUser(id, nome, email, senha, cpf, endereco, telefone);

        // Se o usuário não for encontrado
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Se o usuário for encontrado e editado, retorna o usuário atualizado
        return res.status(200).json(user);

    } catch (erro) {
        // Caso ocorra algum erro inesperado
        return res.status(500).json({ error: "Erro ao editar usuário", details: erro.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("O servidor está rodando na porta: ", port);
});
