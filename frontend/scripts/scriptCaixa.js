let valorInicialCaixa = 0;
let statusCaixa = "fechado";

window.addEventListener('load', function(){
    if(localStorage.getItem("statusCaixa") == "aberto"){
        
        valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa"));
        console.log("teste", localStorage.getItem("valorCaixa"));
        document.getElementById("valorInicial").innerHTML = valorInicialCaixa.toFixed(2);
        document.getElementById("caixaStatus").innerHTML = "Aberto";
        document.getElementById("valorAbertura").disabled = true;
        document.getElementById("abrirCaixa").disabled = true;
    }
    if(localStorage.getItem("statusCaixa") == "fechado"){
        
        document.getElementById("fecharCaixa").disabled = true;
    }
  });

// Função para abrir o caixa
function abrirCaixa(){
    console.log("teste", localStorage.getItem("statusCaixa"));

    statusCaixa = "aberto";

    document.getElementById("caixaStatus").innerHTML = "Aberto";

    valorInicialCaixa = parseFloat(document.getElementById("valorAbertura").value);

    document.getElementById("valorInicial").innerHTML = "R$ " + valorInicialCaixa.toFixed(2);

    document.getElementById("valorAbertura").disabled = true;

    localStorage.setItem("valorCaixa", valorInicialCaixa);

    localStorage.setItem("statusCaixa", statusCaixa);
}
  
function fecharCaixa(){
    statusCaixa = "fechado";

    document.getElementById("caixaStatus").innerHTML = "Fechado";

    valorInicialCaixa = parseFloat(document.getElementById("valorAbertura"));

    // Atualiza o valor inicial na interface
    // document.getElementById("valorInicial").innerHTML = parseFloat(valorInicialCaixa.toFixed(2));

    document.getElementById("valorAbertura").disabled = false;

    localStorage.setItem("valorCaixa", valorInicialCaixa);
    localStorage.setItem("statusCaixa", statusCaixa);
}


function sangria(){

  let valorSangria = parseFloat(document.getElementById("valorSangria").value);
  if(isNaN(valorSangria) || valorSangria < 0){
    alert("O valor da sangria deve ser um número válido e maior ou igual a 0.");
    return;
  }

  // Atualiza o valor do caixa
  valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) - valorSangria;

  // Atualiza a interface
  localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2));
}

// Função para realizar reforço
function reforco(){
  // Verifica se o valor do reforço é válido
  let valorReforco = parseFloat(document.getElementById("valorReforco").value);
  if(isNaN(valorReforco) || valorReforco < 0){
    alert("O valor do reforço deve ser um número válido e maior ou igual a 0.");
    return;
  }

  valorInicialCaixa = parseFloat(localStorage.getItem("valorCaixa")) + valorReforco;

  localStorage.setItem("valorCaixa", valorInicialCaixa.toFixed(2));
}

function carregarValorInicialCaixa(){
  valorInicialCaixa = parseFloat(document.cookie.split("=")[1]);

  if(valorInicialCaixa){
    document.getElementById("valorInicial").innerHTML = "R$ " + valorInicialCaixa.toFixed(2);
  }
}

carregarValorInicialCaixa();
