
let heatId = "";
let athletes_final = new Array();
let sameJson;
let adr_IP_static;
let adr_IP_dynamics;
let EventPlanner = [];
let heatWUP = []
let static_
let workoutId;
let wodId;

let data = []

    // Initialisation du choix de la vue
    
    let overlay=''

    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
        
        if(overlay == 'data'){
            createDataView();
        }
    })


    logoEvent.on('change', (newValue) => {
        // console.log(newValue[0].url)
        if(newValue.length>0){
            $("#logo_event").css("background-image", "url(" + newValue[0].url + ")");
        }
    })


    async function Connection (){
        try{

            let data = {}
            data.user = $('#usernameCC').val().toString()
            data.passwd = $('#passwordCC').val().toString()
            data.event = $('#eventId').val().toString()
            data.addIp = $('#address_IP').val().toString()
            data.ntpAdress = $('#adresse_ntp').val().toString()

            nodecg.sendMessage('connection', data)

        }
        catch(e){
            Deconnection();
        }
    }

    function Deconnection(){
        try{

            nodecg.sendMessage('deconnection')

        }
        catch(e){
            console.log(e)
        }
    }

    function updateNtp(){

        let radio = $('input[name=NTPradio]:checked', '#ntpForm').val();

        let ipNtp;
        if(radio == 'custom'){
            ipNtp = $('#adresse_ntp').val();
        }else{
            ipNtp = 'local';
        }

        $('#updateButton').attr('disabled', true)
        $('#ntpTime').text('WAITING')
        $('#led_NTP').removeClass('led-red')
        $('#led_NTP').addClass('led-orange')
        $('#led_NTP').removeClass('led-green')

        nodecg.sendMessage('updateNTP', ipNtp);
    }

    $('document').ready(function(){
        if(Connected.value){
            $('#connection_but').prop('disabled', true)
        }else{
            $('#connection_but').prop('disabled', false)
        }
    })

    Connected.on('change',(newValue)=>{
        console.log(newValue)
        Object.keys(newValue).forEach((element)=>{
            let state = newValue[element]
            if(newValue[element].includes('error')){
                state = 'error'
            }
            stateConnection(state, element, newValue[element])
        })
    })

    nodecg.readReplicant('dataConfig', (value) =>{
        $('#address_IP').val(value.addIp)
        $('#adresse_ntp').val(value.ntpAdress)
        $('#usernameCC').val(value.user)
        $('#passwordCC').val(value.passwd)
        $('#eventId').val(value.event)
        $('#local').attr('checked', true);
    })

