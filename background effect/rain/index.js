var makeItRain = function() {
    //clear out everything
    const clear = document.getElementsByClassName("rain");
    clear[0].innerHTML = "";
    clear[1].innerHTML = "";

    let increment = 0;
    let drops = "";
    let backDrops = "";
  
    while (increment < 100) {

      const randoHundo = (Math.floor(Math.random() * 98  + 1));
      const randoFiver = (Math.floor(Math.random() * 3 + 2));
     
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
  
    document.querySelector('.rain.front-row').innerHTML = drops;
    document.querySelector('.rain.back-row').innerHTML = backDrops;
  }
  
  document.querySelector('.splat-toggle.toggle').addEventListener('click', function() {
    document.querySelector('.body').classList.toggle('splat-toggle');
    document.querySelector('.splat-toggle.toggle').classList.toggle('active');
    makeItRain();
  });
  
  document.querySelector('.back-row-toggle.toggle').addEventListener('click', function() {
    document.querySelector('.body').classList.toggle('back-row-toggle');
    document.querySelector('.back-row-toggle.toggle').classList.toggle('active');
    makeItRain();
  });
  
  document.querySelector('.single-toggle.toggle').addEventListener('click', function() {
    document.querySelector('.body').classList.toggle('single-toggle');
    document.querySelector('.single-toggle.toggle').classList.toggle('active');
    makeItRain();
  });
  
  makeItRain();