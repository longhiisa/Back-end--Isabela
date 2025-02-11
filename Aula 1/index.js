const express = require(`express`);

const app = express();

const port = 3000;

app.get(`/`, (req, res) =>{
    res.send(`Pagina principal`);
});

app.get(`/home`, (req, res) =>{
    res.send(`Pagina home`);
});

app.get(`/login`, (req, res) =>{
    res.send(`Pagina login`);
});










app.listen(port, () =>{
    console.log(`Servidor eodando na porta`, port);
});