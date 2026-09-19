/**
 * Arms the scroll-reveal animation.
 *
 * Runs before first paint so content is never shown and then hidden. Exposes
 * window.__hsReveal() so client-side route changes can re-scan; and if the
 * observer somehow never runs, a timer drops the `js` class so every section
 * becomes visible rather than staying blank.
 */
const SCRIPT = `
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');

  function reveal(el) { el.setAttribute('data-revealed', ''); }

  var io = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) { reveal(entries[i].target); io.unobserve(entries[i].target); }
        }
      }, { rootMargin: '0px 0px -60px 0px' })
    : null;

  window.__hsReveal = function () {
    var nodes = d.querySelectorAll('[data-reveal]:not([data-revealed])');
    for (var i = 0; i < nodes.length; i++) {
      if (io) io.observe(nodes[i]); else reveal(nodes[i]);
    }
  };

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', window.__hsReveal);
  else window.__hsReveal();

  // Failsafe: if anything above went wrong, show everything rather than
  // leaving the page blank below the hero.
  setTimeout(function () {
    var hidden = d.querySelectorAll('[data-reveal]:not([data-revealed])');
    if (hidden.length && !d.querySelector('[data-reveal][data-revealed]')) root.classList.remove('js');
  }, 2500);
})();
`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
