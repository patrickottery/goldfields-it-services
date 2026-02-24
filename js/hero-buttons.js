(function() {
  var wrap = document.getElementById('hero-buttons');
  if (!wrap) return;
  var btns = wrap.querySelectorAll('.btn');
  function clearPreview() {
    btns.forEach(function(b) { b.classList.remove('preview-active', 'preview-inactive'); });
  }
  wrap.addEventListener('mouseover', function(e) {
    var t = e.target.closest('.btn');
    if (!t || !wrap.contains(t)) return;
    clearPreview();
    t.classList.add('preview-active');
    btns.forEach(function(b) {
      if (b !== t) b.classList.add('preview-inactive');
    });
  });
  wrap.addEventListener('mouseleave', clearPreview);
})();
