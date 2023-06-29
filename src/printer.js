const net = require('net');
const http = require('http');

const textoParaImprimir = 'Olá, esta é uma impressão de teste';

const options = {
  port: 8080,  // Altere para a porta correta do servidor Python
  hostname: '192.168.1.105',  // Altere para o endereço IP correto do servidor Python
  method: 'POST',
  path: '/',
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
