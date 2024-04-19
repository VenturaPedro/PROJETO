let items = [];
let itemsPedido = [];


document.getElementById("novo-pedido").addEventListener("click", function() {
    document.getElementById("vincular-atendente").style.display = "block";

    preencherCliente();
    preencherItens();
    preencherFormaPagamento(); 
});
function fecharPopupAtendentePedido() {
    document.getElementById("vincular-atendente").style.display = "none";
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
        updateSearchResults(filteredItems);
    } else {
        const searchResults = document.getElementById("resultadoBusca");
        searchResults.innerHTML = "";
    }
}
async function addToTable(item) {
    // Consulta o valor e a quantidade do produto na rota '/api/consultar-valor-produto/:id'
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
            valor
        };

        itemsPedido.push(selectedItem);
    } catch (error) {
        console.error('Erro ao adicionar item à tabela:', error);
    }
}



function fecharPopupPedido() {
    document.getElementsByClassName("modal-body").style.display = "none";
    window.location.reload();
}

// async function preencherAtendente() {
//     const getAtendentes = await axios.get("/api/listar-atendentes");

//     const atendentesBanco = getAtendentes.data.Atendentes;

//     const selectAtendente = document.getElementById("escolhaAtendente") ;

//     for (Atendente of atendentesBanco) {
//         let novaAtendente = new Option(Atendente.Nome, Atendente.ID);
//         selectAtendente.add(novaAtendente);
//     }
//     selectAtendente.addEventListener("change", function () {
        
//         const atendenteSelecionado = selectAtendente.value;
 
//         console.log("Atendente selecionado:", atendenteSelecionado);
//     });
// }

async function preencherCliente() {
    const getClientes = await axios.get("/api/listar-clientes");

    const clienteBanco = getClientes.data.clientes;

    const selectCliente = document.getElementById("escolhaCliente") ;

    for (Cliente of clienteBanco) {
        let novaCliente = new Option(Cliente.nome, Cliente.id);
        selectCliente.add(novaCliente);
    }
    selectCliente.addEventListener("change", function () {
        
        const atendenteSelecionado = selectCliente.value;
 
        console.log("Cliente selecionado:", atendenteSelecionado);
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



async function lancarPedido() {
    const atendenteId = sessionStorage.getItem("userId");

    const clienteElement = document.getElementById("escolhaCliente");
    const clienteId = clienteElement.options[clienteElement.selectedIndex].value

    const formaPagamentoElement = document.getElementById("escolhaFormaPagamento");
    const formaPagamentoId = formaPagamentoElement.options[formaPagamentoElement.selectedIndex].value

    const pedido = JSON.stringify({ 
        atendenteId,
        clienteId,
        formaPagamentoId,
        itemsPedido
    });

    const axiosConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };

    console.log("pedido", pedido)

    const retornoPedido = await axios.post("/api/salvar-pedido", pedido, axiosConfig)

    if(formaPagamentoId == 3){
        valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) + retornoPedido.data.valorTotalPedido;
        parseFloat(localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2)));        
    }

    
    fecharPopupPedido();
    window.location.reload();
}


