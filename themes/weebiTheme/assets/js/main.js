import { init, trackEvent } from '@aptabase/web';

init('A-EU-6403105423');

document.addEventListener('DOMContentLoaded', function() {
  const swiper2El = document.querySelector('.swiper2');
  if (swiper2El) {
    new Swiper(swiper2El, {
      pagination: {
        el: '.swiper-pagination2',
      },
    });
  }

  trackEvent('new_visitor');

  let downloadPlayStore = document.getElementById('download_playstore');
  let downloadAppleStore = document.getElementById('download_apple_store');
  let downloadMicrosoftStore = document.getElementById('download_microsoft_store');
  let openWebConsoleBtns = document.querySelectorAll('.web-console-cta');

  downloadPlayStore.addEventListener('click', function(event) {
    trackEvent('open_playstore');
  });

  downloadAppleStore.addEventListener('click', function(event) {
    trackEvent('open_applestore');
  });

  downloadMicrosoftStore.addEventListener('click', function(event) {
    trackEvent('open_microsoftstore');
  });
  openWebConsoleBtns.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      trackEvent('open_web_console');
    });
  });
});
