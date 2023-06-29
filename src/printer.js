const http = require('http');

const textoParaImprimir = 'Olá, esta é uma impressão de teste';

const options = {
  hostname: 'https://listar-impressoras.onrender.com',  // Altere para o URL do seu site no Render.com
  port: 8080,  // Modifique a porta conforme necessário
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(textoParaImprimir)
  }
};

const req = http.request(options, (res) => {
  console.log('Código de status da resposta:', res.statusCode);

  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Resposta do servidor Python:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Erro na solicitação:', error);
});

req.write(textoParaImprimir);
req.end();
