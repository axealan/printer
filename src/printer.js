const printer = require('node-printer');

// Lista as impressoras disponíveis
function listarImpressoras() {
  const impressoras = printer.list();

  console.log('Impressoras disponíveis:');
  impressoras.forEach(impressora => {
    console.log(`- ${impressora}`);
  });
}

// Executa a função para listar as impressoras
listarImpressoras();
