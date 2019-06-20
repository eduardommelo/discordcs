const {Collection} = require('discord.js')
class modules{
    constructor(client, options){
        this.validateModule(client ,options)
        this.name = options.name
        this.description = options.description
        this.commands = new Collection()
        this.emoji = options.emoji || ''
        this.nameID = options.nameID || ''
    }
    validateModule(client,options){
        if(!client) throw new Error('[ERRO] a client não está definida')
        if(typeof options.name === 'undefined') throw new Error('[ERRO] Obrigatório adicionar nome do plugin')
        if(typeof options.description === 'undefined') options.description = ''
        if(typeof options.emoji === 'undefined') options.emoji = ''
        if(typeof options.nameID === 'undefined') options.nameID = options.name

    }
}
module.exports = modules