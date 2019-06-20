const {Client} = require('discord.js')
const Handle = require('../handler/handler')
const CommandsRegister = require('../handler/registers/CommandsRegister')
const jsonMessages = require('../../JSON/warn.json')
const ready = require('./ready')

/**
 * Esta classe é o núcleo aonde vai acontecer 90% de suas requisições
 * caso queira melhorar enviando seu pull request , segue as instruções no github
 */

/**
 * @extends Client
 */
class DiscordCS extends Client{
    /**
     * @typedef {Object} OOConfig - Objeto configurações da instância 
     * @param {string[]} prefixes - prefixos da instância (obrigatório pelo menos 1 prefixo)
     * @param {string[]} owners - owners da instância (Desenvolvedores do bot) (opcional)
     * @param {string}   token - Token de autenticação do bot (obrigatório)
     * @param {string[]} guilds - Servidores (opcional)
     * @param {Object}   cooldown - caso queira configurar cooldown. (opcional)
     * @param {boolean}  isEveryOne - se o bot pode mandar everyone. (opcional)
     * @param {string}   description - descrição do bot. (opcional)
     * @param {boolean}  [readylib=true] - iniciar o ready mostrando os crédtitos do criador da biblioteca
     * @param {boolean} [logs=false] - ver as atividades ao iniciar o bot
     * @param {string} messagesWarn - mensagens de aviso da client
     */

    /**
     * @param {OOConfig} OOClient  - Objeto criado para configurar a lib
     */
     constructor(options = []){
         /*
            Validar os objeto 
         */
        if(typeof options.prefixes === 'undefined' || !options.prefixes) throw new Error(jsonMessages.prefixErr)
        if(typeof options.cooldown === 'undefined') options.cooldown = false
        if(typeof options.description === 'undefined') options.description = false
        if(typeof options.readylib == 'undefined') options.readylib = true
        if(typeof options.guilds === 'undefined') options.guilds = false
        if(typeof options.description === 'undefined') options.description = false
        if(typeof options.messagesWarn === 'undefined') options.messagesWarn = false
        if(typeof options.token === 'undefined') throw new TypeError(jsonMessages.tokenErr)
        if(typeof options.logs === 'undefined') options.logs = true

        super(options)
        //==============================//
        this.jsonMessages = jsonMessages
        this._messagesWarn = options.messagesWarn
        this.CommandsRegister = new CommandsRegister(this)
        this.handler = new Handle(this, this.CommandsRegister)
        this._prefixes = options.prefixes
        this._owners = options.owners || []
        this._guilds = options.guilds || []
        this._description = options.description
        this._readylib = options.readylib
        this._isEveryOne = Boolean(options.isEveryOne)
        this._token = options.token
        this._cooldown = options.cooldown
        this._logs = options.logs
        //==============================//
        if(options.token){
            this.login(options.token).catch(err => console.log(err))
        }
        this.fetchUsers(this,options)
        // evento message e UpdateMessage, ready, guildCreate
        this.on('ready', () =>{
            if(options.readylib === true){
                ready(this)
            }
            if(options.guilds){
                if(Array.isArray(options.guilds)){
                    for(const gs of options.guilds){
                        const guilds = this.guilds.get(gs)
                        if(guilds){
                            if(options.logs == false) return
                            const sucessArray = this.jsonMessages.guildsMessage
                            .replace('{guild}', guilds.name)
                            .replace('{guild.id}', guilds.id)
                            .replace('{g.id}', options.guild)
                            console.log(sucessArray)
                        }else
                        {
                            if(options.logs == false) return
                            const errArray = this.jsonMessages.guildsErr
                            .replace('{g.id}', options.guild)
                            console.log(errArray)
                        }
                    }
                }else{
                    const guild = this.guilds.get(options.guilds)
                    if(guild){
                        if(options.logs == false) return
                        const sucess = this.jsonMessages.guildsMessage
                        .replace('{guild}', guild.name)
                        .replace('{guild.id}', guild.id)
                        .replace('{g.id}', options.guild)
                        console.log(sucess)
                    }else{
                        if(options.logs == false) return
                        const err = this.jsonMessages.guildsErr
                        .replace('{g.id}', options.guild)
                        console.log(err)

                    }
                }
                if(!Array.isArray(options.guilds)){
                    this.guilds.map(g =>{
                        if(g.id != options.guilds ) return g.leave().then(r =>{
                            const guildCreate = this.jsonMessages.guildDelete.replace('{guild}', r.name).replace('{client.tag}', this.user.tag)
                            console.log(guildCreate)
                        })

                        return
                    })
                }else if(Array.isArray(options.guilds)){
                    this.guilds.map(g =>{
                        if(options.guilds.includes(g.id) == false){
                            if(options.logs == false) return
                            g.leave().then(r =>{
                                const guildCreate = this.jsonMessages.guildDelete.replace('{guild}', r.name).replace('{client.tag}', this.user.tag)
                                console.log(guildCreate)
                            })
                            return
                        }
                    })
                }
            }
           
        })
        this.on('guildCreate', guild =>{
            if(options.guilds){
                if(!Array.isArray(options.guilds)){
                        if(guild.id != options.guilds ) return guild.leave().then(r =>{
                            const guildCreate = this.jsonMessages.guildDelete.replace('{guild}', r.name).replace('{client.tag}', this.user.tag)
                            console.log(guildCreate)
                        return
                    })
                }else if(Array.isArray(options.guilds)){
                        if(options.guilds.includes(guild.id) == false){
                            if(options.logs == false) return
                            guild.leave().then(r =>{
                                const guildCreate = this.jsonMessages.guildDelete.replace('{guild}', r.name).replace('{client.tag}', this.user.tag)
                                console.log(guildCreate)
                            }).catch(e => console.log(e))
                            return
                        }
                   
                }
            }
        })
        this.on('message', message => this.handler.commandMessages([message]))
        this.on('messageUpdate', (newMessage, oldMessage) => this.handler.commandMessages([oldMessage, newMessage]))
    }

    get getPrefixes(){
        if(!this._prefixes) return null
        return this._prefixes
    }

    set setPrefixes(p){
        this._prefixes = p
    }

    get getOwners(){
        if(!this._owners) return null
        return this._owners
    }
    get getDescription(){
        if(!this._description) return null
        return this._description
    }

    get getCooldown(){
        if(!this._cooldown) return null
        return this._cooldown
    }

    set setCooldown(p){
        this._cooldown=p
    }
    get getGuilds(){
        if(!this._guilds) return null
        return this._guilds
    }
    get getToken(){
        if(!this._token) return null
        return this._token
    }

    get getLogs(){
        if(!this._logs) return null
        return this._logs
    }
    get getMessageWarn(){
        if(!this._messagesWarn) return null
        return this._messagesWarn
    }

    /**
     * 
     * Valida as configurações setada na instancia.
     */
    fetchUsers(client, options){
        if(options.owners){
            client.once('ready', () =>{
                if(options.owners instanceof Array || options.owners instanceof Set){
                    for(const o of options.owners){
                        client.fetchUser(o).then(user => {
                            if(options.logs == false) return;
                            const fetchUsers = this.jsonMessages.fetchUser.replace('{member.username}', user.username)
                            console.log(fetchUsers)
                        }).catch(err =>{
                            if(options.logs == false) return
                            options.owners = false
                            const fetchUsers = this.jsonMessages.fetchUserError
                            console.log(fetchUsers)
                        })
                    }
                }else{
                    client.fetchUser(options.owners).then(user => {
                        if(options.logs == false) return
                        const fetchUsers = this.jsonMessages.fetchUser.replace('{member.username}', user.username)
                        console.log(fetchUsers)
                    }).catch(err =>{
                        if(options.logs == false) return
                        options.owners = false
                        const fetchUsers = this.jsonMessages.fetchUserError
                        console.log(fetchUsers)
             
                
                    })
                }
            })
        }
    }

}

module.exports = DiscordCS