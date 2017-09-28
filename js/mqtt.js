// Create a client instance
client = new Paho.MQTT.Client("ws://10.255.0.160:1884/", "BXTestlaptop");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
    onSuccess: onConnect
});


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("devices/+/#");
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "devices/laptop/text";
    client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    Materialize.toast(message.payloadString, 4000);
    console.log(message.destinationName);
    [group, device, sensorType] = message.destinationName.split("/");
}
