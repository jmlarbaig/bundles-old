
function addItem(data){

    let number = parseInt(document.querySelectorAll('.presentator').length) - 1;

    console.log(number)

    let box = $('#presentators');

    let name = ''
    let fct = '';
    let qrcode = '';
    let sponsor = '';

    if( data != undefined){
        name = data.name
        fct = data.function
        qrcode = data.qrcode
        sponsor = data.sponsor
    }
    
    let $item = $(
        '<tr id="presentator_'+ number  + '" class="presentator">' + 
            '<td> <input type="text" class="name" id="name'+ number +'" value="'+ name +'" /> </td>' +
            '<td> <input type="text" class="function" id="function'+ number +'" value="'+ fct +'"  /> </td>' + 
            '<td> <input type="text" class="qrcode" id="qrcode'+ number +'" value="'+ qrcode +'"  /> </td>' +
            '<td> <select class="sponsor" id="sponsor'+ number +'" value="'+ sponsor +'" > </select> </td>' +
            '<td> <div class="input-checkbox">' +
                '<input type="checkbox" id="aff_' + number + '" onclick="affichageLowerthird()"/>' + 
                '<span class="toogle"></span>' +
            '</div> </td>' +
            '<td> <button id="remove_'+ number +'" class="" onclick="removeItem()"> - </button> </td>' +
        '</tr>'
    )

    box.append($item)
    if(sponsorLower.value != undefined){
        addSponsorOption(sponsorLower.value, number )
    }
}

function removeItem(){
    let id = parseInt(event.target.id.replace('remove_', ''))

    $('#presentator_'+id).remove();
    affichageLowerthird()
}

function saveParameters(){
    let $items = $('.presentator');
    let data = []

    for( let i=0; i < $items.length - 1 ; i++){
        data[i] = Object.assign({}, _configPresentator);
        data[i].name = $items.find('#name'+i).val()
        data[i].function = $items.find('#function'+i).val()
        data[i].qrcode = $items.find('#qrcode'+i).val()
        data[i].sponsor = $items.find('#sponsor'+i).val()
        data[i].position = $items.find('#position').val()
    }

    console.log(data)

    LowerThirdConfig.value = data
}

function resetParameters(){
    
    let $tab = $('#presentators');
    $tab.find('.presentator').remove();
}

function rpl (complete, replace){
    return parseInt(complete.replace(replace, ''))
}