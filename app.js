const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const path = require('path');
const axios = require('axios');

// Configuração do mecanismo de visualização EJS
app.set('views', path.join(__dirname, 'frontend'));
app.set('view engine', 'ejs');

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'projeto'
});

//mensagem de conexão
db.connect(err => {
  if(err){
    console.error('Erro na conexão com o banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

//ROTAS DE GET

app.get("/", (req, res) => {
    res.redirect("/LOGIN.html");
});

app.get("/login", (req, res) => {   
    res.sendFile(__dirname + "/frontend/LOGIN.html");
});

app.get("/caixa", (req, res) => {
    res.sendFile(__dirname + "/frontend/statusCaixa.html");
});

app.get("/painel",(req, res) => {
    res.sendFile(__dirname + "/frontend/painel.html");
});

app.get("/cadastrar",(req, res) => {
    res.sendFile(__dirname + "/frontend/cadastros.html");z
});

app.post("/listar-clientes", (req, res) => {
    const termoBusca = req.body.filtro;
    const sql = `SELECT * FROM clientes WHERE status = "ATIVO" AND (nome LIKE '%${termoBusca}%' OR email LIKE '%${termoBusca}%' OR cpf LIKE '%${termoBusca}%' OR telefone LIKE '%${termoBusca}%')`;
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

app.get("/listar-clientes", (req, res) => {
    const sql = 'SELECT * FROM clientes WHERE status = "ATIVO"';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('telaPrincipal', { clientes: results });
        }
    });
});

app.get("/listar-clientes-inativos", (req, res) => {
    const sql = 'SELECT * FROM clientes WHERE status = "INATIVO"';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('telaPrincipal', { clientes: results });
        }
    });
});

app.post("/filtrar-atendentes", (req, res) => {
    const termoBusca = req.body.filtroAtd;
    const sql = `SELECT * FROM Atendente WHERE Nome LIKE '%${termoBusca}%' OR Email LIKE '%${termoBusca}%' OR Telefone LIKE '%${termoBusca}%' OR Observacoes LIKE '%${termoBusca}%'`;
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


app.get("/listar-atendentes", (req, res) => {
    const sql = 'SELECT * FROM Atendente';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('atendentes', { Atendente: results });
        }
    });
});

app.post("/filtrar-motoboys", (req, res) => {
    const termoBusca = req.body.filtroMotoboys;
    const sql = `SELECT * FROM Motoboy WHERE Nome LIKE '%${termoBusca}%' OR Email LIKE '%${termoBusca}%' OR Observacoes LIKE '%${termoBusca}%' OR Telefone LIKE '%${termoBusca}%'`;
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

app.get("/listar-motoboy", (req, res) => {
    const sql = 'SELECT * FROM Motoboy';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('motoboys', { Motoboy: results });
        }
    });
});

app.post("/filtrar-produtos", (req, res) => {
    const termoBusca = req.body.filtroProdutos;
    const sql = `SELECT * FROM produto WHERE nome LIKE '%${termoBusca}%' OR valor LIKE '%${termoBusca}%' OR descricao LIKE '%${termoBusca}%' OR estoque LIKE '%${termoBusca}%' OR categoria LIKE '%${termoBusca}%' OR fornecedor LIKE '%${termoBusca}%'`;
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

app.get("/listar-produtos", (req, res) => {
    const sql = 'SELECT * FROM produto';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('produtos', { produto: results });
        }
    });
});

app.post("/filtrar-estoques", (req, res) => {
    const termoBusca = req.body.filtroEstoque;
    const sql = `SELECT * FROM estoque WHERE produto LIKE '%${termoBusca}%' OR quantidade LIKE '%${termoBusca}%' OR preco_compra LIKE '%${termoBusca}%' OR preco_venda LIKE '%${termoBusca}%' OR data_validade LIKE '%${termoBusca}%' OR fornecedor LIKE '%${termoBusca}%' OR Observacoes LIKE '%${termoBusca}%'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        } else {
            console.log('Recuperação dos dados completa:');
            res.render('estoque', { estoque: results });
        }
    });
});

app.get("/listar-estoques", (req, res) => {
    const sql = 'SELECT * FROM estoque';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('estoque', { estoque: results });
        }
    });
});

app.post("/filtrar-membros", (req, res) => {
    const termoBusca = req.body.filtroMembros;
    const sql = `SELECT * FROM Membro WHERE Nome LIKE '%${termoBusca}%' OR Email LIKE '%${termoBusca}%' OR Observacoes LIKE '%${termoBusca}%' OR Telefone LIKE '%${termoBusca}%'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        } else {
            console.log('Recuperação dos dados completa:');
            res.render('membros', { Membro: results });
        }
    });
});

app.get("/listar-membros", (req, res) => {
    const sql = 'SELECT * FROM Membro';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('membros', { Membro: results });
        }
    });
});

app.post("/filtrar-categorias", (req, res) => {
    const termoBusca = req.body.filtroCategorias;
    const sql = `SELECT * FROM categoria WHERE Nome LIKE '%${termoBusca}%' OR Observacoes LIKE '%${termoBusca}%'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        } else {
            console.log('Recuperação dos dados completa:');
            res.render('categorias', { categoria: results });
        }
    });
});

app.get("/listar-categorias", (req, res) => {
    const sql = 'SELECT * FROM categoria';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('categorias', { categoria: results });
        }
    });
});



app.get("/listar-pagamentos", (req, res) => {
    const sql = 'SELECT * FROM pagamento';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('pagamentos', { pagamento: results });
        }
    });
});

app.post("/filtrar-despesas", (req, res) => {
    const termoBusca = req.body.filtroDespesas;
    const sql = `SELECT * FROM despesa WHERE Descricao LIKE '%${termoBusca}%' OR Lancamento LIKE '%${termoBusca}%' OR Valor LIKE '%${termoBusca}%' OR Vencimento LIKE '%${termoBusca}%' OR Tipo LIKE '%${termoBusca}%'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        } else {
            console.log('Recuperação dos dados completa:');
            res.render('despesas', { despesa: results });
        }
    });
});

app.get("/listar-despesas", (req, res) => {
    const sql = 'SELECT * FROM despesa';
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('despesas', { despesa: results });
        }
    });
});

app.get("/listar-pedidos", (req, res) => {
    const sql = `select PD.ID, 
                    PD.Data, 
                    CL.Nome Cliente, 
                    ATD.Nome Atendente,  
                    PG.Nome FormaPagamento, 
                    PD.valor_total, 
                    PD.status_pedido
                from pedido PD
                    left join clientes CL
                        on PD.CLIENTE_ID = CL.ID
                    left join atendente ATD
                        on PD.Atendente_ID = ATD.ID
                    left join pagamento PG
                        on PD.pagamento_ID = PG.ID;`;
    db.query(sql, (err, results) => {
        if(err){
            console.error('Erro ao recuperar dados:', err);
            res.send('Erro ao recuperar dados do banco de dados');
        }else{
            console.log('Recuperação dos dados completa:');
            res.render('telaPedidos', { pedidos: results });
        }
    });
});
  
app.get("/api/listar-categorias", (req, res) => {
    const sql = 'SELECT * FROM categoria';
    db.query(sql, (err, results) => {
        if(err){
            return res.send(err)
        }
        return res.send({ categorias: results })
    });
});

app.get("/api/listar-atendentes", (req, res) => {
    const sql = 'SELECT * FROM Atendente';
    db.query(sql, (err, results) => {
        if(err){
            return res.send(err)
        }
        return res.send({ Atendentes: results })
    });
});

app.get("/api/listar-clientes", (req, res) => {
    const sql = 'SELECT * FROM clientes WHERE status = "ATIVO"';
    db.query(sql, (err, results) => {
        if(err){
            return res.send(err)
        }
          return res.send({ clientes: results })
    });
});

app.get("/api/listar-pagamentos", (req, res) => {
    const sql = 'SELECT * FROM pagamento';
    db.query(sql, (err, results) => {
        if(err){
            return res.send(err)
        }
          return res.send({ pagamento: results })
    });
});

// Rota para listar os produtos
app.get("/api/listar-produtos", (req, res) => {
    const sql = 'SELECT id, nome FROM Produto';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar produtos:', err);
            res.status(500).json({ error: 'Erro ao recuperar produtos' });
        } else {
            res.status(200).json({ produtos: results });
        }
    });
});


app.get("/api/listar-estoques", (req, res) => {
    const sql = 'SELECT * FROM estoque';
    db.query(sql, (err, results) => {
        if(err){
            return res.send(err)
        }
          return res.send({ estoque: results })
    });
});

app.get("/api/listar-despesas", (req, res) => {
    const sql = 'SELECT * FROM despesa';
    db.query(sql, (err, results) => {
        if(err){
            return res.send(err)
        }
        return res.send({ despesa: results })
    });
});
//-------------------------------------------------------------------
app.use(express.static('frontend'))



app.get('/api/consultar-valor-produto/:id', async (req, res) => {
    const productId = req.params.id;

    // Consulta ao banco de dados para obter o valor e a quantidade do produto
    const query = 'SELECT estoque.preco_venda, estoque.quantidade FROM estoque JOIN produto ON produto.id = estoque.produto WHERE produto.id = ?';
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Erro ao consultar valor e quantidade do produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            console.log("results", results)
            // Verifica se o produto foi encontrado
            if (results.length > 0) {
                const { valor, quantidade } = results[0];
                res.json({ valor, quantidade });
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        }
    });
});

module.exports = app;



app.post("/api/salvar-pedido", async (req, res) => {
    let insertedPedidoId = 0;
    let valorTotalPedido = 0;
    const { atendenteId, clienteId, itemsPedido, formaPagamentoId, valor_total } = req.body;

    const insertPedido = `INSERT INTO PEDIDO 
            (Data, Atendente_ID, CLIENTE_ID, pagamento_ID, valor_total, status_pedido) 
        VALUES 
            (NOW(), ?, ?, ?, ?, ?)`;
    const promiseInsertPedido = new Promise((resolve, reject) => {
        db.query(insertPedido, [atendenteId, clienteId, formaPagamentoId, 0.00, "Aberto"], (err, results) => {
            if(err){
                reject(err);
            }else{
                insertedPedidoId = results.insertId;
                resolve();
            }
        });
    });

    const promiseInsertProdutosPedido = new Promise((resolve, reject) => {
        const promises = itemsPedido.map((produtoPedido) => {
            const selectValorProduto = 'SELECT valor FROM estoque WHERE id = ' + preco_venda.id;

            return new Promise((resolve, reject) => {
                db.query(selectValorProduto, (err, results) => {
                    if(err){
                        reject(err);
                    }else{
                        const firstResult = results && results.length > 0 ? results[0] : null;
                        const valor = firstResult ? firstResult.valor : 0;
                        resolve(valor);
                    }
                });
            });
        });

        Promise.all(promises)
            .then((valoresProdutos) => {
                const promiseInsertProdutos = valoresProdutos.map((valorProduto, index) => {
                    const produtoPedido = itemsPedido[index];
                    const valorTotalProduto = isNaN(valorProduto) ? 0 : valorProduto * produtoPedido.quantidade;
                    valorTotalPedido += valorTotalProduto;
                    const insertProdutosPedido = `INSERT INTO PRODUTOS_PEDIDO 
                            (QUANTIDADE, PEDIDO_ID, PRODUTO_ID, VALOR_TOTAL) 
                        VALUES 
                            (?, ?, ?, ?)`;

                    return new Promise((resolve, reject) => {
                        db.query(insertProdutosPedido, [produtoPedido.quantidade, insertedPedidoId, produtoPedido.id, valorTotalProduto], (err, result) => {
                            if(err){
                                reject(err);
                            }else{
                                console.log('Dados inseridos com sucesso', result);
                                resolve();
                            }
                        });
                    });
                });
                return Promise.all(promiseInsertProdutos);
            })
            .then(() => {
                const sql = 'UPDATE pedido SET valor_total = ? WHERE ID = ?;';
                db.query(sql, [ valorTotalPedido, insertedPedidoId], (err, result) => {
                    if(err){
                        console.error('Erro ao inserir dados:', err);
                    }else{
                        console.log('Dados inseridos com sucesso');
                    }
                });
                resolve();
            })
            .catch((err) => {
                reject(err); 
            });
    });

    Promise.all([promiseInsertPedido, promiseInsertProdutosPedido])
    .then(() => {
        console.log("insertedPedidoId", insertedPedidoId);

        // Atualizar o estoque para cada produto vendido
        const promiseAtualizarEstoque = itemsPedido.map((produtoPedido) => {
            return new Promise((resolve, reject) => {
                const updateEstoque = 'UPDATE estoque SET quantidade = quantidade - ? WHERE produto_id = ?';
                db.query(updateEstoque, [produtoPedido.quantidade, produtoPedido.id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Estoque atualizado com sucesso para o produto', produtoPedido.id);
                        resolve();
                    }
                });
            });
        });

        // Verificar se há estoque suficiente para cada produto
        const promiseVerificarEstoque = itemsPedido.map((produtoPedido) => {
            return new Promise((resolve, reject) => {
                const selectEstoque = 'SELECT quantidade FROM estoque WHERE produto_id = ?';
                db.query(selectEstoque, [produtoPedido.id], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        const quantidadeDisponivel = results && results.length > 0 ? results[0].quantidade : 0;
                        if (quantidadeDisponivel < produtoPedido.quantidade) {
                            reject('Estoque insuficiente para o produto ' + produtoPedido.id);
                        } else {
                            resolve();
                        }
                    }
                });
            });
        });

        // Executar as promessas em paralelo
        return Promise.all([...promiseAtualizarEstoque, ...promiseVerificarEstoque]);
    })
    .then(() => {
        res.json({ 
            idPedido: insertedPedidoId,
            valorTotalPedido
        });
    })
    .catch((err) => {
        console.error('Erro ao processar pedido:', err);
        res.status(400).send('Erro ao processar o pedido: ' + err);
    });

        
});


// app.post("/login", async (req, res) => {
//     const username = req.body.usernameInput;
//     const password = req.body.passwordInput;

//     async function validateUser(username, password) {
//         const sql = 'SELECT * FROM usuarios WHERE username = ?';
//         return new Promise((resolve, reject) => {
//             db.query(sql, [username], async (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     if (results.length > 0) {
//                         const user = results[0];

//                         console.log('Senha informada:', password);
//                         console.log('Senha armazenada no banco de dados:', user.password);

//                         // Comparação direta das senhas
//                         const passwordMatch = password === user.password;

//                         console.log('Comparação de senha:', passwordMatch);

//                         resolve(passwordMatch ? user : null);
//                     } else {
//                         resolve(null);
//                     }
//                 }
//             });
//         });
//     }

//     try{
//         const user = await validateUser(username, password);

//         if(user){
//             res.redirect('/painel.html');
//         }else{
//             res.status(401).send('Nome de usuário ou senha incorretos.');
//         }
//     }catch(error){
//         console.error('Erro ao validar usuário:', error);
//         res.status(500).send('Erro ao processar a solicitação.');
//     }
// });

app.post("/login", async (req, res) => {
    const username = req.body.usernameInput;
    const password = req.body.passwordInput;

    async function validateUser(username, password) {
        // Verifica na tabela admin
        const sqlAdmin = 'SELECT * FROM adm WHERE Nome = ?';
        const admin = await queryDatabase(sqlAdmin, username, password);

        // Verifica na tabela Atendente
        const sqlAtendente = 'SELECT * FROM Atendente WHERE Nome = ?';
        const atendente = await queryDatabase(sqlAtendente, username, password);

        // Verifica na tabela Motoboy
        const sqlMotoboy = 'SELECT * FROM Motoboy WHERE Nome = ?';
        const motoboy = await queryDatabase(sqlMotoboy, username, password);

        // Verifica na tabela Membro
        const sqlMembro = 'SELECT * FROM Membro WHERE Nome = ?';
        const membro = await queryDatabase(sqlMembro, username, password);

        // Retorna o usuário se encontrado em uma das tabelas
        return admin || atendente || motoboy || membro;
    }

    async function queryDatabase(sql, username, password) {
        return new Promise((resolve, reject) => {
            db.query(sql, [username], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    if(results.length > 0){
                        const user = results[0];
                        // Verifica se a senha está correta
                        const userPassword = user && user.Senha ? user.Senha.toLowerCase() : null;
                        const passwordMatch = userPassword === password.toLowerCase();
                        if(passwordMatch){
                            resolve(user);
                        }else{
                            resolve(null);
                        }
                    }else{
                        resolve(null);
                    }
                }
            });
        });
    }
    try{
        const user = await validateUser(username, password);
        if(user){
            res.redirect('/painel.html');
        }else{
            res.status(401).send('Nome de usuário ou senha incorretos.');
        }
    }catch(error){
        console.error('Erro ao validar usuário:', error);
        res.status(500).send('Erro ao processar a solicitação.');
    }
});



app.post("/excluir-cliente", (req, res) => {
    const clienteId = req.body.clienteId; 
    const sql = 'UPDATE clientes SET status = "INATIVO" WHERE id = ?';

    db.query(sql, [clienteId], (err, result) => {
        if(err){
            console.error('Erro ao modificar status do cliente:', err);
            res.sendStatus(500).send('Erro ao modificar status do cliente no banco de dados');
        }else{
            console.log(`Status do cliente ${clienteId} modificado para INATIVO com sucesso`);
            res.sendStatus(200).send(`Status do cliente ${clienteId} modificado para INATIVO com sucesso`);
        }
    });
});

app.post("/ativar-cliente", (req, res) => {
    const clienteId = req.body.clienteId; 
    const sql = 'UPDATE clientes SET status = "ATIVO" WHERE id = ?';

    db.query(sql, [clienteId], (err, result) => {
        if(err){
            console.error('Erro ao modificar status do cliente:', err);
            res.sendStatus(500).send('Erro ao modificar status do cliente no banco de dados');
        }else{
            console.log(`Status do cliente ${clienteId} modificado para ATIVO com sucesso`);
            res.sendStatus(200).send(`Status do cliente ${clienteId} modificado para ATIVO com sucesso`);
        }
    });
});


app.post("/excluir-atendente", (req, res) => {
    const atendenteId = req.body.atendenteId; 
    const sql = 'DELETE FROM Atendente WHERE id = ?';
    db.query(sql, [atendenteId], (err, result) => {
        if(err){
            console.error('Erro ao excluir atendente:', err);
            res.sendStatus(500).send('Erro ao excluir atendente do banco de dados');
        }else{;
            console.log('Atendente excluído com sucesso');
            res.sendStatus(200).send(`Atendente ${atendenteId} excluído com sucesso `);
        }
    });
});

app.post("/excluir-motoboy", (req, res) => {
    const motoboyId = req.body.motoboyId; 
    const sql = 'DELETE FROM Motoboy WHERE id = ?';
    db.query(sql, [motoboyId], (err, result) => {
        if(err){
            console.error('Erro ao excluir motoboy:', err);
            res.status(500).send('Erro ao excluir motoboy do banco de dados');
        }else{;
            console.log('Motoboy excluído com sucesso');
            res.status(200).send(`Motoboy ${motoboyId} excluído com sucesso `);
        }
    });
});

app.post("/excluir-produto", (req, res) => {
    const produtoId = req.body.produtoId;

    const deleteProdutosPedido = 'DELETE FROM produtos_pedido WHERE PRODUTO_ID = ?';

    db.query(deleteProdutosPedido, [produtoId], (err, result) => {
        if(err){
            console.error('Erro ao excluir produtos_pedido:', err);
            res.status(500).send('Erro ao excluir produtos_pedido do banco de dados');
        }else{
            const deleteProduto = 'DELETE FROM produto WHERE id = ?';
            db.query(deleteProduto, [produtoId], (err, result) => {
                if(err){
                    console.error('Erro ao excluir Produto:', err);
                    res.status(500).send('Erro ao excluir Produto do banco de dados');
                }else{
                    console.log('Produto excluido com sucesso');
                    res.status(200).send(`Produto ${produtoId} excluído com sucesso `);
                }
            });
        }
    });
});

app.post("/excluir-membro", (req, res) => {
    const membroId = req.body.membroId; 
    const sql = 'DELETE FROM Membro WHERE id = ?';
    db.query(sql, [membroId], (err, result) => {
        if(err){
            console.error('Erro ao excluir membro:', err);
            res.status(500).send('Erro ao excluir membro do banco de dados');
        }else{;
            console.log('Membro excluído com sucesso');
            res.status(200).send(`Membro ${membroId} excluído com sucesso `);
        }
    });
});

app.post("/excluir-categoria", (req, res) => {
    const categoriaId = req.body.categoriaId; 
    const sql = 'DELETE FROM categoria WHERE id = ?';
    db.query(sql, [categoriaId], (err, result) => {
        if(err){
            console.error('Erro ao excluir categoria:', err);
            res.status(500).send('Erro ao excluir categoria do banco de dados');
        }else{;
            console.log('Categoria excluído com sucesso');
            res.status(200).send(`Categoria ${categoriaId} excluído com sucesso `);
        }
    });
});

app.post("/excluir-pagamento", (req, res) => {
    const pagamentoId = req.body.pagamentoId; 
    const sql = 'DELETE FROM pagamento WHERE id = ?';
    db.query(sql, [pagamentoId], (err, result) => {
        if(err){
            console.error('Erro ao excluir pagamento:', err);
            res.status(500).send('Erro ao excluir pagamento do banco de dados');
        }else{;
            console.log('Pagamento excluído com sucesso');
            res.status(200).send(`Pagamento ${pagamentoId} excluído com sucesso `);
        }
    });
});


app.post("/excluir-despesa", (req, res) => {
    const despesaId = req.body.despesaId; 
    const sql = 'DELETE FROM despesa WHERE id = ?';
    db.query(sql, [despesaId], (err, result) => {
        if(err){
            console.error('Erro ao excluir despesa:', err);
            res.status(500).send('Erro ao excluir despesa do banco de dados');
        }else{;
            console.log('Despesa excluído com sucesso');
            res.status(200).send(`Despesa ${despesaId} excluído com sucesso `);
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
    if(err){
      console.error('Erro ao inserir dados:', err);
      res.send('Erro ao cadastrar dados no banco de dados');
    }else{
      console.log('Dados inseridos com sucesso');
      res.sendFile(__dirname + "/frontend/cadastros.html");
    }
  });
});

app.post("/editar-cadastro-cliente", (req, res) => {
    const clienteId = req.body.clienteId;
    const { novoNome, novoEmail, novoCpf, novoTelefone, 
        novoLogradouro, novaCidade, novoComplemento, 
        novoNumero, novoEstado, novoCep 
    } = req.body;
        
    const sql = 'UPDATE clientes SET nome=?, email=?, cpf=?, telefone=?, logradouro=?, cidade=?, complemento=?, numero=?, estado=?, cep=? WHERE id=?';
    db.query(sql, [ novoNome, novoEmail, novoCpf, novoTelefone, novoLogradouro, novaCidade, novoComplemento, novoNumero, 
        novoEstado, novoCep, clienteId], async (err, result) => {
      if(err){
        console.error('Erro ao atualizar dados:', err);
        res.sendStatus('Erro ao atualizar dados no banco de dados');
      }else{
        console.log('Dados atualizados com sucesso');

        res.sendStatus(200);
      }
    });
});


app.post("/editar-cadastro-atendente", (req, res) => {
    const atendenteId = req.body.atendenteId;
    const { novoNomeAtd, novoEmailAtd, novoTelefoneAtd, novoObsAtd,
    } = req.body;
        
    const sql = 'UPDATE atendente SET Nome=?, Email=?, Telefone=?, Observacoes=? WHERE id=?';
    db.query(sql, [ novoNomeAtd, novoEmailAtd, novoTelefoneAtd, novoObsAtd, atendenteId], async (err, result) => {
      if(err){
        console.error('Erro ao atualizar dados:', err);
        res.sendStatus('Erro ao atualizar dados no banco de dados');
      }else{
        console.log('Dados atualizados com sucesso');

        res.sendStatus(200);
      }
    });
});


// app.post("/processar-cadastro-atendente", (req, res) => {
// const { nomeAtendente, emailAtendente, obsAtendente} = req.body;

// const sql = 'INSERT INTO Atendente (Nome, Email, Observacoes) VALUES (?, ?, ?)';
// db.query(sql, [nomeAtendente, emailAtendente, obsAtendente], (err, result) => {
//     if(err){
//     console.error('Erro ao inserir dados:', err);
//     res.send('Erro ao cadastrar dados no banco de dados');
//     }else{
//     console.log('Dados inseridos com sucesso');
//     res.sendFile(__dirname + "/frontend/cadastros.html");
//     }
// });
// });

app.post("/processar-cadastro-atendente", (req, res) => {
    const { nomeAtendente, emailAtendente, telefoneAtendente, senhaAtendente, confirmarSenhaAtendente, obsAtendente } = req.body;
    const papelAtendente = 2; // Papel fixo para atendente

    if(senhaAtendente !== confirmarSenhaAtendente) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
    } 

    const sql = 'INSERT INTO Atendente (Nome, Email, Telefone, Senha, Observacoes, Role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nomeAtendente, emailAtendente, telefoneAtendente, senhaAtendente, obsAtendente, papelAtendente], (err, result) => {
        if(err){
            console.error('Erro ao inserir dados:', err);
            res.send('Erro ao cadastrar dados no banco de dados');
        }else{
            console.log('Dados inseridos com sucesso');
            res.sendFile(__dirname + "/frontend/cadastros.html");
        }
    });
});

// app.post("/processar-cadastro-motoboy", (req, res) => {
//     const { nomeMotoboy, emailMotoboy, obsMotoboy} = req.body;
    
//     const sql = 'INSERT INTO Motoboy (Nome, Email, Observacoes) VALUES (?, ?, ?)';
//     db.query(sql, [ nomeMotoboy, emailMotoboy, obsMotoboy], (err, result) => {
//         if(err){
//         console.error('Erro ao inserir dados:', err);
//         res.send('Erro ao cadastrar dados no banco de dados');
//         }else{
//         console.log('Dados inseridos com sucesso');
//         res.sendFile(__dirname + "/frontend/cadastros.html");
//         }
// });
// });

app.post("/processar-cadastro-motoboy", (req, res) => {
    const { nomeMotoboy, emailMotoboy, telefoneMotoboy, senhaMotoboy, confirmarSenhaMotoboy, obsMotoboy } = req.body;
    const papelMotoboy = 3; // Papel fixo para motoboy

    if(senhaMotoboy !== confirmarSenhaMotoboy) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
    } 

    const sql = 'INSERT INTO Motoboy (Nome, Email, Telefone, Senha, Observacoes, Role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nomeMotoboy, emailMotoboy, telefoneMotoboy, senhaMotoboy, obsMotoboy, papelMotoboy], (err, result) => {
        if(err){
            console.error('Erro ao inserir dados:', err);
            res.send('Erro ao cadastrar dados no banco de dados');
        }else{
            console.log('Dados inseridos com sucesso');
            res.sendFile(__dirname + "/frontend/cadastros.html");
        }
    });
});


// app.post("/processar-cadastro-membro", (req, res) => {  
//     const { nomeMembro, emailMembro, obsMembro} = req.body;
    
//     const sql = 'INSERT INTO Membro (Nome, Email, Observacoes) VALUES (?, ?, ?)';
//     db.query(sql, [ nomeMembro, emailMembro, obsMembro], (err, result) => {
//         if(err){
//         console.error('Erro ao inserir dados:', err);
//         res.send('Erro ao cadastrar dados no banco de dados');
//         }else{
//         console.log('Dados inseridos com sucesso');
//         res.sendFile(__dirname + "/frontend/cadastros.html");
//         }
// });
// });

app.post("/processar-cadastro-membro", (req, res) => {
    const { nomeMembro, emailMembro, telefoneMembro, senhaMembro, confirmarSenhaMembro, obsMembro } = req.body;
    const papelMembro = 4; // Papel fixo para membro

    if(senhaMembro !== confirmarSenhaMembro) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
    } 

    const sql = 'INSERT INTO Membro (Nome, Email, Telefone, Senha, Observacoes, Role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nomeMembro, emailMembro, telefoneMembro, senhaMembro, obsMembro, papelMembro], (err, result) => {
        if(err){
            console.error('Erro ao inserir dados:', err);
            res.send('Erro ao cadastrar dados no banco de dados');
        }else{
            console.log('Dados inseridos com sucesso');
            res.sendFile(__dirname + "/frontend/cadastros.html");
        }
    });
});


app.post("/processar-cadastro-categoria", (req, res) => {  
    const { nomeCategoria, obsCategoria} = req.body;
    
    const sql = 'INSERT INTO Categoria (Nome, Observacoes) VALUES (?, ?)';
    db.query(sql, [ nomeCategoria, obsCategoria], (err, result) => {
        if(err){
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
        }else{
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/cadastros.html");
        }
});
});

app.post("/processar-cadastro-pagamento", (req, res) => {  
    const { nomePagamento, obsPagamento} = req.body;
    
    const sql = 'INSERT INTO Pagamento (Nome, Observacoes) VALUES (?, ?)';
    db.query(sql, [ nomePagamento, obsPagamento], (err, result) => {
        if(err){
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
        }else{
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/cadastros.html");
        }
});
});



app.post("/processar-cadastro-produto",(req, res) => {
    const { nomeProduto, descricaoProduto, categoriaProduto} = req.body;
    
    const sql = 'INSERT INTO produto (nome, descricao, estoque, categoria, fornecedor) VALUES (?, ?, ?)';
    db.query(sql, [ nomeProduto, descricaoProduto, categoriaProduto], (err, result) => {
        if(err){
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
        }else{
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/cadastros.html");
        }
});
});

app.post("/processar-cadastro-estoque", (req, res) => {
    const { produto, quantidade, valorCompra, valorVenda, dataValidade, fornecedor, obsEstoque} = req.body;
    
    const sql = 'INSERT INTO estoque (produto, quantidade, preco_compra, preco_venda, data_validade, fornecedor, Observacoes) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ produto, quantidade, valorCompra, valorVenda, dataValidade, fornecedor, obsEstoque], (err, result) => {
        if(err){
        console.error('Erro ao inserir dados:', err);
        res.send('Erro ao cadastrar dados no banco de dados');
        }else{
        console.log('Dados inseridos com sucesso');
        res.sendFile(__dirname + "/frontend/prod-estoq.html");
        }
});
});


app.post("/processar-cadastro-despesa", (req, res) => {  
    const { descricaoDespesa, lancamentoDespesa, valorDespesa, vencimentoDespesa, tipoDespesa, obsDespesa} = req.body;
    
    const sql = 'INSERT INTO Despesa(Descricao, Lancamento, Valor, Vencimento, Tipo, Observacao) VALUES (?,?,?,?,?,?)';
    db.query(sql, [ descricaoDespesa, lancamentoDespesa, valorDespesa, vencimentoDespesa, tipoDespesa, obsDespesa], (err, result) => {
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
app.listen(80, () => {
  console.log("Servidor Iniciado na porta 80: http://localhost:80");
});
// ------------------------------------------------------------------