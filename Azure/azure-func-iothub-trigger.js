'use strict';

// This function is triggered each time a message is received in the IoT hub.
// The message payload is persisted in an Azure storage table

module.exports = function (context, iotHubMessage) {
    context.log('Message received: ' + JSON.stringify(iotHubMessage));
    
    if(iotHubMessage) {
        var message = iotHubMessage[0];

        if(message.type === "Diris_A10") {
            context.bindings.outputTable = [];

            var params = [
                {name: "u12", engUnits: "V"}, {name: "u23", engUnits: "V"}, {name: "u31", engUnits: "V"},
                {name: "v1", engUnits: "V"}, {name: "v2", engUnits: "V"}, {name: "v3", engUnits: "V"}, {name: "f", engUnits: "Hz"},
                {name: "c1", engUnits: "A"}, {name: "c2", engUnits: "A"}, {name: "c3", engUnits: "A"}, {name: "cn", engUnits: "A"},
                {name: "p", engUnits: "W"}, {name: "q", engUnits: "var"}, {name: "s", engUnits: "VA"},
                {name: "p1", engUnits: "W"}, {name: "p2", engUnits: "W"}, {name: "p3", engUnits: "W"},
                {name: "q1", engUnits: "var"}, {name: "q2", engUnits: "var"}, {name: "q3", engUnits: "var"},
                {name: "s1", engUnits: "VA"}, {name: "s2", engUnits: "VA"}, {name: "s3", engUnits: "VA"},
                {name: "pf", engUnits: ""}, {name: "pf1", engUnits: ""}, {name: "pf2", engUnits: ""}, {name: "pf3", engUnits: ""},
                {name: "ea", engUnits: "Wh"}, {name: "er", engUnits: "varh"},
            ];

            for (var i = 0; i < message.count; i++) {
                context.bindings.outputTable.push({
                    PartitionKey: message.id,
                    RowKey: guid(),
                    Name: params[i].name,
                    Value: message[params[i].name],
                    Eu: params[i].engUnits
                });
            }

            context.done();
        }
        
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }
    
};