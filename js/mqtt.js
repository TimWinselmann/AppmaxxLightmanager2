app.factory("MQTTService", function($rootScope, $log, $interval) {

    var callbacks = [];

    $rootScope.mqttConnected = false;

    // Create a client instance
    //
    client = new Paho.MQTT.Client("ws://192.168.178.49:1884/", "web-mqtt-client");

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
        onSuccess: function() {
            $log.debug('MQTT connected!');

            $rootScope.$apply(function() {
                $rootScope.mqttConnected = true;
            });

            /* subscribe to already done callbacks */
            $log.debug('Subscribe to already saved callbacks.');
            angular.forEach(callbacks, function(callback, i) {
                $log.debug('Subscribing to topic >' + callback.topic + '<');
                client.subscribe(callback.topic);
            });

        }
    });

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            $log.error("onConnectionLost:" + responseObject.errorMessage);
            $rootScope.$apply(function() {
                $rootScope.mqttConnected = false;
            });
        }
    };

    function onMessageArrived(message) {
        var topic = message.destinationName;
        var payload = message.payloadString;

        $log.debug('onMessageArrived: ' + topic + ' ' + message);

        angular.forEach(callbacks, function(callback, i) {
            // callback.callback;
            // callback.topic;

            var regexpStr = callback.topic.replace(new RegExp('(#)|(\\*)|(\\+)'), function(str) {
                switch (str) {
                    case "#":
                        return ".*?"
                        break;
                    case "*":
                        return ".*?"
                        break;
                    case "+":
                        return ".*"
                        break;
                    default:
                        break;
                }
            });

            if (topic.match(regexpStr)) {
                $rootScope.$apply(function() {

                    /* TODO TW let mqtt connected icon blink */

                    callback.callback(payload);
                });
            }

        });

    };

    this.send = function(topic, message) {
        if (!client.isConnected()) {
            $log.error('Publish MQTT Message not possible: not connected!');
            return;
        }

        $log.debug('send: ' + topic + ' ' + message);

        mqttMessage = new Paho.MQTT.Message(JSON.stringify(message));
        mqttMessage.destinationName = topic;

        client.send(mqttMessage);
    };

    this.on = function(topic, callback) {
        callbacks.push({
            'topic': topic,
            'callback': callback
        });

        if (client.isConnected()) {
            $log.debug('Subscribing to topic >' + topic + '<');
            client.subscribe(topic);
        } else {
            $log.warn('MQTT not yet connected, saving subscription on >' + topic + '< for later');
        }
    };

    this.drop = function(topic) {
        callbacks[topic] = undefined;

        if (client.isConnected()) {
            $log.debug('unsubscribe: ' + topic);
            client.unsubscribe(topic);
        } else {
            $log.error('drop: MQTT not connected!');
        }
    };

    return this;

});
