(function() {
  var script = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  var projectId = script && script.getAttribute('data-project-id');
  if (!projectId) {
    return;
  }

  var configEndpoint = `https://pagemetrics-server.onrender.com/api/projects/${projectId}/config`;
  var trackingEndpoint = `https://pagemetrics-server.onrender.com/api/track`;

  function post(data) {
    try {
      fetch(trackingEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .catch(function(error) {
      });
    } catch (e) {
    }
  }

  function getSessionId() {
    try {
      var key = 'pm_session_' + projectId;
      var sid = sessionStorage.getItem(key);
      if (!sid) {
        sid = 'session-' + Math.random().toString(36).slice(2) + Date.now();
        sessionStorage.setItem(key, sid);
      }
      return sid;
    } catch (e) { 
      return 'session-' + Math.random().toString(36).slice(2) + Date.now();
    }
  }

  function getVisitorId() {
    try {
      var key = 'pm_visitor_' + projectId;
      var vid = localStorage.getItem(key);
      if (!vid) {
        vid = 'visitor-' + Math.random().toString(36).slice(2) + Date.now();
        localStorage.setItem(key, vid);
      }
      return vid;
    } catch (e) { 
      return 'visitor-' + Math.random().toString(36).slice(2) + Date.now();
    }
  }

  function getBrowserInfo() {
    var ua = navigator.userAgent;
    var browser = 'Unknown';
    var device = 'desktop';
    // Browser detection
    if (ua.includes('Chrome')) {
      browser = 'Chrome';
    } else if (ua.includes('Firefox')) {
      browser = 'Firefox';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browser = 'Safari';
    } else if (ua.includes('Edge')) {
      browser = 'Edge';
    } else if (ua.includes('Opera')) {
      browser = 'Opera';
    }
    // Device detection
    if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
      device = 'mobile';
    } else if (ua.includes('Tablet') || ua.includes('iPad')) {
      device = 'tablet';
    }

    return {
      browser: browser,
      device: device
    };
  }

  function fetchLocation(cb) {
    fetch('https://ipapi.co/json/')
      .then(function(res) { 
        if (!res.ok) throw new Error('Location API failed');
        return res.json(); 
      })
      .then(function(data) {
        cb({
          country: data.country,
          country_name: data.country_name
        });
      })
      .catch(function(error) { 
        cb(null); 
      });
  }

  // Main initialization
  fetch(configEndpoint)
    .then(function(res) { 
      
      if (!res.ok) throw new Error('Config fetch failed: ' + res.status);
      return res.json(); 
    })
    .then(function(config) {
      var sessionId = getSessionId();
      var visitorId = getVisitorId();
      var browserInfo = getBrowserInfo();
      var trackedScroll = 0;
      var timingSent = false;

      // Base payload structure
      function createBasePayload() {
        return {
          project_id: projectId,
          session_id: sessionId,
          visitor_id: visitorId,
          url: location.href,
          ts: Date.now(),
          browser: browserInfo.browser,
          device: browserInfo.device
        };
      }

      // Page views tracking
      if (config.page_views) {
        
        var data = createBasePayload();
        data.event_type = 'page_view';
        
        if (config.referrers) {
          data.referrer = document.referrer;
        }
        
        if (config.locations) {
          fetchLocation(function(loc) {
            if (loc) {
              data.country = loc.country;
              data.country_name = loc.country_name;
            }
            post(data);
          });
        } else {
          post(data);
        }
      }

      // Sessions tracking
      if (config.sessions) {
        var data = createBasePayload();
        data.event_type = 'session';
        post(data);
      }

      // Click tracking
      if (config.click_tracking) {
        document.addEventListener('click', function(e) {
          var t = e.target.closest('a,button');
          if (!t) return;
          var data = createBasePayload();
          data.event_type = 'click';
          data.tag = t.tagName;
          data.text = t.innerText;
          data.href = t.href || null;
          post(data);
        });
      }

      // Scroll depth tracking
      if (config.scroll_depth) {
        window.addEventListener('scroll', function() {
          var scrolled = Math.floor((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
          if (scrolled > trackedScroll && scrolled >= 25) { // Only track meaningful scroll increments
            trackedScroll = Math.floor(scrolled / 25) * 25; // Track in 25% increments
            var data = createBasePayload();
            data.event_type = 'scroll';
            data.percent = trackedScroll;
            post(data);
          }
        });
      }

      // User timing tracking
      if (config.user_timing && window.performance && !timingSent) {
        function sendTimingData() {
          if (timingSent) return;
          var timing = window.performance.timing || {};
          if (timing.loadEventEnd && timing.navigationStart) {
            var data = createBasePayload();
            data.event_type = 'timing';
            data.timing = {
              domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
              load: timing.loadEventEnd - timing.navigationStart
            };
            post(data);
            timingSent = true;
          }
        }
        
        if (document.readyState === 'complete') {
          setTimeout(sendTimingData, 0);
        } else {
          window.addEventListener('load', function() {
            setTimeout(sendTimingData, 100);
          });
        }
      }

      // Custom events API
      if (config.custom_events) {
        window.pagemetricsTrack = function(event, props) {
          var data = createBasePayload();
          data.event_type = 'custom';
          data.event = event;
          data.props = props || {};
          post(data);
        };
      }
    })
    .catch(function(error) {
    });
})();