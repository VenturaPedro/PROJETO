let items = [];
let itemsPedido = [];

document.getElementById("novo-pedido").addEventListener("click", function() {
    document.getElementById("modal-pedido").style.display = "block";

    preencherCliente();
    preencherItens();
    preencherFormaPagamento(); 
});
function fecharPopupPedido() {
    document.getElementById("modal-pedido").style.display = "none";
    window.location.reload();
}

function filterItems(query) {
    return items.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
}

function updateSearchResults(results) {
    const searchResults = document.getElementById("resultadoBusca");
    searchResults.innerHTML = "";

    results.forEach(result => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = result.nome;
        listItem.onclick = () => addToTable(result);
        searchResults.appendChild(listItem);
    });
}

function buscarItens() {
    const searchInput = document.getElementById("inputBusca");
    const query = searchInput.value.trim();

    if (query.length >= 3) {
        const filteredItems = filterItems(query);
        console.log("filteredItems", filteredItems)
        updateSearchResults(filteredItems);
    } else {
        const searchResults = document.getElementById("resultadoBusca");
        searchResults.innerHTML = "";
    }
}
async function addToTable(item) {
    try {
        const response = await axios.get(`/api/consultar-valor-produto/${item.id}`);
        const { valor, quantidade } = response.data;
        console.log(response.data);
        const quantidadeItens = document.getElementById("quantidadeItens").value.length > 0
            ? parseInt(document.getElementById("quantidadeItens").value)
            : 1;

        // Verifica se a quantidade disponível no estoque é suficiente
        if (quantidade < quantidadeItens) {
            alert("Quantidade selecionada excede a quantidade disponível no estoque.");
            return;
        }

        const selectedItemsTable = document.getElementById("itensSelecionados");
        const newRow = selectedItemsTable.insertRow();
        const celulaId = newRow.insertCell(0);
        celulaId.textContent = item.id;
        const celulaQtd = newRow.insertCell(1);
        celulaQtd.textContent = quantidadeItens;
        const celulaDescricao = newRow.insertCell(2);
        celulaDescricao.textContent = item.nome;
        const celulaValor = newRow.insertCell(3);
        celulaValor.textContent = `R$${valor}`;
        const celulaTotal = newRow.insertCell(4);
        celulaTotal.textContent = `R$${quantidadeItens * valor}`;

        const selectedItem = {
            id: item.id,
            quantidade: quantidadeItens,
            totalPedido: celulaTotal,
            valor
        };

        console.log('selectedItem', selectedItem)

        itemsPedido.push(selectedItem);
    } catch (error) {
        console.error('Erro ao adicionar item à tabela:', error);
    }
}

document.getElementById('btn-help').addEventListener('click', function() {
    window.open('https://youtu.be/H16CKkpcItU', '_blank');
});

// function fecharPopupPedido() {
//     document.getElementsByClassName("modal-pedido").style.display = "none";
//     window.location.reload();
// }
 
// async function preencherCliente() {
//     const getClientes = await axios.get("/api/listar-clientes");

//     const clienteBanco = getClientes.data.clientes;

//     const selectCliente = document.getElementById("escolhaCliente") ;

//     for (Cliente of clienteBanco) {
//         let novaCliente = new Option(Cliente.nome, Cliente.id);
//         selectCliente.add(novaCliente);
//     }

//     selectCliente.addEventListener("change", async function () {
//         const clienteSelecionado = selectCliente.value;
//         const dadosClienteSelecionado = clienteBanco[clienteSelecionado - 1]

//         const getValorFrete = await axios.get("/api/buscar-valor-frete/" + dadosClienteSelecionado.idBairro );

//         const frenteCliente = document.getElementById("valor-frete");
//         frenteCliente.innerHTML = "R$" + getValorFrete.data.valorFrete[0].Valor;
//     });
// }

async function preencherCliente() {
    try {
        const getClientes = await axios.get("/api/listar-clientes");
        clientes = getClientes.data.clientes;
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
    }
}

document.getElementById('inputBuscaCliente').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const results = clientes.filter(cliente => cliente.nome.toLowerCase().includes(query));
    updateClienteSearchResults(results);
});

function updateClienteSearchResults(results) {
    const searchResults = document.getElementById("resultadoBuscaCliente");
    searchResults.innerHTML = "";

    results.forEach(cliente => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = cliente.nome;
        listItem.onclick = () => selectCliente(cliente);
        searchResults.appendChild(listItem);
    });
}

function selectCliente(cliente) {
    const searchInput = document.getElementById("inputBuscaCliente");
    searchInput.value = cliente.nome;
    searchInput.setAttribute('data-cliente-id', cliente.id);
    document.getElementById("resultadoBuscaCliente").innerHTML = "";

    // Atualizar valor do frete
    axios.get("/api/buscar-valor-frete/" + cliente.idBairro)
        .then(response => {
            const valorFrete = response.data.valorFrete[0].Valor;
            document.getElementById("valor-frete").innerText = "R$" + valorFrete;
        })
        .catch(error => {
            console.error('Erro ao buscar valor do frete:', error);
        });
}

async function preencherItens() {
    const getItems = await axios.get("/api/listar-produtos");

    items = getItems.data.produtos;
}

async function preencherFormaPagamento() {
    const getPagamentos = await axios.get("/api/listar-pagamentos");

    const pagamentosBanco = getPagamentos.data.pagamento;

    const selectPagamento = document.getElementById("escolhaFormaPagamento") ;

    for (pagamento of pagamentosBanco) {
        let novaPagamento = new Option(pagamento.Nome, pagamento.ID);
        selectPagamento.add(novaPagamento);
    }
    selectPagamento.addEventListener("change", function () {
        
        const pagamentoSelecionado = selectPagamento.value;
 
        console.log("Pagamento selecionado:", pagamentoSelecionado);


        
    });
}



// async function lancarPedido() {
//     const atendenteId = sessionStorage.getItem("userId");
//     const clienteElement = document.getElementById("escolhaCliente");
//     const clienteId = clienteElement.options[clienteElement.selectedIndex].value;
//     const formaPagamentoElement = document.getElementById("escolhaFormaPagamento");
//     const formaPagamentoId = formaPagamentoElement.options[formaPagamentoElement.selectedIndex].value;
//     const valorFrete = parseFloat(document.getElementById("valor-frete").innerText.replace("R$", "").trim());
//     const pedido = JSON.stringify({
//         atendenteId,
//         clienteId,
//         formaPagamentoId,
//         itemsPedido,
//         valorFrete
//     });
//     const axiosConfig = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     console.log("pedido", pedido);
//     try {
//         const retornoPedido = await axios.post("/api/salvar-pedido", pedido, axiosConfig);
//         console.log('retornoPedido 222', retornoPedido);

//         let valorTotalComFrete = retornoPedido.data.valorTotalPedido + valorFrete;
//         if (formaPagamentoId == 3) {
//             valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) + valorTotalComFrete;
//             localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2));
//         }
//         console.log("Caixa atualizado com sucesso:", valorInicialCaixa);
//         fecharPopupPedido();
//     } catch (error) {
//         console.error('Erro ao lançar pedido:', error);
//     }
// }


async function lancarPedido() {
    const atendenteId = sessionStorage.getItem("userId");
    const clienteId = document.getElementById("inputBuscaCliente").getAttribute('data-cliente-id');
    const formaPagamentoElement = document.getElementById("escolhaFormaPagamento");
    const formaPagamentoId = formaPagamentoElement.options[formaPagamentoElement.selectedIndex].value;
    const valorFrete = parseFloat(document.getElementById("valor-frete").innerText.replace("R$", "").trim());

    const pedido = JSON.stringify({
        atendenteId,
        clienteId,
        formaPagamentoId,
        itemsPedido,
        valorFrete
    });

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log("pedido", pedido);
    try {
        const retornoPedido = await axios.post("/api/salvar-pedido", pedido, axiosConfig);
        console.log('retornoPedido 222', retornoPedido);

        let valorTotalComFrete = retornoPedido.data.valorTotalPedido + valorFrete;
        if (formaPagamentoId == 3) {
            valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) + valorTotalComFrete;
            localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2));
        }
        console.log("Caixa atualizado com sucesso:", valorInicialCaixa);
        fecharPopupPedido();
    } catch (error) {
        console.error('Erro ao lançar pedido:', error);
    }
}
