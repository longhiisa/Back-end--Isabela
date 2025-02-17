// Classe base Usuario
class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this._senha = senha; // Atributo "privado"
    }  

    autenticar(senha) {
        return senha === this._senha;
    }

    alterarSenha(novaSenha) {
        this._senha = novaSenha;
        console.log("Senha alterada com sucesso");
    }
}

// Classe Admin que herda de Usuario
class Admin extends Usuario {
    constructor(nome, email, senha, nivelAcesso) {
        super(nome, email, senha); // Chama o construtor da classe base
        this.nivelAcesso = nivelAcesso;
    }

    banirUsuario(usuario) {
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`);
    }
    
    // Polimorfismo: sobrescrevendo o método autenticar
    autenticar(senha) {
        return senha === this._senha && this.nivelAcesso === "alto";
    }
}

// Exemplo de uso
const usuario1 = new Usuario("Luiz", "luiz@gmail.com", "1234");
const usuario2 = new Admin("Maria", "maria@gmail.com", "1010", "alto");

console.log(usuario1.autenticar("1234"));
console.log(usuario2.autenticar("1010"));
usuario2.banirUsuario(usuario1);
usuario1.alterarSenha("testesenha");
console.log(usuario1.autenticar("testesenha"));
