
    const _configPresentator = {
        'type':'presentator',
        'name':'',
        'function':'',
        'qrcode':'',
        'sponsor':'',
        'position':'bottom_left'
    }

    const _configWaiting = {
        'type':'waiting',
        'name':'',
        'function':'',
        'qrcode':'',
        'sponsor':'',
        'position':'bottom_left'
    }

    const _configFree = {
        'type':'free',
        'header':'',
        'subheader':'',
        'colorHeader':'',
        'colorSubHeader':'',
        'text':'',
        'position':'bottom_left'
    }

    const sponsorLower = nodecg.Replicant('assets:sponsorsLowerThirds')
    const codePromo = nodecg.Replicant('assets:codePromo', 'connector')

    const LowerThirdConfig = nodecg.Replicant('LowerThirdConfig')
    const lowerThirdData = nodecg.Replicant('lowerThirdData');
    


    // Initialisation du choix de la vue
    
    let overlay=''
    
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')

        switch(overlay){
            case 'freeLowerthird':
                document.getElementById('freeDiv').addEventListener("input", affichageFreeLowerthird, false);
                break;
            case 'presentatorLowerthird':
                document.getElementById('presentatorsDiv').addEventListener("input", affichageLowerthird, false);
                break;
            case 'waitingLowerthird':
                document.getElementById('waitingDiv').addEventListener("input", affichageWaitingLowerthird, false);
                break;
        }
    })


    var lowerThird = []

    sponsorLower.on('change', (newValue)=> {
        updateSponsorOption(newValue)
    })


    function affichageLowerthird(){

        let id = 0;
        _subId = event.target.id

        if(_subId.includes('name')){
            id = rpl(_subId, 'name')
        }else if(_subId.includes('function')){
            id = rpl(_subId, 'function') 
        }else if(_subId.includes('qrcode')){
            id = rpl(_subId, 'qrcode')
        }else if(_subId.includes('sponsor')){
            id = rpl(_subId, 'sponsor')
        }else if(_subId.includes('aff_')){
            id = rpl(_subId, 'aff_');
            $('#aff_'+id).attr("disabled", true);
            setTimeout(()=>{
                $('#aff_'+id).removeAttr("disabled");
            }, 1000)
        }


        let dataToSend = Object.assign({}, _configPresentator)

        dataToSend.checked = $("#aff_"+id).is(':checked');
        dataToSend.id = id;
        dataToSend.name = $("#name"+id).val();
        dataToSend.function = $("#function"+id).val();
        dataToSend.sponsor = $("#sponsor"+id).val();
        dataToSend.qrcode = $("#qrcode"+id).val();
        dataToSend.position = $("#position").val();

        lowerThirdData.value = dataToSend
    }


    
    function affichageWaitingLowerthird(){
        
        if(event.target.id.includes('waitingCehckbox')){
            $('#waitingCehckbox').attr("disabled", true);
            setTimeout(()=>{
                $('#waitingCehckbox').removeAttr("disabled");
            }, 1000)
        }

        let dataToSend = Object.assign({}, _configWaiting)

        dataToSend.checked = $("#waitingCheckbox").is(':checked');
        dataToSend.localisation = $("#localisation").val();
        dataToSend.nextEvent = $("#nextEvent").val();
        dataToSend.qrcode = $("#qrcode").val();
        dataToSend.sponsors = $("#sponsors").val();
        dataToSend.position = $("#position").val();

        lowerThirdData.value = dataToSend
    }

    nodecg.readReplicant('LowerThirdConfig', (value)=>{
        value.forEach((element, i) => {
            addItem(element)
        })
    })

    function affichageFreeLowerthird(){

        if(event.target.id.includes('freeCheckbox')){
            $('#freeCheckbox').attr("disabled", true);
            setTimeout(()=>{
                $('#freeCheckbox').removeAttr("disabled");
            }, 1000)
        }

        let dataToSend = Object.assign({}, _configFree)

        dataToSend.checked = $("#freeCheckbox").is(':checked');
        dataToSend.header = $("#header").val();
        dataToSend.subheader = $("#subheader").val();
        dataToSend.text = myContent.getContent();
        dataToSend.position = $("#position").val();

        lowerThirdData.value = dataToSend
    }

    tinymce.init({
        selector: 'textarea#textFree',  // change this value according to your HTML
        menubar: false,
        plugins: "link image code",
        toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code',
        init_instance_callback: function (editor) {
            editor.on('input', function (e) {
                // $('#exemple').html(myContent.getContent())
                // affichageWaitingLowerthird()
                let dataToSend = Object.assign({}, _configFree)

                dataToSend.checked = $("#freeCheckbox").is(':checked');
                dataToSend.header = $("#header").val();
                dataToSend.subheader = $("#subheader").val();
                dataToSend.text = myContent.getContent();
                dataToSend.position = $("#position").val();
        
                lowerThirdData.value = dataToSend
            });
        }
    });


    var myContent;

    tinymce.on('AddEditor', function(e) {
        console.log('Added editor with id: ' + e.editor.id);
        myContent = tinymce.get("textFree");
    });
