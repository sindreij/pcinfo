var io = require('socket.io').listen(7890);
var dns = require('dns');

io.sockets.on('connection', function(socket) {
    socket.on('data', function(data) {
        data.ip = socket.handshake.address.address;
        dns.reverse(data.ip, function(err, domains) {
            data.hostname = domains;
            console.log(data);
            socket.emit('extradata', {ip: data.ip, hostname: data.hostname})
            socket.broadcast.emit('data', data);
        });
    });
});