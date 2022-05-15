# # webhookEduzzProject!  
  
Serviço desenvolvido em javascript usando typescript, express com nodejs para receber webhook de faturas geradas na plataforma Eduzz e então disparar e-mails conforme as condições de fatura aberta ou fatura paga.  
  
A aplicação desenvolvida ela precisa ser autenticada com a sua API de integração presente em seu Orbita na Eduzz.  
  
Você precisa alterar o origin de, "api-key-orbita", para a sua Origin Key do Orbita.  
  
`origin === "api-key-orbita`
  
Para que o disparo de e-mail seja executado com sucesso será necessário a configuração do seu servidor de e-mails.  
  

    const transporter = nodemailer.createTransport({  
    service: "gmail",  
    auth: {  
    user: "exemplo@gmail.com",  
    pass: "exemplo",  
    },  
    });

  
  
# Executando a aplicação  
  
Primeiro comando necessário é instalar todas dependências da aplicação, digite em seu terminal:  
  

"**npm install**"  

  
Após instalada as dependencias e realizar a alteração do arquivo index.ts no diretório *"/src/index.ts"* você precisa construir a aplicação em JavaScript rodando o comando  
  
"**npm run build**"  
  
Após compilado de TypeScript para JavaScript, você precisa então rodar a aplicação. digite o comando  
  
"**npm run start**"  
  
em ambiente de desenvolvimento você pode utilizar o nodemon para construir e executar em tempo real a cada alteração.  
  
Para que ele recompile e inicie automaticamente após alteração você precisa executar os comandos,  
  
"**npm run build:watch**"  
  
(comando responsável por recompilar em tempo assistido)  
  
Para reinicializar juntamente após cada alteração,  
  
"**npm run dev**".
