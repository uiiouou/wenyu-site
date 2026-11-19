(function () {
  var f = document.getElementById('signup-form'), note = document.getElementById('signup-note');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {};
    new FormData(f).forEach(function (v, k) { data[k] = v; });
    if (!data.name || !data.contact) {
      note.textContent = '请填写称呼与联系方式（本页仅存本地草稿）。';
      note.style.borderColor = 'var(--error-border)';
      return;
    }
    try {
      var all = JSON.parse(localStorage.getItem('wenyu_demo_signups') || '[]');
      all.push(Object.assign(data, { at: new Date().toISOString() }));
      localStorage.setItem('wenyu_demo_signups', JSON.stringify(all));
      note.innerHTML = '已保存在<strong>本机浏览器</strong>（草稿 ' + all.length + ' 条）。本页不会发送任何数据。';
      note.style.borderColor = 'var(--mint-border)';
    } catch (err) {
      note.textContent = '本机存储不可用，未记录。';
    }
  });
})();