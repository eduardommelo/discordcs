const version = require('../../package.json')
module.exports = (client)=>{
console.log(`
██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗  ██████╗███████╗
██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║██║     ███████╗
██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║██║     ╚════██║
██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝╚██████╗███████║
╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝╚══════╝
    ~~Desenvolvido por: Eduardo Melo (Eduardo#0001) : V${version.version}~~                                                                
`)
}