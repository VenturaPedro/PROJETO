const Sequelize = require('sequelize');

const sequelize = new Sequelize("projeto", "root", "123456", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){//Em produção, alterar as mensagens a seguir
    console.log("Conexão com banco de dados realizado com sucesso!")
}).catch(function(){
    console.log("Erro: Ocorreu um ERRO com a conexão com o banco de dados!")
})

module.exports = sequelize;