class User {  
    constructor(id, nome, email, senha, endereco, telefone, cpf) {  // Modificando o construtor para receber senha, endereco e CPF
        this.id = id;
        this.nome = nome; 
        this.email = email;
        this.senha = senha;  // Atribuindo senha
        this.endereco = endereco;  // Atribuindo endereco
        this.telefone = telefone; // Atribuindo telefone
        this.cpf = cpf;  // Atribuindo CPF
    }  
}  

module.exports = User;
