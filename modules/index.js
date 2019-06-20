module.exports = {
    Client:     require('./util/DiscordCS.js'),
    Command:   require('./handler/structures/command.js'),
    Modules:   require('./handler/structures/modules.js'),
    Handle:     require('./handler/handler.js'),
    CommandsRegister:  require('./handler/registers/CommandsRegister')
}