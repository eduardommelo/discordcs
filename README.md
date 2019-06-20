
## Sobre o projeto
O **DiscordCS** é uma biblioteca de suporte para [discord.js](https://discord.js.org/#/docs/main/stable/class/Guild) com o foco de desenvolver um projeto de uma forma estruturada e seja mais simples para aqueles que não possui uma experiência de desenvolver um bot, desenvolvido em   [Node.js](https://nodejs.org), ele traz esta solução para os usuários criar sua aplicação de uma forma mais rápida e ao mesmo tempo bem estruturada, é claro que estou prezando também para aqueles que quer desenvolver algo mais complexo.

- Orientado a objeto
- Estrutura de dados
- 100% configurável

## Instalando a biblioteca
*[OBS]* **Compatível com as versões discord.js v11.5 pra cima.**  

Sempre é bom você instalar a biblioteca *discord.js*, pois muitas das vezes depedendo dos updates da biblioteca em si, isso pode gerar alguns erros, então é melhor você já instalar para não vim com erros (mas caso queira instalar só o discordCS ele já vai vim com a versão no qual ele foi desenvolvida, é lógico que nos updates futuros irei atualizar suas versões na *package.json*)
- Então digite este comando: `npm install discord.js --save` (e dê enter)
- E então digite novamente: `npm install discordCS --save` (e dê enter)

### Como funciona? 
Bom, após de você instalar esta maravilhosa biblioteca é preciso saber de suas funções, ela vem com uma mala repleta de funções e então vai aqui alguns.
  - Parâmetro
    Os parâmetros irão ser apresentados são palavras chaves que cada um deles retorna um dado especifico.
    - `{member}`: Retorna o @mention do autor que executou o comando.
    - `{member.tag}`: Retorna o username + discriminator do autor que executou o comando.
    - `{member.id}`: Retorna id do autor que executou o comando.
    - `{guild}`: retorna o id e o nome da guilda aonde que o comando foi executado.
    - `{guild.id}`: Retorna o id da guilda aonde que o comando foi executado.
    - `{guild.name}`: retorna o nome da guilda aonde que o comando foi executado.
    - `{err}`: retorna o erro.
    - `{permissions}: retorna as permissões necessárias que precisa executar o comando.`

  - Funções / Instâncias
    - `Client(options)`: Instância responsável por da inicio ao bot e configura-lo.

      -`options.tokne`: Informar o token de sua aplicação. (Obrigatório)
      -`options.prefixes`: informar o prefixo do seu bot (em breve terá como adicionar em array). (Obrigatório)
      - `options.guilds`: Caso queira que sua aplicação seja exclusiva para algumas guildas, adicione a id da guild ( caso seja um não precisa ser em array, caso seja mais de um é obrigatório ser em array).
      - `options.cooldown`: Configurar cooldown de sua aplicação.
          - `cooldown.set`: Definir true/false se deve ser ativado o cooldown.
          - `cooldown.time`: Definir tempo em segundos do cooldown.
          - `cooldown.msg`: Definir a mensagem do cooldown.
      - `options.owners`: Definir os ids dos desenvolvedores do bot. (Array/ String)
      - `options.description`: Definir a descrição de sua aplicação.
      - `options.readylib`: Definir true/false se deve aparecer ready padrão da lib.
      - `options.logs`: definir true/false se deve aparecer as atividades da lib.
      - `options.messagesWarn`: Definir as mensagens de aviso.
          - `messagesWarn.hasPermission`: Definir a mensagem que o membro não possui a permissão necessária.
          - `messagesWarn.botPermission`: definir a mensagem que o bot não possui a permissão.
          - `messagesWarn.err`: Definir mensagem de avisar quando ocorre erro na aplicação.
      - `Client.CommandsRegister.registerCommands(__dirname+"/./caminho)`: definir aonde fica a pasta dos comandos.

    - `Command(client, info)`: Instância responsável por estruturar o comando do bot

        - `info.command`: Nome do comando. (Obrigatório)
        - `info.aliases`: Nomes alternativos para este comando.
        - `info.description`: Descrição do comando.
        - `info.isOwner`: Se o comando é permitido somente para desenvolvedores (true/false)
        - `info.permissions`: Permissões do comando.
          - `permissions.bot`: Permissão que o bot precisa para executar este comando.
          - `permissions.member`: Permissão que o membro precisa para executar este comando.


## Exemplo de Como usar
  - Iniciar o bot
      ```js
      const DiscordCS = require('discordCS')
      const client = new DiscordCS.Client({
        token: 'token do bot',
        prefixes: 'prefixo do bot',
        readylib: false
      })

      client.on('ready', () =>{
        console.log('iniciado com sucesso')
        client.CommandsRegister.registerCommands(__dirname+'/./caminho_command')
      })
      ```
  - Iniciar um comando
    ```js
    const {Command} = require('discordCS')
        class ping extends Command{
            constructor(client){
                super(client,{
                    command: 'ping',
                    module: 'teste',
                    aliases: ['p'],
                    description: 'ping pong',
                })
            }

          async startCommand(message, args){
                message.channel.send('pong!')
            }
        }
        module.exports = ping
    ```
## Pull requests
  Como eu ando muito sem tempo e cheio de tarefas para fazer, eu decidi já postar uma parte deste projeto que eu pretendo focar, claro se vocês curtirem ele vai ter seus updates, como funções novas e entre outros, por enquanto aqui vai estar uma explicação bem resumida de como usa esta lib, pois como eu disse ANDO SEM TEMPO, então iria demorar um pouco para eu lançar um site para documentar tudo sobre este projeto, então por enquanto as instruções acima irão permanecer aqui até que eu desenvolva um site, agora vamos para as pull requests.

  - Bom, como eu sou uma pessoa só, preciso da força de vocês para que eu possa melhorar meu projeto, caso você tenha interesse em melhora-lo, maravilha! só seguir as instruções a seguir para dar aquele pull request TOP de linha.
    * Código estruturado utilizando classes e métodos
    * Código bem comentado, para que eu possa entender melhor seu código.
    * variáveis em inglês e que seja bem claras o que elas fazem, pois como a linguagem em si é em inglês é melhor você delcarar as variáveis em inglês né :V.
    * Comentar na hora de dar seu pull request , opinando o porque seu código melhoraria na lib, quais são suas vantagens.
## Links
* [Franklin Bot](https://discordapp.com/oauth2/authorize?client_id=500473582980300801&scope=bot&permissions=8)
* [Servidor do Franklin](https://discord.gg/vwN3dJv) (por aqui você pode tirar suas dúvidas)

## Avisos
  Este projeto está em fase de testes ainda, então pode ocorrer alguns bugs, como ando sem tempo, algumas coisas eu fiz meio que correndo durante a madrugada, então qualquer erro só mandar no servidor *Servidor do Franklin* obrigado pela sua força e até a próxima.
