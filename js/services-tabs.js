(function() {
  var hash = window.location.hash.replace('#', '');
  if (hash) {
    var tab = document.querySelector('#servicesTabs button[data-bs-target="#' + hash + '"]');
    if (tab) {
      var bsTab = bootstrap.Tab.getOrCreateInstance(tab);
      bsTab.show();
    }
  }
  var servicesTabs = document.getElementById('servicesTabs');
  if (servicesTabs) {
    var tabLinks = servicesTabs.querySelectorAll('.nav-link');
    function clearPreview() {
      tabLinks.forEach(function(l) { l.classList.remove('preview-active', 'preview-inactive'); });
    }
    servicesTabs.addEventListener('mouseover', function(e) {
      var t = e.target.closest('.nav-link');
      if (!t || !servicesTabs.contains(t)) return;
      clearPreview();
      t.classList.add('preview-active');
      var activeTab = servicesTabs.querySelector('.nav-link.active');
      if (activeTab && activeTab !== t) activeTab.classList.add('preview-inactive');
    });
    servicesTabs.addEventListener('mouseleave', clearPreview);
  }
})();
