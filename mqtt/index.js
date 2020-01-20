var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://127.0.0.1:1883')


client.on('connect', () => {
    console.log('MQTT Connected');
    client.subscribe('node/+/#');
})

client.on('disconnect', () => {
    console.log('MQTT Disconnected')
})

client.on('error', (err) => {
    console.log(err);
})

client.on('message', (topic, payload, packet) => {
    // console.log(topic,   )
    const node = topic.split('/')[1];

    io.emit(`node_${node}`, { topic: topic, payload: payload.toString() })
})

http.listen(5000, function() {
    //console.log(client);
    console.log('listening on *:5000');
});