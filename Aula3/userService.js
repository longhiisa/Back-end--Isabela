const User = require("./user.js");

const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require("./mysql");

class UserService {

    async addUser(nome, email, senha, endereço, cpf, telefone) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `INSERT INTO usuario (nome, email, senha, endereço, cpf, telefone)
                 VALUES (?, ?, ?, ?, ?, ?);`,
                [nome, email, senhaCripto, endereço, cpf, telefone]
            );
            return resultados;

        } catch (erro) {
            console.log("Falha ao criar um usuário!", erro);
            throw erro;
        }
    }

    async getUsers(id) {
        try {
            const resultado = await mysql.execute(
                `SELECT idusuario FROM usuario WHERE idusuario = ?`,
                [id]
            );
            console.log("resultado", resultado)
            return resultado;
        }
        catch (erro) {
            console.log("Falha ao buscar os usuários.", erro);
            return;
        }
    }

    async deleteUser(id) {
        try {
            const resultado = await this.getUsers(id);

            if (resultado.length == 0) {
                return resultado; 
            }
            const resultado = await mysql.execute (
                `DELETE FROM usuarios WHERE idusuario = ?`,
                [id]
            )
            return res.status(200).json(resultado);

        } catch (error) {
            console.log('Erro ao deletar usuario', error);
        }
    }
    async updateUser(id, nome, email, senha, endereço, cpf, telefone) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `UPDATE usuario 
                 SET nome = ?, email = ?, senha = ?, endereço = ?, cpf = ?, telefone = ? 
                 WHERE idusuario = ?;`,
                [nome, email, senhaCripto, endereço, cpf, telefone, id]
            );

            return {
                mensagem: "Usuário atualizado com sucesso!",
                resultados
            };

        } catch (erro) {
            console.log("Erro ao atualizar o usuário", erro);
            throw erro;
        }
    }
}

module.exports = new UserService();
