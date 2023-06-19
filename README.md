# printer

Breve descrição do projeto.

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados:

- Node.js (versão X.X.X)
- npm (versão X.X.X)

  
# Instalação do Node.js:

Execute o seguinte comando para instalar o Node.js:
   
   curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh && sudo bash nodesource_setup.sh && sudo apt -y install nodejs
   
   npm install express
   
   ## Rodando o projeto
   
   src/listar_pinter.js
   
   src/pinter.js
  
   ## Endereço API
   
   http://localhost:3000
   
   ## Exemplo em PHP para printer.js

   
   <?php
$client = new Client();
$headers = [
    'Content-Type' => 'application/json'
];
$body = '{
  "urlPDF": "https://b2eb2e9c6218b8ec531cb2d04a0b8651.cdn.bubble.io/f1687134448716x578629438460382100/islide.pdf",
  "caminhoLocalPDF": "./local/do/arquivo.pdf",
  "opcoes": {
    "printer": "EPSON L3110 Series",
    "pages": "1",
    "subset": "odd",
    "orientation": "portrait",
    "scale": "shrink",
    "monochrome": true,
    "side": "simplex",
    "bin": "tray2",
    "paperSize": "A4",
    "silent": true,
    "printDialog": false,
    "copies": 1
  }
}
';
$request = new Request('GET', 'http://localhost:3000', $headers, $body);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
   
   

