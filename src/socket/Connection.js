const WebSocket = require('ws')
const {WSk, LIB, OPCODE} = require('../config/Constants.js')

/**
 * @typedef {Connection} - Conexão emitido com websocket
 * @property {String} token - Emitido token da aplicação do cliente.
 * @property {String} 
 */
 /**
  * @param {Connection} [client] - Opções que serão emitidas da classe Client.js
  */
  /**
   * Realizar conexão com o Discord
   * @param {Connection} - Conexão com WebSocket Discord V6.0
   */
class Connection {
    constructor(client){  
    /**
     * Realizar conexão com WebSocket
    */
    /**
     * Token da aplicação do cliente
     * @type {Connection}
     * @private
     */
    this.token = client.token
    /**
     * WebSocket que será emitido do gateway do discord. //gateway.discord.gg/
     * @type {Connection}
     * @private
     */
    this.connect(WSk.geteway+'?v='+WSk.version+'&encoding='+WSk.encoding, 0)
    }
    /**
     * 
     * @function
     * @name connect - Emitir conexão para websocket 
     */
    connect(gateway,reconect = 0){
        if(reconect !== 0) return setTimeout(() => this.connect(gateway, false, 0), reconect)
        const ws = new WebSocket(gateway)
        ws.on('message', async result => this.onMessage(result))
        ws.on('open', async () => this.onOpen())
        ws.on('close', async result => this.onClose(result))
        this.ws = ws
    }
    /**
     * @function
     * @name onMessage 
     */
    onMessage(result){
        const ev = JSON.parse(result)
        if(ev.op !== 0){
            console.log('Status Opcode:'+ev.op + ' informações \n')
            console.log(ev)
        }
        this.sequence = -1
        switch(ev.op){
            case OPCODE.HELLO : return this.heartbeat(ev.d.heartbeat_interval)
            case OPCODE.HEARTBEAT_ACK : return console.log('caiu')
            case OPCODE.RECONNECT : return this.reconnect()
            case OPCODE.INVALID_SESSION : if(!result.d) this.sessionId = null
            this.sequence = -1
            return this.identify(result.d ? 2500 : 0)
            case OPCODE.IDENTIFY : console.log(ev)
        }
    }
    /**
     * Função identify
     * @function
     * @name
     * 
     */
    identify(time){
        if(time) return settimeout(()=> this.identify.bind(this), time)
        return this.sessionId ? this.resumeIdentify() : this.newIdentify()
    }
    /**
     * @function
     * @name resumeItentify()
     */
    resumeIdentify(){
        this.send({
            token: this.token,
            session_id: this.sessionId,
            seq: this.sequence
          })
    }
    /**
     * Função emitida assim quando requisita no gateway
     * @function
     * @name onOpen
     */
     onOpen(){ this.send(this.setOpCode(OPCODE.IDENTIFY))}
    /**
     * 
     * @function
     * @name heartbeat - Emitir pulsação para websocket 
     */
    heartbeat(time){
    
        if(!isNaN(time)){
            if(time === -1){
                clearInterval(this.intervalHeartBeat)
                this.intervalHeartBeat = null
            }else{
                this.intervalHeartBeat = setInterval(() => this.heartbeat(), time)
            }
            return
        }
        this.send(this.setOpCode(OPCODE.HEARTBEAT_ACK))
    }
     /**
     * 
     * @function
     * @name setOpCode - caso seja opcode que precisa ser enviado para gateway, será encaminhado o objeto especifico 
     */
    setOpCode(op){
        const os = require('os')
        switch(op){
            case OPCODE.IDENTIFY:
                return {
                    op: OPCODE.IDENTIFY,
                    d:{
                        token: this.token,
                        properties:{
                            $os: os.platform(),
                            $browser: LIB.NAME,
                            $device: LIB.NAME
                        }
                    },
                    s: 0,
                    t: 0
                }
            case OPCODE.RESUME :
                return{
                    op: OPCODE.RESUME,
                    token: this.token,
                    session_id : this.sessionId
                }
            case  OPCODE.HEARTBEAT_ACK :
                return{
                    op: OPCODE.HEARTBEAT,
                    d: this.sequence
                }
            case OPCODE.INVALID_SESSION:
                return {
                    op: INVALID_SESSION,
                    d: false
                }
        }
          
    }
    /**
     * Emitir quando o cliente for fechado
     * @function
     * @name onMessage
     */
    onClose(result){

    }
    /** Realizar uma reconectar com o websocket
     * @function
     * @name reconnect
     */
    reconnect(gateway){
        this.connect(gateway, 4)
    }
    /**Desconectar do WebSocket
     * @function
     * @name disconnect
     */
    disconnect(){

    }
    /**
     * Destruir todo os cache caso a aplicação cliente esteja rodando
     * @function
     * @name destroy
     */
    destroy(){
        
        this.disconnect()
    }
    /**
     * função sendo para enviar para gateway discord
     * @function
     * @name send
     */
    send(json){
        this.ws.send(JSON.stringify(json))
    }
}
module.exports = Connection
