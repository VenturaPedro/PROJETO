console.log("Hello");

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === "admin" && password === "senhateste") {
            alert("Login bem-sucedido!");
            // Redirecionar para a página "telaPrincipal.js"
            window.location.href = "statusCaixa.html";
            
        } else {
            alert("Login falhou. Verifique suas credenciais.");
            document.getElementById('username').value='';
            document.getElementById('password').value='';
        } 
        
        let caixaAberto = false;

        const caixaStatusElement = document.getElementById('caixaStatus');
        const abrirCaixaButton = document.getElementById('abrirCaixa');
        const fecharCaixaButton = document.getElementById('fecharCaixa');

        abrirCaixaButton.addEventListener('click', () => {
            if (!caixaAberto) {
                caixaAberto = true;
                caixaStatusElement.textContent = 'Aberto';
                abrirCaixaButton.disabled = true;
                fecharCaixaButton.display = none;
                
            }
        });

        fecharCaixaButton.addEventListener('click', () => {
            if (caixaAberto) {
                caixaAberto = false;
                caixaStatusElement.textContent = 'Fechado';
                abrirCaixaButton.disabled = false;
                fecharCaixaButton.display = none;
            }
        });
})});

// ^ spripts para login e abertura de caixa

// código abaixo referente ao botão de cadastrar cliente no painel 


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