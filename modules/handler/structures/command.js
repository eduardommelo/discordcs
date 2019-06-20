const jsonMessage = require('../../../JSON/warn.json')
class Command{
    constructor(client, commandInfo){
        this.validateCommand(client, commandInfo)
        this.command = commandInfo.command
        this.aliases = commandInfo.aliases || []
        this.description = commandInfo.description
        this.module = commandInfo.module
        this.isOwner = Boolean(commandInfo.isOwner) || false
        this.label = commandInfo.label
        this.permissionsBot = commandInfo.permissionsBot || []
        this.jsonMessage = jsonMessage
        this.permissions = commandInfo.permissions
    }
    async startCommand(message, args){
        throw new Error('[ERROR] você não definiu o método startCommand(message, args){}')
    }
    validateCommand(client, info){
        if(!client) throw new Error(this.jsonMessage.errClient)
        if(typeof info.command === 'undefined') throw new TypeError(this.jsonMessage.commanArgs)
        if(typeof info.aliases === 'undefined') info.aliases = []
        if(typeof info.description === 'undefined') info.description = false
        if(typeof info.label === 'undefined') info.label = false
        if(typeof info.permissionsBot === 'undefined' ) info.permissionsBot = false
        if(typeof info.module === 'undefined' ) info.permissionsBot = false
        if(typeof info.permissions === 'undefined' ) info.permissions = null
    }
}
module.exports = Command