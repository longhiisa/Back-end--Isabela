const express = require("express");
const userService = require("./userService");

const app = express();
app.use(express.json());
 
app.post("/users", async (req, res) => {
    const { nome, email, senha, endereco, telefone, cpf } = req.body;
    
    if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
        return res.status(400).json({ error: "Nome, email, senha, endereço, telefone e CPF são obrigatórios" });
    }

    try {
        const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf);
        return res.status(201).json(user);
    } catch (erro) {
        return res.status(400).json({ error: erro.message });
    }
});

app.get("/users", (req, res) => {
    res.json(userService.getUsers());
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    try {
        userService.deleteUser(id);
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (erro) {
        res.status(400).json({ error: erro.message });
    }
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha, endereco, telefone, cpf } = req.body;

    try {
        const user = userService.editUser(id, nome, email, senha, endereco, telefone, cpf);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json(user);
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao editar usuário", details: erro.message });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}`);
});
