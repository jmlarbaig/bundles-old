function resetAttrLane(data){

  console.log(data)
    $('.headerLogo-text').text(statics.value.eventName)
    $('#heatName').text(data.title)
    $('#workoutName').text(data.divisions[0])

    $table = $('#participantsTbl tbody')
    $table.find(".stations").remove();

    var athletes = data.stations

    console.log(athletes.length )

    let y = 0

    for(let i = 1 ; i <= athletes.length+1; i++){
      console.log(i)

      if (i != athletes[y].station ){
        var lane = i
        var name = "-"
        var aff = "-"
      }
      else{
        var lane = athletes[y].station
        var name = athletes[y].participantName
        var aff = athletes[y].affiliate
        y++ 
      }



      var $item = $(
          '<tr class="stations" id="ath'+ lane +'">' + 
              '<td class="lane">'+ lane + '</td>' + 
              // '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][key2].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
              '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' + 
              '<td class="text-nowrap text-truncate text-left affiliation">' + aff + '</td>' +
          '</tr>'
      );
      // athletes_divison[key][key2].$item = $item;
      // athletes_divison[key][key2].$item.find(".popup").hide();
      // $item.hide()
      $table.append($item);
      animateCSS('#ath'+ lane, 'fadeInLeft')    
    }

}


const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });