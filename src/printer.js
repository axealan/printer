const printer = require("node-printer");
const axios = require("axios");
const fs = require("fs");

// Função para baixar o arquivo PDF da URL e imprimir
async function baixarPDFDaURL(url, caminhoDestino, opcoes) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.mkdirSync("./local/do", { recursive: true }); // Criar o diretório "local/do"
    fs.writeFileSync(caminhoDestino, response.data);
    console.log("PDF baixado com sucesso.");
    imprimirPDF(caminhoDestino, opcoes); // Imprimir o arquivo PDF após o download
  } catch (error) {
    console.error("Erro ao baixar o PDF:", error);
  }
}

// Função para imprimir o arquivo PDF com opções
function imprimirPDF(caminhoArquivo, opcoes) {
  const printerName = printer.getDefaultPrinterName();
  const jobFromPath = printer.printFile({ filename: caminhoArquivo, printer: printerName, options: opcoes });
  
  jobFromPath.once("sent", () => {
    console.log("Trabalho de impressão enviado para a impressora.");
  });
  
  jobFromPath.once("completed", () => {
    console.log("Trabalho de impressão concluído com sucesso.");
  });
  
  jobFromPath.once("error", (err) => {
    console.error("Erro ao imprimir o arquivo:", err);
  });
}

// URL do PDF a ser baixado
const urlPDF = "https://b2eb2e9c6218b8ec531cb2d04a0b8651.cdn.bubble.io/f1687134448716x578629438460382100/islide.pdf";
// Caminho local para salvar o PDF baixado
const caminhoLocalPDF = "./local/do/arquivo.pdf";
// Opções de impressão
const opcoes = {
  media: "A4",
  n: 1
};

// Baixar o PDF da URL e imprimir
baixarPDFDaURL(urlPDF, caminhoLocalPDF, opcoes);
