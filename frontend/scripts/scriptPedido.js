let items = [];
let itemsPedido = [];


document.getElementById("novo-pedido").addEventListener("click", function() {
    document.getElementById("modal-pedido").style.display = "block";

    preencherItens();
    preencherFormaPagamento(); 
});
// document.getElementById("addItemButton").addEventListener("click", function() {
//     var quantidade = parseInt(document.getElementById("quantidadeInput").value);
//     var produto = document.getElementById("produtoSelecionado");
//     var produtoId = produto.getAttribute("data-id");
//     var descricao = produto.getAttribute("data-descricao");
//     var valorUnitario = parseFloat(produto.getAttribute("data-valor"));

//     if (!isNaN(quantidade) && quantidade > 0) {
//         var totalProduto = quantidade * valorUnitario;

//         var tabelaItens = document.getElementById("tabelaItensPedido");
//         var novaLinha = tabelaItens.insertRow();
//         novaLinha.insertCell(0).innerText = produtoId;
//         novaLinha.insertCell(1).innerText = quantidade;
//         novaLinha.insertCell(2).innerText = descricao;
//         novaLinha.insertCell(3).innerText = `R$ ${valorUnitario.toFixed(2)}`;
//         novaLinha.insertCell(4).innerText = `R$ ${totalProduto.toFixed(2)}`;

//         atualizarValorTotal();
//     }
// });

// function atualizarValorTotal() {
//     var tabelaItens = document.getElementById("tabelaItensPedido");
//     var linhas = tabelaItens.getElementsByTagName("tr");
//     var valorTotal = 0;

//     for (var i = 0; i < linhas.length; i++) {
//         var celulas = linhas[i].getElementsByTagName("td");
//         if (celulas.length > 0) {
//             var totalProduto = parseFloat(celulas[4].innerText.replace("R$", "").trim());
//             valorTotal += totalProduto;
//         }
//     }

//     document.getElementById("valorTotalPedido").innerText = `R$ ${valorTotal.toFixed(2)}`;
// }

function fecharPopupPedido() {
    document.getElementById("modal-pedido").style.display = "none";
    window.location.reload()
}

async function preencherItens() {
    try {
        const getItems = await axios.get("/api/listar-produtos");
        items = getItems.data.produtos;
    } catch (error) {
        console.error('Erro ao obter itens:', error);
    }
}

async function preencherFormaPagamento() {
    try {
        const getPagamentos = await axios.get("/api/listar-pagamentos");
        const pagamentosBanco = getPagamentos.data.pagamento;
        const selectPagamento = document.getElementById("escolhaFormaPagamento");

        pagamentosBanco.forEach(pagamento => {
            let novaPagamento = new Option(pagamento.Nome, pagamento.ID);
            selectPagamento.add(novaPagamento);
        });

        selectPagamento.addEventListener("change", function () {
            const pagamentoSelecionado = selectPagamento.value;
            console.log("Pagamento selecionado:", pagamentoSelecionado);
        });
    } catch (error) {
        console.error('Erro ao obter formas de pagamento:', error);
    }
}

async function lancarPedido() {
    try {
        const atendenteId = sessionStorage.getItem("userId");
        const formaPagamentoId = document.getElementById("escolhaFormaPagamento").value;
        
        const pedido = {
            atendenteId,
            formaPagamentoId,
            itemsPedido
        };

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const retornoPedido = await axios.post("/api/salvar-pedido-balcao", pedido, axiosConfig);
        console.log('retornoPedido', retornoPedido.data);

        if(formaPagamentoId == 3){
            valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) + retornoPedido.data.valorTotalPedido;
            parseFloat(localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2)));        
        }

        fecharPopupPedido();
    } catch (error) {
        console.error('Erro ao lançar pedido:', error);
    }
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
