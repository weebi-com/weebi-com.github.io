(() => {
  // node_modules/@aptabase/web/dist/index.js
  var b = w();
  var m = y();
  var v = typeof window < "u" && typeof window.fetch < "u";
  var h = typeof chrome < "u" && !!chrome.runtime?.id;
  var r = d();
  var o = /* @__PURE__ */ new Date();
  var a = { US: "https://us.aptabase.com", EU: "https://eu.aptabase.com", DEV: "http://localhost:3000", SH: "" };
  function p(e) {
    let n = /* @__PURE__ */ new Date(), t = n.getTime() - o.getTime();
    return Math.floor(t / 1e3) > e && (r = d()), o = n, r;
  }
  function d() {
    let e = Math.floor(Date.now() / 1e3).toString(), n = Math.floor(Math.random() * 1e8).toString().padStart(8, "0");
    return e + n;
  }
  function l(e) {
    let n = e.split("-");
    return n.length !== 3 || a[n[1]] === void 0 ? (console.warn(`The Aptabase App Key "${e}" is invalid. Tracking will be disabled.`), false) : true;
  }
  function c(e, n) {
    let t = e.split("-")[1];
    if (t === "SH") {
      if (!n?.host) {
        console.warn("Host parameter must be defined when using Self-Hosted App Key. Tracking will be disabled.");
        return;
      }
      return `${n.host}/api/v0/event`;
    }
    return `${n?.host ?? a[t]}/api/v0/event`;
  }
  async function u(e) {
    if (!v && !h) {
      console.warn(`Aptabase: trackEvent requires a browser environment. Event "${e.eventName}" will be discarded.`);
      return;
    }
    if (!e.appKey) {
      console.warn(`Aptabase: init must be called before trackEvent. Event "${e.eventName}" will be discarded.`);
      return;
    }
    try {
      let n = await fetch(e.apiUrl, { method: "POST", headers: { "Content-Type": "application/json", "App-Key": e.appKey }, credentials: "omit", body: JSON.stringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), sessionId: e.sessionId, eventName: e.eventName, systemProps: { locale: e.locale ?? b, isDebug: e.isDebug ?? m, appVersion: e.appVersion ?? "", sdkVersion: e.sdkVersion }, props: e.props }) });
      if (n.status >= 300) {
        let t = await n.text();
        console.warn(`Failed to send event "${e.eventName}": ${n.status} ${t}`);
      }
    } catch (n) {
      console.warn(`Failed to send event "${e.eventName}"`), console.warn(n);
    }
  }
  function w() {
    if (!(typeof navigator > "u"))
      return navigator.languages.length > 0 ? navigator.languages[0] : navigator.language;
  }
  function y() {
    return true ? true : typeof location > "u" ? false : location.hostname === "localhost";
  }
  var S = 1 * 60 * 60;
  var I = "aptabase-web@0.4.2";
  var g = "";
  var s;
  var i;
  function D(e, n) {
    l(e) && (s = n?.apiUrl ?? c(e, n), g = e, i = n);
  }
  async function O(e, n) {
    if (!s)
      return;
    let t = p(S);
    await u({ apiUrl: s, sessionId: t, appKey: g, isDebug: i?.isDebug, appVersion: i?.appVersion, sdkVersion: I, eventName: e, props: n });
  }

  // <stdin>
  var apiKey = "A-EU-6403105423";
  D(apiKey);
  var swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    }
  });
  var swiper2 = new Swiper(".swiper2", {
    pagination: {
      el: ".swiper-pagination2"
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    O("a_user_visit_the_website");
    let downloadPlayStore = document.getElementById("download_playstore");
    let downloadAppleStore = document.getElementById("download_apple_store");
    let downloadMicrosoftStore = document.getElementById("download_microsoft_store");
    downloadPlayStore.addEventListener("click", function(event) {
      O("downloadPlayStore");
    });
    downloadAppleStore.addEventListener("click", function(event) {
      O("downloadAppleStore");
    });
    downloadMicrosoftStore.addEventListener("click", function(event) {
      O("downloadMicrosoftStore");
    });
  });
})();
