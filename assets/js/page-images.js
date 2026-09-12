(function () {
  'use strict';
  const base = new URL('../../', document.currentScript.src);
  const assets = new URL('assets/img/', base);
  const medicines = {
    'diazepam-martin-dows-10mg.html': 'valium.jpg',
    'sedil-diazepam-5-mg.html': 'sedil.jpg',
    'rivotril-clonazepam-2mg.html': 'rivotril-2.jpg',
    'nitrazepam-noctin-5-mg.html': 'noctin.jpg',
    'lorazepam-ativan-2-mg-n.html': 'lorazepam.jpg',
    'bromazepam.html': 'broze.jpg',
    'zopiclone.html': 'zopiclone-tablets.jpg'
  };
  const posts = {
    'why-can-t-i-sleep.html': 'insomnia.jpg',
    'what-is-neuropathy-causes-symptoms-treatment-options.html': 'neuropathy.jpg',
    'panic-attack-causes-symptoms-treatment.html': 'panic-attack.jpg',
    'signs-of-adhd-in-adults-northwestmeds.html': 'adhd.jpg',
    'how-to-safely-purchase-prescription-medicines-online-in-the-uk.html': 'how-to-safely-purchase-prescription-medicines-online-in-uk-complete-guide.jpg'
  };
  const services = ['reliable-online-pharmacy-in-lancaster', 'best-online-drugstore-in-warrington', 'best-online-drugstore-in-bolton'];
  const slug = url => new URL(url, location.href).pathname.split('/').pop();
  function setImage(img, file, eager) {
    const url = new URL(file, assets).href;
    if (img.src !== url) img.src = url;
    img.classList.add('matched-page-image');
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
  }
  function enhanceCards() {
    document.querySelectorAll('.medicine-card,.shop-card,.category-product-card').forEach(card => {
      const link = card.querySelector('a[href*="medicine/"]');
      const img = card.querySelector('img');
      if (link && img && medicines[slug(link.href)]) setImage(img, 'medicine/img/' + medicines[slug(link.href)], false);
    });
    document.querySelectorAll('.content-card:not(.shop-card)').forEach(card => {
      const link = card.querySelector('a[href*="post/"]');
      if (!link || !posts[slug(link.href)] || card.querySelector('.matched-blog-art')) return;
      const art = card.querySelector('.card-art');
      if (!art) return;
      const imageLink = document.createElement('a');
      imageLink.href = link.href;
      imageLink.className = 'matched-blog-art';
      const img = document.createElement('img');
      img.alt = card.querySelector('h2')?.textContent || '';
      setImage(img, 'blog/post/' + posts[slug(link.href)], false);
      imageLink.append(img);
      art.replaceWith(imageLink);
    });
  }
  function init() {
    const current = slug(location.href);
    const product = document.querySelector('.product-main-image img');
    if (product && medicines[current]) setImage(product, 'medicine/img/' + medicines[current], true);
    enhanceCards();
    const grid = document.querySelector('#medicine-grid');
    if (grid) new MutationObserver(enhanceCards).observe(grid, {childList:true});
    const hero = document.querySelector('.page-hero');
    if (hero && location.pathname.includes('/blog/')) {
      hero.classList.add('matched-blog-hero');
      hero.style.backgroundImage = 'linear-gradient(90deg,rgba(247,252,250,.97),rgba(247,252,250,.85)),url("' + new URL('blog/' + (current.includes('adhd') ? 'adhd-diagnosis-breadcrumb.webp' : 'blog-breadcrumb-1.webp'), assets).href + '")';
    }
    const service = current.replace(/\.html$/, '');
    const file = posts[current] ? 'blog/post/' + posts[current] : services.includes(service) ? 'service/img/' + service + '.webp' : null;
    const article = document.querySelector('.article-content');
    if (file && article && !article.querySelector('.matched-article-image')) {
      const figure = document.createElement('figure');
      figure.className = 'matched-article-image';
      const img = document.createElement('img');
      img.alt = document.querySelector('h1')?.textContent || '';
      setImage(img, file, false);
      figure.append(img);
      article.prepend(figure);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
