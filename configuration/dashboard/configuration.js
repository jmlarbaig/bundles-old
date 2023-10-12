
const Colors = nodecg.Replicant('Colors');

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}

function Actualiser() {

    let data = {};

    const elmColors = document.querySelectorAll('input[type=color]');
    elmColors.forEach(el => {
        data[el.id] = el.value
    });

    const elmNumber = document.querySelectorAll('input[type=number]');
    elmNumber.forEach(el => {
        data[el.id] = (el.value || 0) + "px"
    });

    const elmCheck = document.querySelectorAll('input[type=checkbox]');
    elmCheck.forEach(el => {
        data[el.id] = el.checked
    });

    const elmSelect = document.querySelectorAll('select');
    elmSelect.forEach(el => {
        data[el.id] = el.value
    });

    if (data.bg_trans == true) {
        data.bg__color = "rgba(0,0,0,0)";
    }

    if (data.logo_bg_trans == true) {
        data.box_logo_color = "rgba(0,0,0,0)";
    }

    // console.log(data)

    Colors.value = data;

    nodecg.sendMessage('colorOverwrite', data);
}

nodecg.readReplicant('Colors', (value) => {

    // console.log(value)

    Object.keys(value).forEach((element, index) => {
        // console.log(element, typeof value[element], value[element])
        if (typeof value[element] === 'boolean') {
            $("#" + element).prop("checked", value[element]);
        } else if (value[element].includes('px')) {
            console.log('px')
            $("#" + element).val(value[element].replace('px', ''))
        } else {
            $("#" + element).val(value[element]);
        }
    })
})
