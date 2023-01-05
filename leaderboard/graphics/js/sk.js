
    const dataMinos = nodecg.Replicant('dataMinos','connector')

    let tableOfMinos = []

    dataMinos.on('change', (newValue, oldValue)=>{
        // if(JSON.stringify(newValue) != JSON.stringify(oldValue)){
            Object.values(newValue).forEach((minos)=>{
                if(minos != null){
                    console.log(minos)
                    if($('#aht'+minos.ip).length == 0){
                        console.log(minos.ip)
                        let $item = $( 
                            '<tr class="athlete zero" id="aht'+minos.ip+'">' + 
                                '<td class="lane"></td>' +
                                '<td class="state"></td>' + 
                                '<td class="score align-items-xl-center"></td>' +
                                '<td class="popup text-nowrap text-truncate"></td>' + 
                                '<td class="timeAth"></td>' + 
                                '<td class="flag" onclick="deleteMinos()"></td>' +
                                '<td class="text-nowrap text-truncate text-left name" onclick="deleteMinos()" id="delete_'+ minos.ip +'">DELETE IT</td>' + 
                            '</tr>'
                        );
                        $('#lane'+minos.lane).after($item)
                    }
                    $('#aht'+minos.ip).find('.lane').text(treatType(minos.type))
                    $('#aht'+minos.ip).find('.score').text(minos.ip)
                    $('#aht'+minos.ip).find('.popup').text(minos.battery + ' %')
                    $('#aht'+minos.ip).find('.state').text(minos.status)
                    // $('#aht'+minos.ip).find('.timeAth').text(msToTimeSK(minos.time))
                    $('#aht'+minos.ip).find('.timeAth').text(minos.signal)
                    BatteryLevel(minos.ip, minos.battery)
                    if(tableOfMinos[minos.ip] !=  null){
                        clearTimeout(tableOfMinos[minos.ip])
                        tableOfMinos[minos.ip] = null
                    }
                    tableOfMinos[minos.ip] = setTimeout(()=>{
                        $('#aht'+minos.ip).remove()
                    }, 5000)
                }
            })
        // }
    })

    function BatteryLevel(ip, battery){
        switch(battery){
            case 100:
                $('#aht'+ip).addClass('cent')
                $('#aht'+ip).removeClass('soixantequinze cinquante vingtcinq zero')
                break;
            case 75:
                $('#aht'+ip).addClass('soixantequinze')
                $('#aht'+ip).removeClass('cent cinquante vingtcinq zero')
                break;
            case 50:
                $('#aht'+ip).addClass('cinquante')
                $('#aht'+ip).removeClass('soixantequinze cent vingtcinq zero')
                break;
            case 25:
                $('#aht'+ip).addClass('vingtcinq')
                $('#aht'+ip).removeClass('soixantequinze cinquante cent zero')
                break;
            case 0:
                $('#aht'+ip).addClass('zero')
                $('#aht'+ip).removeClass('soixantequinze cinquante cent vingtcinq')
                break;
        }

    }

    function requestPing(){
        let lane = event.target.id.replace('request_','')
        console.log(lane)
        nodecg.sendMessageToBundle('request_minos','connector' , lane)
    }

    function deleteMinos(){
        let ip = parseInt(event.target.id.replace('delete_', ''))
        console.log(ip)
        $('#aht'+ip).remove()
    }

    function treatType(bytes){
        switch(bytes){
            case 1:
                return 'COUNTER'
            case 4:
                return 'SKI'
            case 8:
                return 'BIKE'
            case 16:
                return 'BUZZER'
            case 32:
                return 'AB'
        }
    }