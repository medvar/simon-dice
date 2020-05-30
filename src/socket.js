const SocketIo = require('socket.io');

module.exports = (app, uuid, DB) => {
    const io = SocketIo(app);
    var inhome = []
    io.on('connect', function(socket) {

        socket.on("gamesala1", (data) => {
            console.log(data)
            io.emit('newgame:data', {
                value: data
            });
        })
        socket.on("sethome", (data) => {
            let user = {
                "user": data,
                "id": socket.id
            }
            inhome.push(user);
            /*let y = 0
            inhome.forEach(row => {
                if (row["user"] == data) {
                    y++
                }
            })
           
           if (y == 0) {
                let user = {
                    "user": data,
                    "id": socket.id
                }
                inhome.push(user);
            } else
                io.emit('login:data', {
                    value: "El usuario ya tiene una session iniciada"
                });*/
        });
        socket.on("play-juego", function(idsala, idjugador, puntos) {

        });
        socket.on('disconnect', () => {
            let data = []
            inhome.forEach(row => {
                if (row["id"] != socket.id) {
                    data.push(row)
                }
            })
            inhome = data
            console.log(inhome)
        });
        console.log('Un Cliente Conectado');
    });
}