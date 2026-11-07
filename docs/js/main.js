(() => {
  // node_modules/@aptabase/web/dist/index.js
  var s;
  var i;
  var v = typeof window < "u" && typeof window.fetch < "u";
  var h = typeof chrome < "u" && !!chrome.runtime?.id;
  var a = c();
  var d = /* @__PURE__ */ new Date();
  var l = { US: "https://us.aptabase.com", EU: "https://eu.aptabase.com", DEV: "http://localhost:3000", SH: "" };
  function p(e) {
    let n = /* @__PURE__ */ new Date(), t = n.getTime() - d.getTime();
    return Math.floor(t / 1e3) > e && (a = c()), d = n, a;
  }
  function c() {
    let e = Math.floor(Date.now() / 1e3).toString(), n = Math.floor(Math.random() * 1e8).toString().padStart(8, "0");
    return e + n;
  }
  function u(e) {
    let n = e.split("-");
    return n.length !== 3 || l[n[1]] === void 0 ? (console.warn(`The Aptabase App Key "${e}" is invalid. Tracking will be disabled.`), false) : true;
  }
  function f(e, n) {
    let t = e.split("-")[1];
    if (t === "SH") {
      if (!n?.host) {
        console.warn("Host parameter must be defined when using Self-Hosted App Key. Tracking will be disabled.");
        return;
      }
      return `${n.host}/api/v0/event`;
    }
    return `${n?.host ?? l[t]}/api/v0/event`;
  }
  async function g(e) {
    if (!v && !h) {
      console.warn(`Aptabase: trackEvent requires a browser environment. Event "${e.eventName}" will be discarded.`);
      return;
    }
    if (!e.appKey) {
      console.warn(`Aptabase: init must be called before trackEvent. Event "${e.eventName}" will be discarded.`);
      return;
    }
    try {
      let n = await fetch(e.apiUrl, { method: "POST", headers: { "Content-Type": "application/json", "App-Key": e.appKey }, credentials: "omit", body: JSON.stringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), sessionId: e.sessionId, eventName: e.eventName, systemProps: { locale: e.locale ?? w(), isDebug: e.isDebug ?? y(), appVersion: e.appVersion ?? "", sdkVersion: e.sdkVersion }, props: e.props }) });
      if (n.status >= 300) {
        let t = await n.text();
        console.warn(`Failed to send event "${e.eventName}": ${n.status} ${t}`);
      }
    } catch (n) {
      console.warn(`Failed to send event "${e.eventName}"`), console.warn(n);
    }
  }
  function w() {
    if (s) return s;
    if (!(typeof navigator > "u")) return navigator.languages.length > 0 ? s = navigator.languages[0] : s = navigator.language, s;
  }
  function y() {
    return i !== void 0 ? i : true ? (i = true, i) : typeof location > "u" ? (i = false, i) : (i = location.hostname === "localhost", i);
  }
  var S = 1 * 60 * 60;
  var I = "aptabase-web@0.4.3";
  var b = "";
  var r;
  var o;
  function D(e, n) {
    u(e) && (r = n?.apiUrl ?? f(e, n), b = e, o = n);
  }
  async function O(e, n) {
    if (!r) return;
    let t = p(S);
    await g({ apiUrl: r, sessionId: t, appKey: b, isDebug: o?.isDebug, appVersion: o?.appVersion, sdkVersion: I, eventName: e, props: n });
  }

  // <stdin>
  D("A-EU-6403105423");
  function track(name, extra) {
    const props = {
      path: location.pathname,
      lang: document.documentElement.lang || ""
    };
    if (extra) {
      Object.keys(extra).forEach(function(key) {
        const value = extra[key];
        if (typeof value === "string" || typeof value === "number") props[key] = value;
      });
    }
    O(name, props);
  }
  window.weebiTrack = track;
  document.addEventListener("DOMContentLoaded", function() {
    const swiper2El = document.querySelector(".swiper2");
    if (swiper2El && typeof Swiper !== "undefined") {
      new Swiper(swiper2El, {
        pagination: {
          el: ".swiper-pagination2"
        }
      });
    }
    track("new_visitor");
    document.addEventListener("click", function(event) {
      const el = event.target.closest('[data-track], a[href^="mailto:"]');
      if (!el) return;
      const name = el.getAttribute("data-track") || "email_click";
      const label = el.getAttribute("data-track-label");
      track(name, label ? { label } : null);
    });
    document.querySelectorAll('select[name="languages"]').forEach(function(sel) {
      sel.addEventListener("change", function() {
        track("language_change", { to: sel.value });
      });
    });
  });
})();
