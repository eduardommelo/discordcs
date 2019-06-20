const jsonMessage = require('../../JSON/warn.json')
class handler{
    constructor(client, commandsRegister){

        this.client = client
        this.cooldown = new Set()
        this.commandsRegister = commandsRegister
        this._jsonMessage = jsonMessage

    }

    async commandMessages(message){
        try{
            
            /**
             *  Aqui aonde fica a parte que será passada os comandos e verificado se ele realmente existe junto
             *  com as config feitas na instância client
             */
            const oldMessage = message[0] 
            if(oldMessage.channel.type == 'dm') return
            if (oldMessage.content.indexOf(this.client.getPrefixes) !== 0) return
            const args = oldMessage.content.slice(this.client.getPrefixes.length).trim().split(/ +/g)
            const command =(args.shift().toLowerCase() || oldMessage.guild.members.get(args[0]))
           for(const cmd of this.commandsRegister.commands.values()){
               if(cmd.command.toLowerCase() === command || cmd.aliases.includes(command.toLowerCase())){
                if(cmd.permissions != null){
                    if(cmd.permissions.member){
      
                            const messageHas = this.client.getMessageWarn == null || !this.client.getMessageWarn ? jsonMessage.hasPermission: this.client.getMessageWarn.hasPermission
                            const permHas = typeof cmd.permissions.member == 'undefined' || cmd.permissions.member == '' ? '': cmd.permissions.member;
                            let array_hasPermissions = []
                            const arrayhas = array_hasPermissions == '' ? permHas : array_hasPermissions
                            let require_permHas = messageHas
                            .replace('{permissions}',Array.isArray(arrayhas) ? arrayhas.join(', '): arrayhas)
                            .replace('{member}',oldMessage.author)
                            .replace('{member.id}', oldMessage.author.id)
                            .replace('{member.tag}', oldMessage.author.tag)
                            .replace('{guild}', oldMessage.guild.name + ' ('+oldMessage.guild.id+')')
                            .replace('{guild.id}', oldMessage.guild.id)
                            .replace('{guild.name}', oldMessage.guild.name)
                            .replace('{command}', cmd.command)
                            if(Array.isArray(permHas)){
                                for(const has of permHas){
                                    if(!oldMessage.member.hasPermission(has)){
                                        array_permissions.push(has)
                                    }
                                }
                                if(array_permissions.length > 0){
                                    oldMessage.channel.send(require_permHas)
                                    return
                                }
                            }else
                            {
                                if(!oldMessage.member.hasPermission(permHas)){
                                    oldMessage.channel.send(require_permHas)
                                    return
                                }
                            }

                    }
                    if(cmd.permissions.bot){
                        const messagePerm = this.client.getMessageWarn == null ? jsonMessage.permissionBot : this.client.getMessageWarn.botPermission
                        const perm = typeof cmd.permissions.bot == 'undefined'|| cmd.permissions.bot == '' ? '' : cmd.permissions.bot ;
                        let array_permissions = []
                        const arrayIs = array_permissions == '' ? perm : array_permissions
                        let require_perm = messagePerm
                        .replace('{permissions}',Array.isArray(arrayIs) ? arrayIs.join(', '): arrayIs)
                        .replace('{member}',oldMessage.author)
                        .replace('{member.id}', oldMessage.author.id)
                        .replace('{member.tag}', oldMessage.author.tag)
                        .replace('{guild}', oldMessage.guild.name + ' ('+oldMessage.guild.id+')')
                        .replace('{guild.id}', oldMessage.guild.id)
                        .replace('{guild.name}', oldMessage.guild.name)
                        .replace('{command}', cmd.command)
                        if(Array.isArray(perm)){
                            for(const p of perm){
                                if(!oldMessage.guild.me.hasPermission(p)){
                                    array_permissions.push(p)
                                }
                            }
                            if(array_permissions.length > 0){
                                oldMessage.channel.send(require_perm)
                                return
                            }
                        }else
                        {
                            if(!oldMessage.guild.me.hasPermission(perm)){
                                oldMessage.channel.send(require_perm)
                                return
                            }
                        }
                    } 
                }
                if(this.client.getCooldown)
                {
                    if(this.client.getCooldown.set == true){
                      
                        if(this.cooldown.has(oldMessage.author.id)){
                          
                            const cooldownMessage = typeof this.client.getCooldown.msg == 'undefined' ? this._jsonMessage.warnCooldown : this.client.getCooldown.msg
                            const warnCooldown = cooldownMessage
                            .replace('{member}',oldMessage.author)
                            .replace('{member.id}', oldMessage.author.id)
                            .replace('{member.tag}', oldMessage.author.tag)
                            .replace('{guild}', oldMessage.guild.name + ' ('+oldMessage.guild.id+')')
                            .replace('{guild.id}', oldMessage.guild.id)
                            .replace('{guild.name}', oldMessage.guild.name)

                            oldMessage.channel.send(warnCooldown+'')
                            return
                        }
                        const time= typeof this.client.getCooldown.time === 'string' ? parseInt(this.client.getCooldown.time) : this.client.getCooldown.time
                        if(!this.cooldown.has(oldMessage.author.id)){
                            this.cooldown.add(oldMessage.author.id)
                            setTimeout(()=>{
                                this.cooldown.delete(oldMessage.author.id)
                            }, 1000 * time)
                        }
                    }
                }
                   let owner = ''
                   if(!Array.isArray(this.client.getOwners)){
                        owner = oldMessage.author.id === this.client.getOwners
                   }else{owner = this.client.getOwners.includes(oldMessage.author.id)}
                  if(cmd.isOwner == true && owner == false){
                      if(this.client.getMessageWarn == false || this.client.getMessageWarn == null){
                        oldMessage.channel.send(this._jsonMessage.warnOwner)
                          return
                      }
                      const warnOwner = typeof  this.client.getMessageWarn.owner == 'undefined' ? this._jsonMessage.warnOwner: this.client.getMessageWarn.owner
                      const warnMessage = warnOwner
                      .replace('{member}', oldMessage.author)
                      .replace('{member.id}', oldMessage.author.id)
                      .replace('{member.tag}', oldMessage.author.tag)
                      .replace('{guild}', oldMessage.guild.name + '('+oldMessage.guild.id+')')
                      .replace('{guild.id}', oldMessage.guild.id)
                      .replace('{guild.name}', oldMessage.guild.name)
                      oldMessage.channel.send(warnMessage)
                    return
                  }
                    const newMessage = message[1]
                    if(typeof newMessage != 'undefined'){
                        const args_n = newMessage.content.slice(this.client.getPrefixes.length).trim().split(/ +/g)
                        const command_n =(args_n.shift().toLowerCase() || newMessage.guild.members.get(args_n[0]))
                        if(command === command_n) return;
                    }
                   cmd.startCommand(oldMessage, args)
               }
           }
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = handler