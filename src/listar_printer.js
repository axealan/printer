const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/', function(req, res) {
  exec('wmic printer get name', function(error, stdout, stderr) {
    if (error) {
      console.error('Erro ao executar o comando:', error);
      res.status(500).json({ error: 'Erro ao executar o comando' });
      return;
    }

    if (stderr) {
      console.error('Erro na saída do comando:', stderr);
      res.status(500).json({ error: 'Erro na saída do comando' });
      return;
    }

    const printerNames = stdout.split('\n').slice(1, -1).map(name => name.trim());

    console.log('Impressoras disponíveis:');
    printerNames.forEach(function(printerName) {
      console.log(printerName);
    });

    res.json({ printers: printerNames });
  });
});

app.listen(3000, function() {
  console.log('Servidor em execução no localhost:3000');
});
