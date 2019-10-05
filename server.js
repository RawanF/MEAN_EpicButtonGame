const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const server = app.listen(6789);
const io = require('socket.io')(server);
var counter=0;
io.on('connection', function (socket) {
    socket.emit('updateClient', { counter: counter });//one client
    socket.on('increase_count', function () {
        counter++
        io.emit('updateAllClients', { counter: counter });
    });
    socket.on('reset_count', function () {
        counter=0;
        io.emit('updateAllClients', { counter: counter });
    });
   
});
app.get("/", (req, res) => {
    res.render('index');
})
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');