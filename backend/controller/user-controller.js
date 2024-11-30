const { Conflict, NotFound } = require('../helpers/api-custom-error');
const { to } = require('../helpers/async-handler');

const { newUser, checkUser } = require('../models/user-model');

const NewUserController = async (req, res, next) => {
    const { nome, email, password } = req.body;

    const { error } = await to(newUser(nome, email, password));

    if (error) {
        return error.code === 'ER_DUP_ENTRY'
            ? (next(new Conflict('Usuário já existente')))
            : (next(new NotFound('Erro ao inserir usuário')));
    }

    return res.status(201).json({ 'message': 'Usuário inserido ao banco!' });
}

const checkUserController = async (req, res, next) => {
    const { email, password } = req.body;

    const { error } = await to(checkUser(email, password));

    if (error) {
        return next(new NotFound('Usuário não encontrado.'))
    }

    return res.status(204).end();
}

module.exports = { NewUserController, checkUserController };