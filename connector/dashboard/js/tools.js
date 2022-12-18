

ipAddress.on('change', (newValue, oldValue) => {
    let ipHtml = $('#ipAdresse');
    ipHtml.text(newValue)
    if(newValue != undefined && newValue.includes('10.')){
        $('#led_ipAdresse').addClass('led-green')
        $('#led_ipAdresse').removeClass('led-red')
        $('#led_ipAdresse').removeClass('led-orange')
    }else if(newValue != undefined){
        $('#led_ipAdresse').addClass('led-orange')
        $('#led_ipAdresse').removeClass('led-red')
        $('#led_ipAdresse').removeClass('led-green')
    }else{
        $('#led_ipAdresse').removeClass('led-green')
        $('#led_ipAdresse').removeClass('led-red')
        $('#led_ipAdresse').addClass('led-orange')
    }
})

nowNtp.on('change', (newValue, oldValue)=>{
    $('#updateButton').removeAttr('disabled')
    let ip = newValue.ip
    let date = newValue.date.split('T')[1]
    if(!newValue.date.includes('Timeout waiting for NTP')){
        $('#ntpTime').text(date)        
        $('#ntpIp').text(ip)
        $('#led_NTP').addClass('led-green')
        $('#led_NTP').removeClass('led-orange')
        $('#led_NTP').removeClass('led-red')
    }
    else{
        $('#ntpTime').text(date)
        $('#ntpIp').text(ip)
        $('#led_NTP').addClass('led-red')
        $('#led_NTP').removeClass('led-orange')
        $('#led_NTP').removeClass('led-green')
    }
})

Mqtt_connected.on('change', (newValue, oldValue) => {
    if(newValue.connected == true){
        $('#mqttMSG').text('Connected')
        $('#led_MQTT').addClass('led-green')
        $('#led_MQTT').removeClass('led-red')
    }
    else{
        if(newValue.error != ''){
            $('#mqttMSG').text('Reconnection ...')
        }else{
            $('#mqttMSG').text('Disconnected')
        }
        $('#led_MQTT').addClass('led-red')
        $('#led_MQTT').removeClass('led-green')
    }
})


function stateConnection(state,element, error){
    switch(state){
        case 'connected':
            $('#State_'+element).text("CONNECTED")
            $('#led_'+element).removeClass('led-orange led-red')
            $('#led_'+element).addClass('led-green')
            $('#connection_but').prop('disabled', true)
            break;
        case 'connecting':
            $('#State_'+element).text("CONNECTING")
            $('#led_'+element).removeClass('led-green led-red')
            $('#led_'+element).addClass('led-orange')
            break;
        case 'deconnected' :
            $('#State_'+element).text("DECONNECTED")
            $('#led_'+element).removeClass('led-green led-orange')
            $('#led_'+element).addClass('led-red')
            $('#connection_but').prop('disabled', false)
            break;
        case 'deconnecting' :
            $('#State_'+element).text("DECONNECTING")
            $('#led_'+element).removeClass('led-green led-red')
            $('#led_'+element).addClass('led-orange')
            break;
        case 'error':
            $('#State_'+element).text(error)
            $('#led_'+element).removeClass('led-green led-orange')
            $('#led_'+element).addClass('led-red')
            $('#connection_but').prop('disabled', false)
            break;
    }
}