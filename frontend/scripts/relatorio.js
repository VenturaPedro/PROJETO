import pdfMake from '/pdfmake/build/pdfmake';
import pdfFonts from '/pdfmake/build/vfs_fonts';



// Configurando as fontes do pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Função para fazer a solicitação à rota /listar-pedidos e gerar o PDF dos pedidos

// Chamando a função para gerar o relatório de pedidos com busca no banco
