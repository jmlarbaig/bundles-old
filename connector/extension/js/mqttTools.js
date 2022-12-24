
const mqtt = require('mqtt')

var data = {}
var dataTab = []

module.exports = (nodecg) => {

    const dataRow = nodecg.Replicant('dataRow')
    const dataMinos = nodecg.Replicant('dataMinos')
    const dataMinosLane = nodecg.Replicant('dataMinosLane')
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
            client.subscribe('kairos/Minos')
            client.subscribe('kairos/+/SCORE')
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
            // console.log(message.toString())

            if(topic.includes("ERG")){
                let ch = topic.split('/');
                let lane = parseInt(ch[1].replace("minos",""))-1
                let mes = message.toString().split(';');

                data={}
                data.lane = lane;
                data.displayUnit = mes[0];
                data.displayType = mes[1];
                data.workoutState = mes[2];
                data.erg = ch[3];
                data.spm = mes[4];
                data.distance = mes[5];
                data.calories = mes[6];
                data.power = mes[7];
                data.calH = mes[8];
                data.stroke = mes[9];
                data.byteState = mes[10];

                dataTab[lane] = data;
                dataRow.value = dataTab;

            }
            else if(topic.includes('Minos')){
                let mes = message.toString().split(';');

                let minos = Object.assign({}, floorMinos)
                minos.ip = parseInt(mes[0])
                minos.lane = parseInt(mes[1])
                minos.type = parseInt(mes[2], 2)
                minos.battery = parseInt(mes[3])

                tableOfMinosOnFloor[minos.ip] = minos ;

                if(tableOfMinosLaneOnFloor[minos.lane] != undefined){
                    tableOfMinosOnFloor[minos.ip].status = tableOfMinosLaneOnFloor[minos.lane].status;
                    tableOfMinosOnFloor[minos.ip].time = tableOfMinosLaneOnFloor[minos.lane].time;
                }

                dataMinos.value = tableOfMinosOnFloor

                if(tableTimer[minos.ip] !=  null){
                    clearTimeout(tableTimer[minos.ip])
                    tableTimer[minos.ip] = null
                }
                tableTimer[minos.ip] = setTimeout(()=>{
                    tableOfMinosOnFloor[minos.ip] = {}
                }, 5000)
            }
            else if(topic.includes('minos')){
                let lane = parseInt(topic.split('/')[1].replace("minos",""))
                let mes = message.toString().split(';');

                tableOfMinosLaneOnFloor[lane] = {}
                tableOfMinosLaneOnFloor[lane].status = mes[0] || 0
                tableOfMinosLaneOnFloor[lane].time = mes[12] || 0
            }
        })
    }

    nodecg.listenFor('static_update', () => {
        tableOfMinosOnFloor = [];
        tableOfMinosLaneOnFloor = []
        dataMinos.value = tableOfMinosOnFloor;
    })

    nodecg.listenFor('request_minos', (lane) => {
        if(client.connected){
            let message = '01'
            if(lane < 9){
                message = '0'+lane+message;
            }else{
                message = lane+message;
            }
            client.publish('kairos/Minos/AYTRequest', message )
        }
    })

    let tableOfMinosOnFloor = []
    let tableOfMinosLaneOnFloor = []
    let tableTimer = []
    let floorMinos = {
        'type':'',
        'ip':0,
        'lane':0,
        'battery':0,
        'status':0,
        'time':0
    }


    return {connectionMQTT, disconnectMQTT}
}
