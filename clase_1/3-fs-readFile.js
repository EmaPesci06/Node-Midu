const fs = require('node:fs')

console.log('Leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf-8', (err, data) => {
  console.log(data)
  console.error(err)
})

console.log('Haciendo otras cosas mientras se lee el archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, data) => {
  console.log(data)
  console.error(err)
})
