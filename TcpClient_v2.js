var net = require('net')
var tcpClient = new net.Socket()
var PORT = 3000

var sleep = require('sleep')

//var mongo = require('mongodb')
//var mongo_host = 'localhost'
//var mongo_port = mongo.Connection.DEFAULT_PORT
//var mongo_db = new mongo.Db('raspi', new mongo.Server(mongo_host, mongo_port, {}), {})

//mongo.open(function(err, db) {
//    db.collection('ip_table', function(err, collection) {
//        collection.find()
//    })
//})

var HOST = ['192.168.0.118', '192.168.0.126']
// var HOST = ['192.168.0.118']


while (true) {
    for (var ip in HOST) {
        var tmp = new net.Socket()
        connectToIp(tmp, ip)
    }
//HOST.forEach(
//    function(IP) {

//        var tmp = new net.Socket()
//        connectToIP(tmp, IP) 
//    }
    //sleep.sleep(5)
//)
}

function connectToIP(tmp, _ip) {
    tmp.connect(PORT, _ip, function() {
        console.log(' OK! ----------------> ' + _ip)    
    })

    tmp.on('data', function(data) {
        console.log('Received data: ' + data.toString() + ' from ' + _ip)
        
        if (data.toString() == 'ok') {
            tmp.destroy()
        }
    })

    tmp.on('close', function() {
        console.log('Close ----> ' + _ip)
    })

    tmp.on('error', function(e) {
        if (e.code == 'ECONNREFUSED') {
            console.log(_ip + ' error: ' + e.code)
        }
    })
}

