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

  load('navbar-placeholder', 'partials/navbar.html', function() {
    setActiveNav(document.querySelector('.navbar'));
  });
  load('footer-placeholder', 'partials/footer.html');
})();
