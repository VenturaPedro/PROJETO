const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

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

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/frontend/LOGIN.html");;
   
// });

app.get("/", (req, res) => {
    res.redirect("/listar-clientes");
   
});

app.get("/LOGIN", (req, res) => {   
    res.sendFile(__dirname + "/");
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

app.get("/listar-atendentes", (req, res) => {
    const sql = 'SELECT * FROM Atendente';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao recuperar dados:', err);
        res.send('Erro ao recuperar dados do banco de dados');
      } else {
        console.log('Recuperação dos dados completa:');
        res.render('atendentes', { Atendente: results });
      }
    });
});

app.get("/listar-motoboy", (req, res) => {
    const sql = 'SELECT * FROM Motoboy';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao recuperar dados:', err);
        res.send('Erro ao recuperar dados do banco de dados');
      } else {
        console.log('Recuperação dos dados completa:');
        res.render('motoboys', { Motoboy: results });
      }
    });
});

app.get("/listar-produtos", (req, res) => {
    const sql = 'SELECT * FROM produto';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao recuperar dados:', err);
        res.send('Erro ao recuperar dados do banco de dados');
      } else {
        console.log('Recuperação dos dados completa:');
        res.render('produtos', { produto: results });
      }
    });
});


  

//-------------------------------------------------------------------
app.use(express.static('frontend'))


//ROTAS POST

app.post("/excluir-cliente", (req, res) => {
    const clienteId = req.body.clienteId; 
    const sql = 'DELETE FROM clientes WHERE id = ?';
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

app.post("/excluir-atendente", (req, res) => {
    const atendenteId = req.body.atendenteId; 
    const sql = 'DELETE FROM Atendente WHERE id = ?';
    db.query(sql, [atendenteId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir atendente:', err);
            res.status(500).send('Erro ao excluir atendente do banco de dados');
        } else {;
            console.log('Atendente excluído com sucesso');
            res.status(200).send(`Atendente ${atendenteId} excluído com sucesso `);
        }
    });
});

app.post("/excluir-motoboy", (req, res) => {
    const motoboyId = req.body.motoboyId; 
    const sql = 'DELETE FROM Motoboy WHERE id = ?';
    db.query(sql, [motoboyId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir motoboy:', err);
            res.status(500).send('Erro ao excluir motoboy do banco de dados');
        } else {;
            console.log('Motoboy excluído com sucesso');
            res.status(200).send(`Motoboy ${motoboyId} excluído com sucesso `);
        }
    });
});

app.post("/excluir-produto", (req, res) => {
    const produtoId = req.body.produtoId; 
    const sql = 'DELETE FROM produto WHERE id = ?';
    db.query(sql, [produtoId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir Produto:', err);
            res.status(500).send('Erro ao excluir Produto do banco de dados');
        } else {;
            console.log('Produto excluído com sucesso');
            res.status(200).send(`Produto ${produtoId} excluído com sucesso `);
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
      
    }
  });
});
app.post("/editar-cliente/:id", (req, res) => {
    const clienteId = req.params.id;
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    db.query(sql, [clienteId], (err, result) => {
        if (err) {
            console.error('Erro ao recuperar dados do cliente para edição:', err);
            res.status(500).send('Erro ao recuperar dados do cliente para edição');
        } else {
            if (result.length === 0) {
                res.status(404).send('Cliente não encontrado');
            } else {
                const cliente = result[0];
                res.render('editarCliente', { cliente }); // Corrigir o nome da view aqui
            }
        }
    });
});
app.post("/editar-cadastro-cliente", (req, res) => {
    const clienteId = req.body.clienteId;
    const { nomeClienteEditado, emailClienteEditado, cpfClienteEditado, telefoneClienteEditado, 
          logradouroClienteEditado, cidadeClienteEditado, complementoClienteEditado, numeroClienteEditado, 
          estadoClienteEditado, cepClienteEditado } = req.body;
  
    const sql = 'UPDATE INTO clientes (nome, email, cpf, telefone, logradouro, cidade, complemento, numero, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ?';
    db.query(sql, [ nomeClienteEditado, emailClienteEditado, cpfClienteEditado, telefoneClienteEditado, logradouroClienteEditado, cidadeClienteEditado, complementoClienteEditado, numeroClienteEditado, 
      estadoClienteEditado, cepClienteEditado], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
      } else {
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/cadastros.html");
        
      }
    });
  });


app.post("/processar-cadastro-atendente", (req, res) => {
const { nomeAtendente, emailAtendente, obsAtendente} = req.body;

const sql = 'INSERT INTO Atendente (Nome, Email, Observacoes) VALUES (?, ?, ?)';
db.query(sql, [ nomeAtendente, emailAtendente, obsAtendente], (err, result) => {
    if (err) {
    console.error('Erro ao inserir dados:', err);
    res.send('Erro ao cadastrar dados no banco de dados');
    } else {
    console.log('Dados inseridos com sucesso');
    res.sendFile(__dirname + "/frontend/cadastros.html");
    
    }
});
});

app.post("/processar-cadastro-motoboy", (req, res) => {
    const { nomeMotoboy, emailMotoboy, obsMotoboy} = req.body;
    
    const sql = 'INSERT INTO Motoboy (Nome, Email, Observacoes) VALUES (?, ?, ?)';
    db.query(sql, [ nomeMotoboy, emailMotoboy, obsMotoboy], (err, result) => {
        if(err){
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
        }else{
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/cadastros.html");
        }
});
});

app.post("/processar-cadastro-produto", (req, res) => {
    const { nomeProduto, valorProduto, descricaoProduto, estoqueProduto, categoriaProduto, fornecedorProduto} = req.body;
    
    const sql = 'INSERT INTO produto (nome, valor, descricao, estoque, categoria, fornecedor) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [ nomeProduto, valorProduto, descricaoProduto, estoqueProduto, categoriaProduto, fornecedorProduto], (err, result) => {
        if(err){
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
        }else{
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/cadastros.html");
        }
});
});

//MENSAGEM STATUS CONEXÃO
app.listen(8080, () => {
  console.log("Servidor Iniciado na porta 8080: http://localhost:8080");
});


// ------------------------------------------------------------------