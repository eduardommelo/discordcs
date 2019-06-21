██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗  ██████╗███████╗
██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║██║     ███████╗
██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║██║     ╚════██║
██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝╚██████╗███████║
╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝╚══════╝
**Aqui aonde fica os ultimos updates feito na biblioteca**

## Update Versão 1.0.6 [21/06/2019 | 18:18]

    - Corrigido bug de comparar os comandos alternativos.
    - Corrigido bug dele não filtrar ids duplicadas no objeto options.guilds
    - Adicionado novos parâmetros
        - {bot}: Menção do bot. 
        - {bot.username}: Username do bot.
        - {bot.id}: ID do bot.
        - {bot.tag}: tag do bot.
    - Corrigido alguns erros de português
    - Uma nova função foi adicionada para a Instância client
        -options.mentionBot: Fazer o bot responder assim que ele é mencionado.
            -   mentionBot.rest: true/false para ver se ele responde ou não.
            - mentionBot.message: Personalizar a mensagem do bot na hora de responder.
    - Novas logs adicionadas como
        - Ver comandos carregados.
        - Ver quando sai e entra do servidor.
    