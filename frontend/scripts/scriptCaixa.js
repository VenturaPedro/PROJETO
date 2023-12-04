// Variáveis globais
let valorInicialCaixa = 0;
let statusCaixa = "fechado";

window.addEventListener('load', function() {
    if (localStorage.getItem("statusCaixa") == "aberto") {
        
        valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa"));
        console.log("teste", localStorage.getItem("valorCaixa"));
        // Atualiza o valor inicial na interface
        document.getElementById("valorInicial").innerHTML = valorInicialCaixa.toFixed(2);
        document.getElementById("caixaStatus").innerHTML = "Aberto";
        document.getElementById("valorAbertura").disabled = true;
        document.getElementById("abrirCaixa").disabled = true;
    }
    if (localStorage.getItem("statusCaixa") == "fechado") {
        
        document.getElementById("fecharCaixa").disabled = true;
    }
  });

// Função para abrir o caixa
function abrirCaixa() {
    console.log("teste", localStorage.getItem("statusCaixa"));

    // Altera o status do caixa para "aberto"
    statusCaixa = "aberto";

    // Atualiza a interface
    document.getElementById("caixaStatus").innerHTML = "Aberto";

    // Captura o valor de abertura
    valorInicialCaixa = parseFloat(document.getElementById("valorAbertura").value);

    // Atualiza o valor inicial na interface
    document.getElementById("valorInicial").innerHTML = "R$ " + valorInicialCaixa.toFixed(2);

    // Desabilita o input de valor de abertura
    document.getElementById("valorAbertura").disabled = true;

    localStorage.setItem("valorCaixa", valorInicialCaixa);
    localStorage.setItem("statusCaixa", statusCaixa);
}
  
function fecharCaixa(){
    console.log("teste", localStorage.getItem("statusCaixa"));

    // Altera o status do caixa para "aberto"
    statusCaixa = "fechado";

    // Atualiza a interface
    document.getElementById("caixaStatus").innerHTML = "Fechado";

    // Captura o valor de abertura
    valorInicialCaixa = parseFloat(document.getElementById("valorAbertura").value);

    // Atualiza o valor inicial na interface
    document.getElementById("valorInicial").innerHTML = "R$ " + valorInicialCaixa.toFixed(2);

    // Desabilita o input de valor de abertura
    document.getElementById("valorAbertura").disabled = false;

    localStorage.setItem("valorCaixa", valorInicialCaixa);
    localStorage.setItem("statusCaixa", statusCaixa);
}


// Função para realizar sangria
function sangria() {
    console.log("tst sangria")
  // Verifica se o valor da sangria é válido
  let valorSangria = parseFloat(document.getElementById("valorSangria").value);
  if (isNaN(valorSangria) || valorSangria < 0) {
    alert("O valor da sangria deve ser um número válido e maior ou igual a 0.");
    return;
  }

  // Atualiza o valor do caixa
  valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) - valorSangria;

  // Atualiza a interface
  localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2));
}

// Função para realizar reforço
function reforco() {
  // Verifica se o valor do reforço é válido
  let valorReforco = parseFloat(document.getElementById("valorReforco").value);
  if (isNaN(valorReforco) || valorReforco < 0) {
    alert("O valor do reforço deve ser um número válido e maior ou igual a 0.");
    return;
  }

  // Atualiza o valor do caixa
  valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) + valorReforco;

  // Atualiza a interface
  localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2));
}

// Carrega o valor inicial do caixa dos cookies
function carregarValorInicialCaixa() {
  // Obtém o valor inicial do caixa dos cookies
  valorInicialCaixa = parseFloat(document.cookie.split("=")[1]);

  // Verifica se o valor inicial do caixa foi informado
  if (valorInicialCaixa) {
    // Atualiza a interface
    document.getElementById("valorInicial").innerHTML = "R$ " + valorInicialCaixa.toFixed(2);
  }
}

// Inicializa o código
carregarValorInicialCaixa();
