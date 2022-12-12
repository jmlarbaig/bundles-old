

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
    $('#updateButton').removeAttr('disabled')
    let adresseIp = newValue.split('T')[1]
    if(!newValue.includes('Timeout waiting for NTP')){
        $('#ntpTime').text(adresseIp)
        $('#led_NTP').addClass('led-green')
        $('#led_NTP').removeClass('led-orange')
        $('#led_NTP').removeClass('led-red')
    }
    else{
        $('#ntpTime').text(adresseIp)
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