const connection = require('./connection');

const newUser = async (nome, email, password) => {
    const [result] = await connection.execute(
        `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?,?)
        `,
        [nome, email, password]
    );

    if (result.affectedRows === 0) {
        throw new Error('Erro ao inserir o usuário.');
    };

    return result;
};

const checkUser = async (email, password) => {
    const [result] = await connection.execute(
        `
        SELECT 
            email
        FROM 
            usuarios
        WHERE 
            email = ? AND senha = ?;
        `,
        [email, password]
    );

    if (result.length === 0) {
        throw new Error('Usuário não encontrado.');
    }

    return result;
};


module.exports = { newUser, checkUser };