const { readFile } = require('node:fs/promises')

;(async () => {
  console.log('Leyendo el primer archivo....')
  const text = await readFile('./archivo.txt', 'utf-8')
  console.log('Primer texto', text)

  console.log(' -------> Haciendo otras cosas mientras se lee el archivo...')

  const text2 = await readFile('./archivo2.txt', 'utf-8')
  console.log('Segundo texto', text2)
})()
