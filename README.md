goweek
===
Criado por Leonardo Salema, apartir do curso oferecido pela Rocket Seat na semana OminiStack

## Instalação
Tenha instaldo o [Node js] para executar o script

Após clonar o repositório, execute na linha de comando:

    npm install #instalar as dependências

Para testar o tema em modo de desenvolvimento, execute

    npm start

Utilizando o Insomnia você conseguirá fazer as requisições http para testar o backend:

 * a requisição GET no endereço localhost:3000/tweets você consegue fazer uma busca no tweets cadastrados
 * a requisição POST no endereço localhost:3000/tweets você consegue criar um novo tweet
 * a requisição POST no endereço localhost:3000/likes/id_do_tweet será adicionado um like ao tweet