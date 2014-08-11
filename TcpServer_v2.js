var net = require('net')
var tcpServer = net.createServer()

tcpServer.on('connection', function(client) {
    if (client.writable) {
        client.write('ok')
    } else {
        console.log('Error: Can\'t send message to ' + client.remoteAddress)
    }

    client.on('data', function(data) {
        console.log('Received data: ' + data.toString()) 
    })

    client.on('end', function() {
        console.log('Connection Colsed')
    })
})

tcpServer.listen(3000)
