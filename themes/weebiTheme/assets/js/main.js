import { init, trackEvent } from '@aptabase/web';

init('A-EU-6403105423');

function track(name, extra) {
  const props = {
    path: location.pathname,
    lang: document.documentElement.lang || '',
  };
  if (extra) {
    Object.keys(extra).forEach(function (key) {
      const value = extra[key];
      if (typeof value === 'string' || typeof value === 'number') props[key] = value;
    });
  }
  trackEvent(name, props);
}

window.weebiTrack = track;

document.addEventListener('DOMContentLoaded', function() {
  const swiper2El = document.querySelector('.swiper2');
  if (swiper2El && typeof Swiper !== 'undefined') {
    new Swiper(swiper2El, {
      pagination: {
        el: '.swiper-pagination2',
      },
    });
  }

  track('new_visitor');

  document.addEventListener('click', function (event) {
    const el = event.target.closest('[data-track], a[href^="mailto:"]');
    if (!el) return;
    const name = el.getAttribute('data-track') || 'email_click';
    const label = el.getAttribute('data-track-label');
    track(name, label ? { label: label } : null);
  });

  document.querySelectorAll('select[name="languages"]').forEach(function (sel) {
    sel.addEventListener('change', function () {
      track('language_change', { to: sel.value });
    });
  });
});
