import { init, trackEvent } from '@aptabase/web';

init('A-EU-6403105423');

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  slidesPerView: "auto",
  spaceBetween: 30,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

const swiper2 = new Swiper('.swiper2', {
  pagination: {
    el: '.swiper-pagination2',
  },
});

document.addEventListener('DOMContentLoaded', function() {
  trackEvent('new_visitor');

  let downloadPlayStore = document.getElementById('download_playstore');
  let downloadAppleStore = document.getElementById('download_apple_store');
  let downloadMicrosoftStore = document.getElementById('download_microsoft_store');
  let openWebDemo = document.getElementById('open_web_demo');

  downloadPlayStore.addEventListener('click', function(event) {
    trackEvent('open_playstore');
  });

  downloadAppleStore.addEventListener('click', function(event) {
    trackEvent('open_applestore');
  });

  downloadMicrosoftStore.addEventListener('click', function(event) {
    trackEvent('open_microsoftstore');
  });
  openWebDemo.addEventListener('click', function(event) {
    trackEvent('open_web_demo');
  });
});