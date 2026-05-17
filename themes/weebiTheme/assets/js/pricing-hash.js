/**
 * Legacy pricing anchors (#telechargement-prix) → /{lang}/prix/
 */
(function () {
  var legacyHashes = ['#telechargement-prix', '#telechargement'];

  function redirectLegacyHash() {
    if (legacyHashes.indexOf(window.location.hash) === -1) {
      return;
    }

    var langMatch = window.location.pathname.match(/^\/(fr|en)\/?$/);
    if (langMatch) {
      window.location.replace('/' + langMatch[1] + '/prix/');
      return;
    }

    if (document.getElementById('prix')) {
      window.location.replace(window.location.pathname + window.location.search + '#prix');
    }
  }

  redirectLegacyHash();
  window.addEventListener('hashchange', redirectLegacyHash);
})();
