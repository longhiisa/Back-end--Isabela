const express = require('express'); 
const userService = require('./userService'); 

const app = express();  //nome qualquer para express
app.use(express.json()); // vou abilitar json no express

app.post("/users", (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: "nome e email sao obrigatorios" });
    }

    const user = userService.addUser(nome, email);  
    res.status(200).json({ user });  
});  

app.get("/users", (req, res) => { 
    res.json(userService.getUsers());  
});  

const port = 3000;  
app.listen(port, () =>{
    console.log("sevidor rodando na porta", port);  
})

