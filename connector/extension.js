'use strict';

const fs = require('fs');
const path = require('path');

const mqtt = require('mqtt')

var ip = require('ip');
var ip_adresse = ip.address() // my ip address

var ch = ip_adresse.split('.')

if(ch[0] == '10'){
    var ip_broker = ch[0]+'.'+ch[1]+'.'+ch[2]+'.'+'100'
    var ip_ntp = ch[0]+'.'+ch[1]+'.'+ch[2]+'.'+'1'
}
else{
    var ip_ntp = 'time.google.com'
}

console.log("ip_adresse = ", ip_adresse, " ip_broker = ", ip_broker, " ipNTP = ", ip_ntp)

var data = {}
var dataTab = []

const client = mqtt.connect('mqtt://'+ip_broker+':1883');
const ntpClient = require('ntp-client');

module.exports = function (nodecg, bundlePath) {

    const router = nodecg.Router();
    const timeNTP = nodecg.Replicant('timeNTP')
    const nowNtp = nodecg.Replicant('nowNtp')
    const dataConfig = nodecg.Replicant('dataConfig')
    const dataConfigCC = nodecg.Replicant('dataConfigCC')
    const ipAddress = nodecg.Replicant('ipAddress')
    const dataRow = nodecg.Replicant('dataRow')
    const Mqtt_connected = nodecg.Replicant('Mqtt_connected', { defaultValue: {connected:false, error:''}, persistent: false })

    const currentPath = __dirname;
	const pkgPath = path.join(currentPath,"/connectionFile.json");
	const pkgPathCC = path.join(currentPath,"/connectionFileCC.json");

    ipAddress.value = ip_adresse;

        client.on('connect', function () {
            console.log('Connected MQTT')
            Mqtt_connected.value = {connected:true, error:''};
            client.subscribe('kairos/+/ERG/#')
          })
    
        client.on('disconnect', () => {
            console.log('disconnected', new Date())
            Mqtt_connected.value = {connected:false, error:''};
            client.reconnect()
        });
        client.on('close', () => {
            console.log('disconnected', new Date())
            Mqtt_connected.value = {connected:false, error:''};
        });
        client.on('error', err => {
            console.error('error', err)
            Mqtt_connected.value = {connected:false, error:err};
            client.reconnect()
        });
    
        client.on('message', function (topic, message) {
            console.log(topic)
            var ch = topic.split('/');
            var lane = parseInt(ch[1].replace("minos",""))-1
    
            console.log("lane =", lane)
            if(topic.includes("ERG")){
                var erg = ch[3];
                var ch2 = message.toString().split(';');
    
                data={}
                data.lane = lane;
                data.displayUnit = ch2[0];
                data.displayType = ch2[1];
                data.workoutState = ch2[2];
                data.timeWorkout = ch2[3];
                data.spm = ch2[4];
                data.distance = ch2[5];
                data.calories = ch2[6];
                data.power = ch2[7];
                data.calH = ch2[8];
                data.stroke = ch2[9];
                data.byteState = ch2[10];
                data.erg = ch[3];
    
                console.log(lane)
                console.log(erg)
                console.log(data)
                dataTab[lane] = data;
                dataRow.value = dataTab;
    
            }
          })

    router.post('/companion', (req, res) => {
        console.log("Bien recu :", req.body)
    });

    router.get('/leaderboard', (req, res)=> {
        res.redirect('http://'+ip_adresse+':9090/bundles/leaderboard/graphics/index.html');
    })

    nodecg.mount('/functionnalVision', router);

    if (fs.existsSync(pkgPath)) {   
        try {
            const data_ = JSON.parse(fs.readFileSync(pkgPath))
            dataConfig.value = data_
          } 
        catch (err) {
            console.error(err)
          }
	}

    nodecg.listenFor('dataOverwrite', (value, ack) =>{
        let data = JSON.stringify(value, undefined, 4);
        fs.writeFileSync(pkgPath, data)
        dataConfig.value = value
    })

    if (fs.existsSync(pkgPathCC)) {   
        try {
            const data_ = JSON.parse(fs.readFileSync(pkgPathCC))
            dataConfigCC.value = data_
          } 
        catch (err) {
            console.error(err)
          }
	}

    nodecg.listenFor('dataOverwriteCC', (value, ack) =>{
        let data = JSON.stringify(value);
        fs.writeFileSync(pkgPathCC, data)
        dataConfigCC.value = value
    })

    function time (){
        ntpClient.getNetworkTime(ip_ntp, 123, function(err, date) {
            if(err) {
                console.error(err);
                nowNtp.value = err
            }else{
                console.log("Current time : ");
                console.log(date.toString()); // Mon Jul 08 2013 21:31:31 GMT+0200 (Paris, Madrid (heure d’été))
                nowNtp.value = date
                timeNTP.value = date.getTime()
            }
            checkIpKairos()
        });
    }

    function changeIpAdresse(){
        ip_adresse = ip.address() // my ip address
        ipAddress.value = ip_adresse;

        ch = ip_adresse.split('.')
        if(ch[0] == '10'){
            ip_broker = ch[0]+'.'+ch[1]+'.'+ch[2]+'.'+'100'
            ip_ntp = ch[0]+'.'+ch[1]+'.'+ch[2]+'.'+'1'
        }
        else{
            ip_broker = ''
            ip_ntp = 'time.google.com'
        }

        console.log("ip_adresse = ", ip_adresse, " ip_broker = ", ip_broker, " ipNTP = ", ip_ntp)
    }

    function checkIpKairos(){
        if(ch[0] == '10' && ip.address().includes('10.')){
            return
        }
        else if(ch[0] != '10' && ip.address().includes('10.')){
            changeIpAdresse()
        }else if(ch[0] == '10' && !ip.address().includes('10.')){
            changeIpAdresse()
        }
    }


    setInterval(time, 1000);    
    setInterval(checkIpKairos, 1000);

	nodecg.log.info(`Bundle "${__filename}" is initialized.`);
        
};
