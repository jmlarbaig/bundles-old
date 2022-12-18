
const mqtt = require('mqtt')

var data = {}
var dataTab = []

module.exports = (nodecg) => {

    const dataRow = nodecg.Replicant('dataRow')
    const Mqtt_connected = nodecg.Replicant('Mqtt_connected', { defaultValue: {connected:false, error:''}, persistent: false })
    let client = null;

    function connectionMQTT(ip_broker){   
        if (client == null){
            client = mqtt.connect('mqtt://'+ip_broker+':1883'); 
            streamMQTT()
        }else{
            disconnectMQTT()
        }
    }

    function disconnectMQTT(){
        if(client != null) {
            client.end(true)
            client = null
        }
    }

    function streamMQTT(){
        client.on('connect', function () {
            console.log('Connected MQTT')
            Mqtt_connected.value = {connected:true, error:''};
            client.subscribe('kairos/+/ERG/#')
            })

        client.on('disconnect', () => {
            console.log('disconnected', new Date())
            Mqtt_connected.value = {connected:false, error:''};
            // client.reconnect()
        });
        client.on('close', () => {
            console.log('close', new Date())
            Mqtt_connected.value = {connected:false, error:''};
        });
        client.on('error', err => {
            console.error('error', err)
            Mqtt_connected.value = {connected:false, error:err};
            // client.reconnect()
        });

        client.on('message', function (topic, message) {
            // console.log(topic)
            let ch = topic.split('/');
            let lane = parseInt(ch[1].replace("minos",""))-1

            if(topic.includes("ERG")){
                let ch2 = message.toString().split(';');

                data={}
                data.lane = lane;
                data.displayUnit = ch2[0];
                data.displayType = ch2[1];
                data.workoutState = ch2[2];
                data.erg = ch[3];
                data.spm = ch2[4];
                data.distance = ch2[5];
                data.calories = ch2[6];
                data.power = ch2[7];
                data.calH = ch2[8];
                data.stroke = ch2[9];
                data.byteState = ch2[10];

                dataTab[lane] = data;
                dataRow.value = dataTab;

            }
        })
    }

    return {connectionMQTT, disconnectMQTT}
}
