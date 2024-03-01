const os = require('node:os')

console.log('Información del sistema operativo: ')
console.log('---------------------')

console.log('Nombre del sistema operativo: ', os.platform())
console.log('Versión del sistema operativo: ', os.release())
console.log('Arquitectura del sistema operativo: ', os.arch())
console.log('CPU: ', os.cpus())
console.log('Memoria libre: ', os.freemem() / 1024 / 1024, 'MB')
console.log('Memoria total: ', os.totalmem() / 1024 / 1024, 'MB')
console.log('Uptime', os.uptime() / 60 / 60 / 24, 'días')
