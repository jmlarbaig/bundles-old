const _configAthletes = {
    'type':'athlete',
    'subtype':'',
    'lane':0,
    'data': {},
    'position':'bottom_center'
}


async function askAffichage() {

    let id = parseInt( event.target.id.replace('ath_', ''))

    $('#ath_'+id).attr("disabled", true);
    setTimeout(()=>{
        $('#ath_'+id).removeAttr("disabled");
    }, 1000)

    liste_heat[id].ath = liste_heat_ath[id].ath_infos

    let dataToSend = Object.assign({}, _configAthletes)

    dataToSend.checked = $('#ath_'+id).is(':checked');
    dataToSend.subtype = $('#subtype'+id).val();
    dataToSend.lane = id;
    dataToSend.data = liste_heat[id];

    lowerThirdData.value = dataToSend;
}


async function affichageEvent(){

    let ch = [] 
    ch = event.target.id.split('_')
        
    let $tab_ath = $("#lane_"+ch[1]+'_ath_'+ch[3])
    $tab_ath.find('#lastEvents_'+ ch[1]+'_ath_'+ch[3]).hide()
}