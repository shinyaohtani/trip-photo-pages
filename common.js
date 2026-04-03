/* 共通パーツを一元管理 - ここを変更すれば全ページに反映されます */

var SITE = {
  name: 'TripPhoto',
  tagline: '旅の写真を地図の軌跡で楽しもう',
  copyright: '&copy; 2026 TripPhoto',
  nav: [
    { href: 'index.html', label: 'TripPhoto' },
    { href: 'support.html', label: 'サポート' },
    { href: 'privacy.html', label: 'プライバシー' }
  ],
  appStoreUrl: '#',
  appStoreLabel: '近日公開予定',
  supportEmail: 'aabce.apps.support@gmail.com'
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
  var slides = track.children;
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

/* 8桁の問い合わせIDを生成 */
function generateInquiryId() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var id = '';
  for (var i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/* mailto リンクにテンプレートを設定 */
function initMailLinks() {
  var links = document.querySelectorAll('a[data-mail-template]');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var id = generateInquiryId();
      var subject = '【TripPhoto】お問い合わせ（ID: ' + id + '）';
      var body = [
        '※ 以下のテンプレートをご利用ください。',
        '',
        '■ 問い合わせID: ' + id,
        '■ アプリ名: TripPhoto',
        '■ お使いの端末:（例: iPhone 16）',
        '■ iOSバージョン:（例: iOS 18.0）',
        '',
        '■ お問い合わせ種別:',
        '  □ 不具合の報告',
        '  □ 機能のご要望',
        '  □ 使い方のご質問',
        '  □ その他',
        '',
        '■ 詳細:',
        '',
        ''
      ].join('\n');
      var mailto = 'mailto:' + SITE.supportEmail
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  });
}

/* 初期化 */
document.addEventListener('DOMContentLoaded', function() {
  renderNav();
  renderHero();
  renderFooter();
  initCarousel();
  initMailLinks();
});
