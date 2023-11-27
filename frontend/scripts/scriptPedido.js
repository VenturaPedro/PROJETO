let items = [];
let itemsPedido = [];

document.getElementById("novo-pedido").addEventListener("click", function() {
    document.getElementById("vincular-atendente").style.display = "block";
    preencherAtendente();
    preencherCliente();
    preencherItens();
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

function addToTable(item) {
    const quantidadeItens = document.getElementById("quantidadeItens").value.length > 0
        ? parseInt(document.getElementById("quantidadeItens").value)
        : 1;

    const selectedItemsTable = document.getElementById("itensSelecionados");
    const newRow = selectedItemsTable.insertRow();
    const celulaId = newRow.insertCell(0);
    celulaId.textContent = item.id;
    const celulaQtd = newRow.insertCell(1);
    celulaQtd.textContent = quantidadeItens;
    const celulaDescricao = newRow.insertCell(2);
    celulaDescricao.textContent = item.nome;
    const celulaValor = newRow.insertCell(3);
    celulaValor.textContent = `R$${item.valor}`;
    const celulaTotal = newRow.insertCell(4);
    celulaTotal.textContent = `R$${quantidadeItens * item.valor}`;

    const selectedItem = {
        id: item.id,
        quantidade: quantidadeItens
    };

    itemsPedido.push(selectedItem);
}

async function preencherAtendente() {
    const getAtendentes = await axios.get("/api/listar-atendentes");

    const atendentesBanco = getAtendentes.data.Atendentes;

    const selectAtendente = document.getElementById("escolhaAtendente") ;

    for (Atendente of atendentesBanco) {
        let novaAtendente = new Option(Atendente.Nome, Atendente.ID);
        selectAtendente.add(novaAtendente);
    }
    selectAtendente.addEventListener("change", function () {
        
        const atendenteSelecionado = selectAtendente.value;
 
        console.log("Atendente selecionado:", atendenteSelecionado);
    });
}

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

async function lancarPedido() {
    const atendenteElement = document.getElementById("escolhaAtendente");
    const atendenteId = atendenteElement.options[atendenteElement.selectedIndex].value

    const clienteElement = document.getElementById("escolhaCliente");
    const clienteId = clienteElement.options[clienteElement.selectedIndex].value

    const pedido = JSON.stringify({ 
        atendenteId,
        clienteId,
        itemsPedido,
    });

    const axiosConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };

    console.log("pedido", pedido)

    await axios.post("/api/salvar-pedido", pedido, axiosConfig)
}
