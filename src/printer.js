const { spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');

// Função para baixar o arquivo PDF da URL e imprimir
async function baixarPDFDaURL(url, caminhoDestino, opcoes) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.mkdirSync('./local/do', { recursive: true }); // Criar o diretório "local/do"
    fs.writeFileSync(caminhoDestino, response.data);
    console.log('PDF baixado com sucesso.');
    imprimirPDF(caminhoDestino, opcoes); // Imprimir o arquivo PDF após o download
  } catch (error) {
    console.error('Erro ao baixar o PDF:', error);
  }
}

// Função para imprimir o arquivo PDF com opções
function imprimirPDF(caminhoArquivo, opcoes) {
  const { printer, pages, copies } = opcoes;

  const comandoImpressao = `lp -d ${printer} -P ${pages} -n ${copies} ${caminhoArquivo}`;

  const processoImpressao = spawn('sh', ['-c', comandoImpressao]);

  processoImpressao.stdout.on('data', (data) => {
    console.log(`Saída: ${data}`);
  });

  processoImpressao.stderr.on('data', (data) => {
    console.error(`Erro: ${data}`);
  });

  processoImpressao.on('close', (code) => {
    console.log(`Processo de impressão encerrado com código ${code}`);
  });
}

// URL do PDF a ser baixado
const urlPDF = 'https://b2eb2e9c6218b8ec531cb2d04a0b8651.cdn.bubble.io/f1687134448716x578629438460382100/islide.pdf';
// Caminho local para salvar o PDF baixado
const caminhoLocalPDF = './local/do/arquivo.pdf';
// Opções de impressão
const opcoes = {
  printer: 'EPSON_L3110_Series',
  pages: '1', // Páginas a serem impressas (exemplo: "1-5" ou "1,3,5")
  copies: 1 // Número de cópias a serem impressas
};

// Baixar o PDF da URL e imprimir
baixarPDFDaURL(urlPDF, caminhoLocalPDF, opcoes);
