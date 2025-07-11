(function() {
  var script = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  var projectId = script && script.getAttribute('data-project-id');
  if (!projectId) return;

  var configEndpoint = `http://localhost:3000/api/projects/${projectId}/config`;
  var trackingEndpoint = `http://localhost:3000/api/tracking`;

  function post(data) {
    try {
      navigator.sendBeacon
        ? navigator.sendBeacon(trackingEndpoint, JSON.stringify(data))
        : fetch(trackingEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
    } catch (e) {}
  }

  function getSessionId() {
    try {
      var key = 'barelytics_session_' + projectId;
      var sid = sessionStorage.getItem(key);
      if (!sid) {
        sid = Math.random().toString(36).slice(2) + Date.now();
        sessionStorage.setItem(key, sid);
      }
      return sid;
    } catch (e) { return null; }
  }

  function fetchLocation(cb) {
    fetch('https://ipapi.co/json/')
      .then(function(res) { return res.json(); })
      .then(cb)
      .catch(function() { cb(null); });
  }

  fetch(configEndpoint)
    .then(function(res) { return res.json(); })
    .then(function(config) {
      var sessionId = getSessionId();
      var trackedScroll = 0;
      var timingSent = false;

      if (config.page_views) {
        var data = {
          type: 'pageview',
          project_id: projectId,
          url: location.href,
          referrer: document.referrer,
          session_id: sessionId,
          ts: Date.now()
        };
        if (config.referrers) data.referrer = document.referrer;
        if (config.locations) {
          fetchLocation(function(loc) {
            if (loc) data.location = loc;
            post(data);
          });
        } else {
          post(data);
        }
      }

      if (config.sessions) {
        post({
          type: 'session',
          project_id: projectId,
          session_id: sessionId,
          url: location.href,
          ts: Date.now()
        });
      }

      if (config.click_tracking) {
        document.addEventListener('click', function(e) {
          var t = e.target.closest('a,button');
          if (!t) return;
          post({
            type: 'click',
            tag: t.tagName,
            text: t.innerText,
            href: t.href || null,
            project_id: projectId,
            session_id: sessionId,
            url: location.href,
            ts: Date.now()
          });
        });
      }

      if (config.scroll_depth) {
        window.addEventListener('scroll', function() {
          var scrolled = Math.floor((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
          if (scrolled > trackedScroll) {
            trackedScroll = scrolled;
            post({
              type: 'scroll',
              percent: trackedScroll,
              project_id: projectId,
              session_id: sessionId,
              url: location.href,
              ts: Date.now()
            });
          }
        });
      }

      if (config.user_timing && window.performance && !timingSent) {
        window.addEventListener('load', function() {
          setTimeout(function() {
            var timing = window.performance.timing || {};
            post({
              type: 'timing',
              project_id: projectId,
              session_id: sessionId,
              url: location.href,
              ts: Date.now(),
              timing: {
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                load: timing.loadEventEnd - timing.navigationStart
              }
            });
            timingSent = true;
          }, 0);
        });
      }

      if (config.custom_events) {
        window.barelyticsTrack = function(event, props) {
          post({
            type: 'custom',
            event: event,
            props: props,
            project_id: projectId,
            session_id: sessionId,
            url: location.href,
            ts: Date.now()
          });
        };
      }
    });
})(); 