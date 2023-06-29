const http = require('http');
const dns = require('dns');
const os = require('os');

const textoParaImprimir = 'Olá, esta é uma impressão de teste';

dns.lookup(os.hostname(), (err, address) => {
  if (err) {
    console.error('Erro ao obter o endereço IP:', err);
    return;
  }

  const ip = address;
  const porta = 8080;

  console.log('Endereço IP:', ip);
  console.log('Porta:', porta);

  const options = {
    hostname: ip,
    port: porta,
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
});
