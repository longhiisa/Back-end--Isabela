class User {  
    constructor(id, nome, email, senha, endereco, CPF) {  // Modificando o construtor para receber senha, endereco e CPF
        this.id = id;
        this.nome = nome; 
        this.email = email;
        this.senha = senha;  // Atribuindo senha
        this.endereco = endereco;  // Atribuindo endereco
        this.telefone = this.telefone; // Atribuindo telefone
        this.CPF = CPF;  // Atribuindo CPF
    }  
}  

module.exports = User;
