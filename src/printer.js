const express = require('express');
const { print } = require('pdf-to-printer');
const axios = require('axios');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const { urlPDF, caminhoLocalPDF, opcoes } = req.body;

  if (!urlPDF || !caminhoLocalPDF || !opcoes) {
    res.status(400).send('URL, caminhoLocalPDF ou opcoes não encontrados');
    return;
  }

  const result = await baixarPDFDaURL(urlPDF, caminhoLocalPDF);
  if (result.success) {
    await imprimirPDF(caminhoLocalPDF, opcoes);
    res.send('PDF impresso com sucesso');
  } else {
    res.status(500).send('Erro ao baixar o PDF');
  }
});

async function baixarPDFDaURL(url, caminhoDestino) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.mkdirSync('./local/do', { recursive: true }); // Criar o diretório "local/do"
    fs.writeFileSync(caminhoDestino, response.data);
    console.log('PDF baixado com sucesso.');
    return { success: true };
  } catch (error) {
    console.error('Erro ao baixar o PDF:', error);
    return { success: false };
  }
}

async function imprimirPDF(caminhoArquivo, opcoes) {
  try {
    await print(caminhoArquivo, opcoes);
    console.log('PDF impresso com sucesso.');
  } catch (error) {
    console.error('Erro ao imprimir o PDF:', error);
  }
}

app.listen(3000, () => {
  console.log('Aplicação em execução no localhost:3000!');
});
