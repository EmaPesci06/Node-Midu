// const { promisify } = require("node:util");
// const readFilePromise = promisify(fs.readFile);

const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo')
fs.readFilePromise('./archivo.txt', 'utf-8').then(data => {
  console.log('primer texto:', data)
})

console.log('Haciendo otras cosas mientras se lee el archivo...')

fs.readFilePromise('./archivo2.txt', 'utf-8').then(data => {
  console.log('segundo texto:', data)
})
