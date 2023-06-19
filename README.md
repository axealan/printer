# printer

## Pré-requisitos

  Certifique-se de ter os seguintes requisitos instalados:

  - Node.js (versão X.X.X)
  - npm (versão X.X.X)

  
# Instalação do Node.js:

      Execute o seguinte comando para instalar o Node.js:
   
         npm init -y && npm install express npm install axios npm install pdf-to-printer
          
   
   ## Rodando o projeto
   
            src/listar_printer.js
   
            src/printer.js
  
   ## Endereço API
   
           http://localhost:3000
   
   ## Exemplo em PHP para printer.js
   
     <?php
        $client = new Client();
         $headers = [
         'Content-Type' => 'application/json'
                                  ];
                        $body = '{
                        "urlPDF": "endereço pdf",
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

   

   
   

