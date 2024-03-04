const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/html ; charset=UTF-8')
    res.end('<h1>Bienvenido a mi página de inicio!</h1>')
  } else if (req.url === '/contacto') {
    res.setHeader('Content-Type', 'text/html ; charset=UTF-8')
    res.end('<h1>Contáctame en <a target="__blank" href="https://www.linkedin.com/in/emanuel-pesci/">Linkedin</a></h1>')
  } else if (req.url === '/imagen-messi-pito-largo.jpg') {
    fs.readFile('./messi.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500 // Internal Server Error
        res.setHeader('Content-Type', 'text/html ; charset=UTF-8')
        res.end('<h1>500 - Error interno del servidor</h1>')
      } else {
        res.statusCode = 200 // OK
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // Not Found
    res.setHeader('Content-Type', 'text/html ; charset=UTF-8')
    res.end('<h1>404 - Página no encontrada</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server levantado en http://localhost:${desiredPort}`)
})
