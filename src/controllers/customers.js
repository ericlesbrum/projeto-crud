const CustumersModel = require('../models/customers');
const { crypto } = require('../utils/password');
const defaultTitle = 'Cadastro de clientes';
function index(req, res) {
    res.render('register', {
        title: defaultTitle
    })
}
async function add(req, res) {
    const {
        name,
        age,
        email,
        password
    } = req.body;

    const passwordCrypto = await crypto(password);
    const register = new CustumersModel({
        name,
        age,
        email,
        password: passwordCrypto,
    })
    register.save()
    res.render('register', {
        title: defaultTitle,
        message: 'Cadastro realizado com sucesso'
    });
}
async function edit(req, res) {
    const {
        name,
        age,
        email,
    } = req.body;
    const { id } = req.params;
    const user = await CustumersModel.findById(id);
    user.name = name;
    user.age = age;
    user.email = email;
    user.save();
    res.render('edit', {
        title: 'Editar Usuário',
        user,
        message: 'Usuario alterado com sucesso!'
    })
}
async function indexEdit(req, res) {
    const { id } = req.query;
    const user = await CustumersModel.findById(id);
    res.render('edit', {
        title: 'Editar Usuário',
        user
    })
}
async function listUsers(req, res) {
    const users = await CustumersModel.find();
    res.render('listUsers', {
        title: 'Listagem de usuarios',
        users
    })
}
async function remove(req, res) {
    const { id } = req.params;
    const _remove = await CustumersModel.deleteOne({ _id: id });
    res.redirect('/list');
}
module.exports = {
    index,
    add,
    listUsers,
    indexEdit,
    edit,
    remove
}