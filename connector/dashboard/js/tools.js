

ipAddress.on('change', (newValue, oldValue) => {
    let ipHtml = $('#ipAdresse');
    ipHtml.text(newValue)
    console.log(newValue.includes('10.'))
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
    console.log(newValue)
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
    console.log("NewValue MQTT =",newValue)
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


let liste_donnees = {'Team':[], 'Individual':[]}

data_ath.on('change', (newValue, oldValue) => {
    if (newValue.length > 0){
        if (newValue != oldValue){
            liste_donnees = {'Team':[], 'Individual':[]}
            listeAthlete.value = {'Team':[], 'Individual':[]}
            $.getJSON( newValue[0].url, function( data ) {
                console.log("Data = ",data)
                // updateData(data)
                listeAthlete.value = data.Athletes
                // console.log(items)
              });
        }
    }
})



function StateConnection(state,location, error){
    switch(state){
        case 'connecting':
            switch(location){
                case 'cc':
                    $('#ccState').text("CONNECTING")
                    $('#led_CC').removeClass('led-green led-red')
                    $('#led_CC').addClass('led-orange')
                    break;
                case 'static':
                    $('#skStateStatic').text("CONNECTING")
                    $('#led_SK_static').removeClass('led-green led-red')
                    $('#led_SK_static').addClass('led-orange')
                    clearInterval(statics_timer)
                    break;
                case'dynamic':
                    $('#skStateDynamic').text("CONNECTING")
                    $('#led_SK_dynamic').removeClass('led-green led-red')
                    $('#led_SK_dynamic').addClass('led-orange')
                    clearInterval(dynamics_timer)
                    break;
            }
            break;
        case 'error':
            switch(location){
                case 'cc':
                    $('#ccState').text("ERROR : " + error)
                    $('#led_CC').removeClass('led-green led-orange')
                    $('#led_CC').addClass('led-red')
                    break;
                case 'static':
                    $('#skStateStatic').text("ERROR : " + error)
                    $('#led_SK_static').removeClass('led-green led-orange')
                    $('#led_SK_static').addClass('led-red')
                    break;
                case'dynamic':
                    $('#skStateDynamic').text("ERROR : " + error)
                    $('#led_SK_dynamic').removeClass('led-green led-orange')
                    $('#led_SK_dynamic').addClass('led-red')
                    break;
            }
            break;
        case 'connected':
            switch(location){
                case 'cc':
                    $('#ccState').text("CONNECTED")
                    $('#led_CC').removeClass('led-red led-orange')
                    $('#led_CC').addClass('led-green')
                    break;
                case 'static':
                    $('#skStateStatic').text("CONNECTED")
                    $('#led_SK_static').removeClass('led-orange led-red')
                    $('#led_SK_static').addClass('led-green')
                    clearInterval(statics_timer)
                    break;
                case'dynamic':
                    $('#skStateDynamic').text("CONNECTED")
                    $('#led_SK_dynamic').removeClass('led-orange led-red')
                    $('#led_SK_dynamic').addClass('led-green')
                    clearInterval(dynamics_timer)
                    break;
            }
            break;
    }
}