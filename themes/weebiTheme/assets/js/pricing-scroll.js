/**
 * Horizontal scroll helpers for the pricing comparison table.
 */
function initPricingScroll() {
  document.querySelectorAll('[data-pricing-scroll]').forEach((root) => {
    const wrapper = root.querySelector('.pricing-table-wrapper');
    const prevBtn = root.querySelector('.pricing-scroll-btn--prev');
    const nextBtn = root.querySelector('.pricing-scroll-btn--next');
    if (!wrapper) return;

    const scrollStep = () => Math.max(200, Math.round(wrapper.clientWidth * 0.72));

    const updateButtons = () => {
      const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
      const needsScroll = maxScroll > 8;

      root.classList.toggle('is-scrollable', needsScroll);

      if (prevBtn) {
        prevBtn.hidden = !needsScroll || wrapper.scrollLeft <= 4;
      }
      if (nextBtn) {
        nextBtn.hidden = !needsScroll || wrapper.scrollLeft >= maxScroll - 4;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: scrollStep(), behavior: 'smooth' });
      });
    }

    wrapper.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    wrapper.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      dragging = true;
      startX = event.clientX;
      startScroll = wrapper.scrollLeft;
      wrapper.setPointerCapture(event.pointerId);
      wrapper.classList.add('is-dragging');
    });

    wrapper.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      event.preventDefault();
      wrapper.scrollLeft = startScroll - (event.clientX - startX);
    });

    const endDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      wrapper.classList.remove('is-dragging');
      try {
        wrapper.releasePointerCapture(event.pointerId);
      } catch {
        /* pointer already released */
      }
      updateButtons();
    };

    wrapper.addEventListener('pointerup', endDrag);
    wrapper.addEventListener('pointercancel', endDrag);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingScroll);
} else {
  initPricingScroll();
}
