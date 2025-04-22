const express = require("express"); //biblioteca dentro do node(js) - rota, transfere dados
const userService = require("./userService");

const app = express(); // Cria uma instância do aplicativo Express
app.use(express.json()); // Configura o Express para interpretar requisições com corpo no formato JSON


//rota para criar usuario
app.post("/users", async (req, res) => {
    try {
        const { nome, email, senha, endereço, cpf, telefone } = req.body;
        if (!nome || !email || !senha || !endereço || !cpf|| !telefone) {   // Verifica se todos os campos obrigatórios foram fornecidos
            return res.status(400).json
                ({ error: "nome e email são obrigatorios" })
        }

        const user = await userService.addUser(nome, email, senha, endereço, cpf, telefone);  // Chama a função "addUser" do userService para adicionar o usuário
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });

    } catch (erro) {
        console.log(erro);
        res.status(400).json({ error: erro.message });
    }
});

//rota para listar todos os usuários
app.get("/users", (req, res) => {
    res.json(userService.getUsers());  // Retorna a lista de usuários chamando "getUsers" do userService. Get = mostrar
});


//porta onde o servidor está rodando

const port = 3001;
app.listen(port, () => {
    console.log("Servidor rodando na porta:", port);  //se estiver rodando mostra a mensagem
})


//excluir o usuário através do id

app.delete("/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id); //converte o id para número
        const resultado = await userService.deleteUser(id); //tenta excluir o usuário
        if (resultado.length == 0) {
            return res.status(406).json({"Mensagem": "Usuário não existe"});
        }
        return res.status(200).json(resultado); //se der certo, retorna a mensagem
    } catch {
        return res.status(404).json({ error: erro.message }); //caso de errado, retorna a mensagem de erro
    }
})

app.delete("/users", (req, res) => {
    const id = req.params.id; // pega o ID 

    const resultado = userService.deleteUser(id); // Chama o método corrigido

    if (resultado.error) {
        return res.status(404).json(resultado); // Retorna erro caso o ID não exista
    }

    res.status(200).json(resultado);
});

app.put("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha, endereço, cpf, telefone } = req.body;

    try {
        const user = userService.updateUser(id, nome, email, senha, endereço, cpf, telefone);
        res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (erro) {
        res.status(404).json({ error: erro.message });
    }
});
