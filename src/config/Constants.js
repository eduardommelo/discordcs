/**
 *  WebSocket configuração
 *  https://discordapp.com/developers/docs/topics/gateway
 */
module.exports.WSk ={
    geteway: 'wss://gateway.discord.gg/',
    version: '6',
    encoding: 'json'
}
/**
 *  Informações sobre a lib
 */
module.exports.LIB ={
    NAME: 'discordcs',
    DESCRIPTION: 'lib focada em desenvolvimento de aplicações em JavaScript.'
}
/**======================================================================================\
 *  Os status que são retornados do websocket                                            |
 * https://discordapp.com/developers/docs/topics/opcodes-and-status-codes#gateway-opcodes|
 * =======================================================================================/
 *  Dispatch - Dispacha um evento.
 *  HeartBeat - Verificação de ping
 *  Identify -  Para um "aperto de mão" para o client.
 *  Status Update - Ingressar ou deixar os canais de voz
 *  Voice Guild Ping - Verificação de ping com canais de voz.
 *  Resume - Retomar uma conexão fechada
 *  Reconnect - Para se reconectar ao cliente.
 *  Request Guild Members - Solicitar Membros da Guild
 *  Invalid Session - Informar que a sessão é inválida.
 *  Hello - Enviado e recebido as informações do WebSocket por mediato.
 *  Heartbeat ACK - Enviado após pulsação do cliente recebido.
 */
module.exports.OPCODE ={
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    STATUS_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    VOICE_GUILD_PING: 5,
    RESUME: 6,
    RECONNECT: 7,
    REQUEST_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11
}
/**
 *  Os eventos que é emitido no websocket
 */
module.exports.EventsEmitter ={
    RATE_LIMIT: 'RATE_LIMIT',
    READY: 'READY',
    RESUME: 'RESUME',
    GUILD_CREATE: 'GUILD_CREATE',
    GUILD_DELETE: 'GUILD_DELETE',
    GUILD_UPDATE: 'GUILD_UPDATE',
    GUILD_UNAVAILABLE: 'GUILD_UNAVAILABLE',
    GUILD_AVAILABLE: 'GUILD_AVAILABLE',
    GUILD_MEMBER_ADD: 'GUILD_MEMBER_ADD',
    GUILD_MEMBER_REMOVE: 'GUILD_MEMBER_REMOVE',
    GUILD_MEMBER_UPDATE: 'GUILD_MEMBER_UPDATE',
    GUILD_MEMBER_AVAILABLE: 'GUILD_MEMBER_AVAILABLE',
    GUILD_MEMBER_SPEAKING: 'GUILD_MEMBER_SPEAKING',
    GUILD_MEMBERS_CHUNK: 'GUILD_MEMBERS_CHUNK',
    GUILD_INTEGRATIONS_UPDATE: 'GUILD_INTEGRATIONS_UPDATE',
    GUILD_ROLE_CREATE: 'GUILD_ROLE_CREATE',
    GUILD_ROLE_DELETE: 'GUILD_ROLE_DELETE',
    GUILD_ROLE_UPDATE: 'GUILD_ROLE_UPDATE',
    GUILD_EMOJI_CREATE: 'GUILD_EMOJI_CREATE',
    GUILD_EMOJI_DELETE: 'GUILD_EMOJI_DELETE',
    GUILD_EMOJI_UPDATE: 'GUILD_EMOJI_UPDATE',
    GUILD_BAN_ADD: 'GUILD_BAN_ADD',
    GUILD_BAN_REMOVE: 'GUILD_BAN_REMOVE',
    CHANNEL_CREATE: 'CHANNEL_CREATE',
    CHANNEL_DELETE: 'CHANNEL_DELETE',
    CHANNEL_UPDATE: 'CHANNEL_UPDATE',
    CHANNEL_PINS_UPDATE: 'CHANNEL_PINS_UPDATE',
    MESSAGE_CREATE: 'MESSAGE_CREATE',
    MESSAGE_DELETE: 'MESSAGE_DELETE',
    MESSAGE_UPDATE: 'MESSAGE_UPDATE',
    MESSAGE_BULK_DELETE: 'MESSAGE_BULK_DELETE',
    MESSAGE_REACTION_ADD: 'MESSAGE_REACTION_ADD',
    MESSAGE_REACTION_REMOVE: 'MESSAGE_REACTION_REMOVE',
    MESSAGE_REACTION_REMOVE_ALL: 'MESSAGE_REACTION_REMOVE_ALL',
    USER_UPDATE: 'USER_UPDATE',
    USER_NOTE_UPDATE: 'USER_NOTE_UPDATE',
    USER_SETTINGS_UPDATE: 'USER_SETTINGS_UPDATE',
    USER_GUILD_SETTINGS_UPDATE: 'USER_GUILD_SETTINGS_UPDATE',
    PRESENCE_UPDATE: 'PRESENCE_UPDATE',
    VOICE_STATE_UPDATE: 'VOICE_STATE_UPDATE',
    TYPING_START: 'TYPING_START',
    TYPING_STOP: 'TYPING_STOP',
    WEBHOOKS_UPDATE: 'WEBHOOKS_UPDATE',
    DISCONNECT: 'DISCONNECT',
    RECONNECTING: 'RECONNECTING',
    ERROR: 'ERROR',
    WARN: 'WARN',
    DEBUG: 'DEBUGb',
}