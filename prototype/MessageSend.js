const {Message} = require('discord.js')
const config = require('../../config/bot.json')
module.exports = class MessageSend{
    static start(){
        Message.prototype.sendMessage  = function send(msg){
            this.channel.send(config.emoji_message.sucess_message+' **|** '+this.author +', '+msg)
        }
        Message.prototype.errorMessage = function send(msg){
            this.channel.send(config.emoji_message.err_message+' **|** '+this.author +', '+msg)
        }
    }
}