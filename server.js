//load the modules
const express = require(`express`)
const cors = require(`cors`)
const http = require(`http`)
const path = require(`path`)

//global vars
const PORT = process.env.PORT || 5000
process.setMaxListeners(100)

//create the server app -> use the modules
let app = express()
app.use(cors())
app.use(express.json())

//create static folder with read access
app.use(express.static(__dirname + '/build/'))

//send back the index.html in the static "build" folder
app.get(`/*`, (req, res) => res.sendFile(path.join(__dirname))) 

//routes
app.use(`/api/heros`, require(`./server/routes/heros`))

//apply the http server -> use the http
const server = http.createServer(app)

//run the server
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })
