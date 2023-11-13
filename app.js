const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

// Configuração do mecanismo de visualização EJS
app.set('views', path.join(__dirname, 'frontend'));
app.set('view engine', 'ejs');


//conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'projeto'
});


//mensagem de conexão
db.connect(err => {
  if (err) {
    console.error('Erro na conexão com o banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});


//ROTAS DE GET

app.get("/", (req, res) => {
    res.redirect("/listar-clientes");
   
});
    

app.get("/LOGIN", (req, res) => {   
    res.sendFile(__dirname + "/frontend/LOGIN.html");
});

app.get("/caixa", (req, res) => {
    res.sendFile(__dirname + "/frontend/statusCaixa.html");
});

app.get("/painel",(req, res) => {
    res.sendFile(__dirname + "/frontend/painel.html");
});

app.get("/cadastrar",(req, res) => {
  res.sendFile(__dirname + "/frontend/cadastros.html");
});

app.get("/listar-clientes", (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao recuperar dados:', err);
        res.send('Erro ao recuperar dados do banco de dados');
      } else {
        console.log('Recuperação dos dados completa:');
        res.render('telaPrincipal', { clientes: results });
      }
    });
  });
  

//-------------------------------------------------------------------
app.use(express.static('frontend'))


//ROTAS POST


// Adicione ao seu código do servidor
app.post("/excluir-cliente", (req, res) => {
    const clienteId = req.body.clienteId; // Certifique-se de enviar o ID do cliente do frontend
    
    const sql = 'DELETE FROM clientes WHERE id = "13"';
    db.query(sql, [clienteId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir cliente:', err);
            res.status(500).send('Erro ao excluir cliente do banco de dados');
        } else {;
            console.log('Cliente excluído com sucesso');
            res.status(200).send(`Cliente ${clienteId} excluído com sucesso `);
        }
    });
});



app.post("/processar-cadastro-cliente", (req, res) => {
  const { nomeCliente, emailCliente, cpfCliente, telefoneCliente, 
        logradouroCliente, cidadeCliente, complementoCliente, numeroCliente, 
        estadoCliente, cepCliente } = req.body;

  const sql = 'INSERT INTO clientes (nome, email, cpf, telefone, logradouro, cidade, complemento, numero, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [ nomeCliente, emailCliente, cpfCliente, telefoneCliente, logradouroCliente, cidadeCliente, complementoCliente, numeroCliente, 
    estadoCliente, cepCliente], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.send('Erro ao cadastrar dados no banco de dados');
    } else {
      console.log('Dados inseridos com sucesso');
      res.sendFile(__dirname + "/frontend/cadastros.html");
      return res.status(200).json("Usuário criado com sucesso")
    }
  });
});


//MENSAGEM STATUS CONEXÃO
app.listen(8080, () => {
  console.log("Servidor Iniciado na porta 8080: http://localhost:8080");
});


// ------------------------------------------------------------------