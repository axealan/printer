const printer = require('printer');

// Lista as impressoras disponíveis
function listarImpressoras() {
  const impressoras = printer.getPrinters();

  console.log('Impressoras disponíveis:');
  impressoras.forEach(impressora => {
    console.log(`- ${impressora.name}`);
  });
}

// Executa a função para listar as impressoras
listarImpressoras();
