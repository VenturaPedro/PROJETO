document.getElementById("btn-cadastrarCliente").addEventListener("click", function() {
    document.getElementById("cadastrar-cliente").style.display = "block";
});
function fecharPopupCli() {
    document.getElementById("cadastrar-cliente").style.display = "none";
}

document.getElementById("btn-cadastrarAtendente").addEventListener("click", function() {
    document.getElementById("cadastrar-atendente").style.display = "block";
});
function fecharPopupAtd() {
    document.getElementById("cadastrar-atendente").style.display = "none";
}

document.getElementById("btn-cadastrarMotoboy").addEventListener("click", function() {
    document.getElementById("cadastrar-motoboy").style.display = "block";
});
function fecharPopupBoy() {
    document.getElementById("cadastrar-motoboy").style.display = "none";
}

document.getElementById("btn-cadastrarProduto").addEventListener("click", function() {
    document.getElementById("cadastrar-produto").style.display = "block";
});
function fecharPopupProduto() {
    document.getElementById("cadastrar-produto").style.display = "none";
}