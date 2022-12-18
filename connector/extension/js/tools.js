
const ntpClient = require('ntp-client');
const ip = require('ip');



module.exports = (nodecg, ip_ntp) =>{

    const ipAddress = nodecg.Replicant('ipAddress')
    const timeNTP = nodecg.Replicant('timeNTP')
    const nowNtp = nodecg.Replicant('nowNtp')
    let ip_adresse;
    let _ip_ntp;

    var mqttTools = require('./mqttTools')(nodecg)

    nodecg.listenFor('updateNTP', (value, ack)=>{
        console.log(value)
        if(value == 'local'){
            time(_ip_ntp)
            ip_ntp = _ip_ntp
        }else{
            time(value)
            ip_ntp = value
        }
    })

    nodecg.listenFor('static_update', () => {
        time(ip_ntp)
    })

    function time (ip){
        ntpClient.getNetworkTime(ip, 123, function(err, date) {
            if(err) {
                nowNtp.value = err
            }else{
                let diff = date.getTime() - Date.now()
                timeNTP.value = diff
                let object = {
                    'ip':ip,
                    'date':date
                }
                nowNtp.value = object
                console.log(diff)
            }
        });
    }


    function changeIpAdresse(){
        ip_adresse = ip.address() // my ip address
        ipAddress.value = ip_adresse;

        ch = ip_adresse.split('.')
        if(ch[0] == '10'){
            ip_broker = ch[0]+'.'+ch[1]+'.'+ch[2]+'.'+'100'
            ip_ntp = ch[0]+'.'+ch[1]+'.'+ch[2]+'.'+'1'
            _ip_ntp = ip_ntp;
            
            mqttTools.disconnectMQTT()
            mqttTools.connectionMQTT(ip_broker)
        }
        else{
            mqttTools.disconnectMQTT()
            ip_broker = ''
            ip_ntp = 'time.google.com'
        }

        time(ip_ntp)

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

    changeIpAdresse()

    setInterval(checkIpKairos, 1000);

    console.log('submodule ', __filename, ' is init')
}


