if (!sessionStorage.getItem("role")) {
    location.href = "/login";
}

document.getElementById("btn-cadastrarCliente").addEventListener("click", function(){
    document.getElementById("cadastrar-cliente").style.display = "block";
    preencherTaxas()
});
function fecharPopupCli(){
    document.getElementById("cadastrar-cliente").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarAtendente").addEventListener("click", function(){
    document.getElementById("cadastrar-atendente").style.display = "block";
});
function fecharPopupAtd(){
    document.getElementById("cadastrar-atendente").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarMotoboy").addEventListener("click", function(){
    document.getElementById("cadastrar-motoboy").style.display = "block";
});
function fecharPopupBoy(){
    document.getElementById("cadastrar-motoboy").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarTaxaDelivery").addEventListener("click", function(){
    document.getElementById("cadastrar-taxa-delivery").style.display = "block";
});
function fecharPopupTaxa(){
    document.getElementById("cadastrar-taxa-delivery").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarCategoria").addEventListener("click", function(){
    document.getElementById("cadastrar-categoria").style.display = "block";
});
function fecharPopupCategoria(){
    document.getElementById("cadastrar-categoria").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarPagamento").addEventListener("click", function(){
    document.getElementById("cadastrar-pagamento").style.display = "block";
});
function fecharPopupPagamento(){
    document.getElementById("cadastrar-pagamento").style.display = "none";
    window.location.reload();
}

document.getElementById("btn-cadastrarDespesa").addEventListener("click", function(){
    document.getElementById("cadastrar-despesa").style.display = "block";
});
function fecharPopupDespesa(){
    document.getElementById("cadastrar-despesa").style.display = "none";
    window.location.reload();
}

async function preencherCategorias(){
    const getCategorias = await axios.get("/api/listar-categorias");

    const categoriasBanco = getCategorias.data.categorias;

    const selectCategoria = document.getElementById("categoriaProduto");

    for(categoria of categoriasBanco){
        let novaCategoria = new Option(categoria.Nome);
        selectCategoria.add(novaCategoria);
    }
}

async function preencherTaxas(){
    const getTaxas = await axios.get("/api/listar-taxas");

    const taxasBanco = getTaxas.data.TaxaDelivery;
    console.log(taxasBanco);

    const selectTaxas = document.getElementById("bairroCliente");

    for(TaxaDelivery of taxasBanco){
        let novaTaxas = new Option(TaxaDelivery.Area, TaxaDelivery.ID);
        novaTaxas.value = TaxaDelivery.ID;
        selectTaxas.add(novaTaxas);
    }
}

//COMPARAÇÃO DE SENHA ATENDENTE
const formAtendente = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try{
        const response = await fetch('/processar-cadastro-atendente',{
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if(response.ok){
            // Se a operação foi OK, exibe uma mensagem de sucesso
            alert(data.success);
        }else{
            
            alert(data.error);
        }
    }catch(error){
        console.error('Erro ao processar a solicitação:', error);
        alert('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
    }
});


//COMPARAÇÃO DE SENHA Motoboy
const formMotoboy = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try{
        const response = await fetch('/processar-cadastro-motoboy',{
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if(response.ok){
            // Se a operação foi OK, exibe uma mensagem de sucesso
            alert(data.success);
        }else{
            
            alert(data.error);
        }
    }catch(error){
        console.error('Erro ao processar a solicitação:', error);
        alert('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
    }
});



//MASCARAS

$('#cpfCliente').inputmask('999.999.999-99');
$('#emailCliente').inputmask({ alias: 'email' });
$('#telefoneCliente').inputmask('(99)99999-999[9]', { greedy: false });
$('#cepCliente').inputmask('99999-999');

// Máscaras para Campos do Formulário de Atendente
$('.campoEmail').inputmask({ alias: 'email' });
$('#telefoneAtendente').inputmask('(99)99999-999[9]', { greedy: false });

// Máscaras para Campos do Formulário de Motoboy
$('#emailMotoboy').inputmask({ alias: 'email' });
$('#telefoneMotoboy').inputmask('(99)99999-999[9]', { greedy: false });


// Máscaras para Campos do Formulário de Produto
$('#valorProduto').inputmask('currency', { prefix: 'R$ ' });





