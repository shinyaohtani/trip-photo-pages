/* 共通パーツを一元管理 - ここを変更すれば全ページに反映されます */

var SITE = {
  name: 'TripPhoto',
  tagline: '旅の写真を地図の軌跡で楽しもう',
  copyright: '&copy; 2026 TripPhoto',
  nav: [
    { href: 'index.html', label: 'TripPhoto' },
    { href: 'support.html', label: 'サポート' },
    { href: 'privacy.html', label: 'プライバシーポリシー' }
  ],
  appStoreUrl: '#',
  appStoreLabel: '近日公開予定'
};

/* nav を生成 */
function renderNav() {
  var el = document.getElementById('site-nav');
  if (!el) return;
  el.innerHTML = SITE.nav.map(function(item) {
    return '<a href="' + item.href + '">' + item.label + '</a>';
  }).join('');
}

/* hero を生成 */
function renderHero() {
  var el = document.getElementById('site-hero');
  if (!el) return;
  el.innerHTML = '<h1>' + SITE.name + '</h1><p>' + SITE.tagline + '</p>';
}

/* footer を生成 */
function renderFooter() {
  var el = document.getElementById('site-footer');
  if (!el) return;
  var links = SITE.nav.filter(function(item) {
    return item.href !== 'index.html';
  }).map(function(item) {
    return '<a href="' + item.href + '">' + item.label + '</a>';
  }).join(' &middot; ');
  el.innerHTML = SITE.copyright + ' &middot; ' + links;
}

/* カルーセル */
function initCarousel() {
  var track = document.getElementById('carouselTrack');
  var dots = document.getElementById('carouselDots');
  if (!track || !dots) return;
  var slides = track.querySelectorAll('a, img');
  var count = slides.length;
  var current = 0;
  for (var i = 0; i < count; i++) {
    var btn = document.createElement('button');
    btn.dataset.index = i;
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', function() { goTo(Number(this.dataset.index)); });
    dots.appendChild(btn);
  }
  function goTo(n) {
    current = (n + count) % count;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    var btns = dots.querySelectorAll('button');
    for (var j = 0; j < btns.length; j++) btns[j].classList.toggle('active', j === current);
  }
  setInterval(function() { goTo(current + 1); }, 4000);
}

/* 初期化 */
document.addEventListener('DOMContentLoaded', function() {
  renderNav();
  renderHero();
  renderFooter();
  initCarousel();
});
