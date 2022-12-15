const dataNewConfigCC = {"usernameCC":"","passwordCC":"", "eventId":0}

let staticJSONString = "";
let dynamicJSONString = "";
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

let statics_timer;
let dynamics_timer;

let init = false

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

            StateConnection('connecting','static','')
            StateConnection('connecting','dynamic','')
            StateConnection('connecting','cc','')

            await ConnectionCC()
            await ConnectionSK()
            
            window.addEventListener('beforeunload', Deconnection , false);

        }
        catch(e){
            Deconnection();
        }
    }

    function Deconnection(){
        try{
            $('#connection_but').prop('disabled', false)
            if(intervalStatic != null){
                console.log('clear')
                clearInterval(intervalStatic)
                intervalStatic = null;
            }
            if(intervalDynamic != null){
                console.log('clear')
                clearInterval(intervalDynamic)
                intervalDynamic = null;
            }
            // clearInterval(statics_timer)
            // clearInterval(dynamics_timer)
            Connected.value = false;
            staticJSONString = "";
            dynamicJSONString = "";

            $('#skStateStatic').text("DECONNECTION")
            $('#led_SK_static').removeClass('led-green led-orange')
            $('#led_SK_static').addClass('led-red')

            $('#skStateDynamic').text("DECONNECTION")
            $('#led_SK_dynamic').removeClass('led-green led-orange')
            $('#led_SK_dynamic').addClass('led-red')

            $('#ccState').text("DECONNECTION")
            $('#led_CC').removeClass('led-green led-orange')
            $('#led_CC').addClass('led-red')

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

        dataNewConfig.staticServer =  $('#address_IP').val();
        dataNewConfig.ntpAdress = $('#adresse_ntp').val();

        nodecg.sendMessage('dataOverwrite', dataNewConfig);

        nodecg.sendMessage('updateNTP', ipNtp);
    }

    $('document').ready(function(){
        if(Connected.value){
            $('#connection_but').prop('disabled', true)
        }else{
            $('#connection_but').prop('disabled', false)
        }
    })

    Connected.on('change',(newValue, oldValue)=>{
        if(newValue){
            $('#connection_but').prop('disabled', true)
            $('#skStateStatic').text("CONNECTED")
            $('#led_SK_static').removeClass('led-orange led-red')
            $('#led_SK_static').addClass('led-green')
            $('#skStateDynamic').text("CONNECTED")
            $('#led_SK_dynamic').removeClass('led-orange led-red')
            $('#led_SK_dynamic').addClass('led-green')
            
            $('#ccState').text("CONNECTED")
            $('#led_CC').removeClass('led-orange led-red')
            $('#led_CC').addClass('led-green')
        }else{
            $('#connection_but').prop('disabled', false)
            $('#skStateStatic').text("DECONNECTION")
            $('#skStateDynamic').text("DECONNECTION")
            $('#led_SK_static').removeClass('led-green led-orange')
            $('#led_SK_static').addClass('led-red')
            $('#led_SK_dynamic').removeClass('led-green led-orange')
            $('#led_SK_dynamic').addClass('led-red')

            $('#ccState').text("DECONNECTION")
            $('#led_CC').removeClass('led-green led-orange')
            $('#led_CC').addClass('led-red')
        }
    })

    nodecg.readReplicant('dataConfig', (value) =>{
        $('#address_IP').val(value.staticServer.toString())
        $('#adresse_ntp').val(value.ntpAdress.toString())
        $('#local').attr('checked', true);
    })

    nodecg.readReplicant('dataConfigCC', (value) =>{
        $('#usernameCC').val(value.usernameCC.toString())
        $('#passwordCC').val(value.passwordCC.toString())
        $('#eventId').val(value.eventId.toString())
    })
