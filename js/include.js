(function() {
  var base = document.querySelector('script[data-include-base]');
  var basePath = base ? base.getAttribute('data-include-base') : '';
  if (basePath && !basePath.endsWith('/')) basePath += '/';

  function currentPage() {
    var path = window.location.pathname.replace(/^\//, '');
    if (path === '' || path === 'index.html') return 'index.html';
    return path.split('/').pop() || 'index.html';
  }

  function setActiveNav(container) {
    if (!container) return;
    var page = currentPage();
    container.querySelectorAll('.nav-link').forEach(function(a) {
      var href = a.getAttribute('href') || '';
      if (href === page) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  function load(placeholderId, url, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    fetch(basePath + url)
      .then(function(r) { return r.text(); })
      .then(function(html) {
        el.outerHTML = html;
        if (callback) callback();
      })
      .catch(function() {
        el.innerHTML = '<!-- Failed to load ' + url + ' -->';
      });
  }

  /** Add hover preview (preview-active on hovered item, preview-inactive on others). */
  function initPreviewHighlight(containerId, itemSelector) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var items = container.querySelectorAll(itemSelector);
    function clear() {
      items.forEach(function(el) { el.classList.remove('preview-active', 'preview-inactive'); });
    }
    container.addEventListener('mouseover', function(e) {
      var t = e.target.closest(itemSelector);
      if (!t || !container.contains(t)) return;
      clear();
      t.classList.add('preview-active');
      items.forEach(function(el) { if (el !== t) el.classList.add('preview-inactive'); });
    });
    container.addEventListener('mouseleave', clear);
  }

  /** Open services tab from hash (e.g. #business-it). */
  function initServicesHash() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return;
    var tab = document.querySelector('#servicesTabs button[data-bs-target="#' + hash + '"]');
    if (tab && typeof bootstrap !== 'undefined') {
      bootstrap.Tab.getOrCreateInstance(tab).show();
    }
  }

  load('navbar-placeholder', 'partials/navbar.html', function() {
    setActiveNav(document.querySelector('.navbar'));
  });
  load('footer-placeholder', 'partials/footer.html', function() {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  initPreviewHighlight('hero-buttons', '.btn');
  initPreviewHighlight('servicesTabs', '.nav-link');
  initServicesHash();
})();
