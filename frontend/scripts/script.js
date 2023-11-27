document.getElementById("btn-cadastrarCliente").addEventListener("click", function() {
    document.getElementById("cadastrar-cliente").style.display = "block";
});
function fecharPopupCli() {
    document.getElementById("cadastrar-cliente").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarAtendente").addEventListener("click", function() {
    document.getElementById("cadastrar-atendente").style.display = "block";
});
function fecharPopupAtd() {
    document.getElementById("cadastrar-atendente").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarMotoboy").addEventListener("click", function() {
    document.getElementById("cadastrar-motoboy").style.display = "block";
});
function fecharPopupBoy() {
    document.getElementById("cadastrar-motoboy").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarProduto").addEventListener("click", function() {
    document.getElementById("cadastrar-produto").style.display = "block";
    preencherCategorias();//preenche a opções de categoria dentro do formulário de produto e o vincula
});
function fecharPopupProduto() {
    document.getElementById("cadastrar-produto").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarMembro").addEventListener("click", function() {
    document.getElementById("cadastrar-membro").style.display = "block";
});
function fecharPopupMembro() {
    document.getElementById("cadastrar-membro").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarCategoria").addEventListener("click", function() {
    document.getElementById("cadastrar-categoria").style.display = "block";
});
function fecharPopupCategoria() {
    document.getElementById("cadastrar-categoria").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarPagamento").addEventListener("click", function() {
    document.getElementById("cadastrar-pagamento").style.display = "block";
});
function fecharPopupPagamento() {
    document.getElementById("cadastrar-pagamento").style.display = "none";
    window.location.reload();
}

async function preencherCategorias() {
    const getCategorias = await axios.get("/api/listar-categorias");

    const categoriasBanco = getCategorias.data.categorias;

    const selectCategoria = document.getElementById("categoriaProduto");

    for (categoria of categoriasBanco) {
        let novaCategoria = new Option(categoria.Nome);
        selectCategoria.add(novaCategoria);
    }
}




// document.getElementById("btn-editarCliente").addEventListener("click", function() {
//     document.getElementById("editarCliente").style.display = "block";
// });
// function fecharPopupEdicaoCli() {
//     document.getElementById("editarCliente").style.display = "none";
//     window.location.reload();
// }
// //


// document.getElementById("btn-salvarEdicao").addEventListener("click", async function() {
//     const clienteId = document.getElementById("edit-cliente-id").value;
//     const novoNome = document.getElementById("edit-nomeCliente").value;
//     const novoEmail = document.getElementById("edit-emailCliente").value;
//     const novoCpf = document.getElementById("edit-cpfCliente").value;
//     const novoTelefone = document.getElementById("edit-telefoneCliente").value;
//     const novoLogradouro = document.getElementById("edit-logradouroCliente").value;
//     const novaCidade = document.getElementById("edit-cidadeCliente").value;
//     const novoComplemento = document.getElementById("edit-complementoCliente").value;
//     const novoNumero = document.getElementById("edit-numeroCliente").value;
//     const novoEstado = document.getElementById("edit-estadoCliente").value;
//     const novoCep = document.getElementById("edit-cepCliente").value;


//     // Enviar uma solicitação ao servidor para editar o cliente
//     await fetch('/editar-cliente', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({clienteId, novoNome, novoEmail, novoCpf, novoTelefone, novoLogradouro, novaCidade, novoComplemento, novoNumero, novoEstado, novoCep}),
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert(data); // Exibir mensagem de sucesso ou tratamento de erro
//         // Recarregar a página ou atualizar a lista de clientes
//         document.getElementById("editar-cliente").style.display = "none";
//     })
//     .catch(error => {
//         console.error('Erro ao editar cliente:', error);
//     });
// });

//     document.getElementById("btn-cancelarEdicao").addEventListener("click", function() {
//     document.getElementById("editar-cliente").style.display = "none";
// });


