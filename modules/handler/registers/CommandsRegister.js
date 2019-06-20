const {Collection} = require('discord.js')
const Modules = require('../structures/modules')
const Command = require('../structures/command')
class CommandsRegister {
    constructor(client){
        this.client = client
        this.modules = new Collection()
        this.commands = new Collection()
        this.commandsPath = null
    }

    registerModule(name, description, emoji, nameID){
        if(typeof name === 'string') return this.registerModules([name, description, emoji, nameID])
    }

    registerModules(module){
        if(typeof module != 'object') throw new TypeError('[ERROR] O argumento precisa ser um objeto.')
        if(typeof module === 'object') module =  new Modules(this.client, module)
        if(this.modules.get(module.name))throw new Error('[ERRO] existe mais de um módulo com mesmo nome.')
        this.modules.set(module.name, module)
    }

    registerCommand(commands){
        
        try{
        if(!Array.isArray(commands)) throw new TypeError('[ERRO] O comando precisa ser um array.')
        for(let cmds of commands){
            if(typeof cmds === 'function') cmds = new cmds(this.client)
            if(!(cmds instanceof Command)){
                this.client.emit('warn', `Estou tentando adicionar um comando inválido ${cmds}`)
                continue
            }
                for(const a  of cmds.aliases){
                    if(this.commands.some(c => c.command === a || cmds.aliases.includes(a))){
                        throw new Error('[ERRO] este alternativa já existe.')
                    }
                }
                if(cmds.module == true || typeof cmds.module !== 'undefined'){
                    const modules = this.modules.get(cmds.module)
                    if(!modules) throw new Error('[ERRO] não foi registrado o módulo '+ cmds.module)
                    cmds.module = modules
                    modules.commands.set(cmds.command, cmds)
                    this.commands.set(cmds.command, cmds)
                    return
                }
                this.commands.set(cmds.command, cmds)
        }
        return this
    }catch(err){
        console.log(err)
    }
    }
    registerCommands(options){
        const object = require('require-all')(options)
        const cmds = []
        for(const modules of Object.values(object)){
            if(typeof modules === 'function'){
                cmds.push(modules)
            }
            for(let command of Object.values(modules)){
                if(typeof command.default === 'function') command = command.default
                    cmds.push(command)
            }
        }
        if(typeof options === 'string' && !this.commandsPath) this.commandsPath = options
        return this.registerCommand(cmds) 
    }
}

module.exports = CommandsRegister