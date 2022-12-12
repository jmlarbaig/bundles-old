
function loadTableLane (element){
    let $table = $('#participantsTbl tbody')
    $table.find(".stations").remove();
  
    for(let i = initialCount ; i < initialCount + 10 ; i++ ){
      let lane = '-';
      let name = '-';
      let affiliate = '-';
      let country = eventLogo;

      if(element[i] != undefined){
        lane = element[i].lane || '-'
        element[i].countryShortCode == '' ? country = eventLogo : country = 'https://flagcdn.com/'+ element[i].countryShortCode.toLowerCase() + '.svg'
        name = element[i].competitor || '-'
        affiliate = element[i].affiliate || '-'
      }
      
      let $item = $(
          '<tr class="stations" id="ath'+ i +'">' + 
              '<td class="lane">'+ lane + '</td>' + 
              '<td class="flag">' + '<img src="'+ country +'" width="30"></img> ' + '</td>' +
              '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' + 
              '<td class="text-nowrap text-truncate text-left affiliation">' + affiliate + '</td>' +
          '</tr>'
      );
      $table.append($item);  
    }
  }
  


  function loadTableResult (element){
    let $table = $('#participantsTbl tbody')
    $table.find(".stations").remove();
  
    for(let i = initialCount ; i < initialCount + 10 ; i++ ){

      let lane = '-';
      let name = '-';
      let affiliate = '-';
      let points = '-';
      let country = eventLogo;

      if(element[i] != undefined){
        lane = element[i].lane || '-'
        element[i].countryShortCode == '' ? country = eventLogo : country = 'https://flagcdn.com/'+ element[i].countryShortCode.toLowerCase() + '.svg'
        name = element[i].competitor || '-'
        affiliate = element[i].affiliate || '-'
        points = element[i].points || '-'
      }
      
      let $item = $(
          '<tr class="stations" id="ath'+ i +'">' + 
              '<td class="lane">'+ lane + '</td>' + 
              '<td class="flag">' + '<img src="'+ country +'" width="30"></img> ' + '</td>' +
              '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' + 
              '<td class="text-nowrap text-truncate text-left affiliation">' + affiliate + '</td>' +
              '<td class="text-nowrap text-truncate text-left point">' + points + '</td>' +
          '</tr>'
      );
      $table.append($item);  
    }
  }
  

  function loadTableDivisionResults (element){
    $table = $('#participantsTbl tbody')
    $table.find(".stations").remove();

  
    for(let i = initialCount ; i < initialCount + 10 ; i++ ){

      let rank = '-';
      let displayRank = '-';
      let name = '-';
      let affiliate = '-';
      let points = '-';
      let country = eventLogo;

      if(element[i] != undefined){
        displayRank = element[i].displayRank || '-'
        rank = element[i].rank || '-'
        element[i].countryShortCode == ('' || null) ? country = eventLogo : country = 'https://flagcdn.com/'+ element[i].countryShortCode.toLowerCase() + '.svg'
        name = element[i].competitor || '-'
        element[i].affiliate == (null || ' ') ? affiliate = '-' : affiliate = element[i].affiliate
        points = element[i].result || '-'
      }
      
      let $item = $(
          '<tr class="stations" id="ath'+ rank +'">' + 
              '<td class="lane">'+ displayRank + '</td>' + 
              '<td class="flag">' + '<img src="'+ country +'" width="30"></img> ' + '</td>' +
              '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' + 
              '<td class="text-nowrap text-truncate text-left affiliation">' + affiliate + '</td>' +
              '<td class="text-nowrap text-truncate text-left point">' + points + '</td>' +
          '</tr>'
      );
      $table.append($item);  
    }
  }
  