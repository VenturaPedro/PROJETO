const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'projeto'
});

db.connect(err => {
  if (err) {
    console.error('Erro na conexão com o banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

app.get("/", (req, res) => {
  res.send("Página Inicial");
});

app.post("/cadastrar", (req, res) => {
  const { nome, email, cpf, telefone } = req.body;

  const sql = 'INSERT INTO clientes (nome, email, cpf, telefone) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, email, cpf, telefone], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.send('Erro ao cadastrar dados no banco de dados');
    } else {
      console.log('Dados inseridos com sucesso');
      res.send('Dados cadastrados com sucesso');
    }
  });
});

app.listen(8080, () => {
  console.log("Servidor Iniciado na porta 8080: http://localhost:8080");
});
