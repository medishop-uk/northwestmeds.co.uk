(function(){
 'use strict';
 const base=new URL('../../',document.currentScript.src);
 function init(){
  const asset=file=>new URL('assets/img/'+file,base).href;
  const posts={
   'why-can-t-i-sleep.html':'insomnia.jpg',
   'what-is-neuropathy-causes-symptoms-treatment-options.html':'neuropathy.jpg',
   'panic-attack-causes-symptoms-treatment.html':'panic-attack.jpg',
   'signs-of-adhd-in-adults-northwestmeds.html':'adhd.jpg',
   'how-to-safely-purchase-prescription-medicines-online-in-the-uk.html':'how-to-safely-purchase-prescription-medicines-online-in-uk-complete-guide.jpg'
  };
  const current=location.pathname.split('/').pop();
  const services=['reliable-online-pharmacy-in-lancaster','best-online-drugstore-in-warrington','best-online-drugstore-in-bolton'];
  function picture(file,alt,cls){const img=document.createElement('img');img.src=asset(file);img.alt=alt;img.className=cls;img.loading='lazy';img.decoding='async';return img}
  const article=document.querySelector('.article-content');
  const service=current.replace(/\.html$/,'');
  const articleFile=posts[current]?'blog/post/'+posts[current]:services.includes(service)?'service/'+service+'.webp':null;
  if(article&&articleFile&&!article.querySelector('.article-photo'))article.prepend(picture(articleFile,document.querySelector('h1')?.textContent||'', 'article-photo'));
  document.querySelectorAll('.content-card:not(.shop-card)').forEach(card=>{
   const link=card.querySelector('a[href*="post/"]');const file=link&&posts[new URL(link.href).pathname.split('/').pop()];const art=card.querySelector('.card-art');
   if(file&&art){const a=document.createElement('a');a.href=link.href;a.className='blog-photo-link';a.append(picture('blog/post/'+file,card.querySelector('h2')?.textContent||'','blog-photo'));art.replaceWith(a)}
  });
  const blogHero=document.querySelector('.page-hero');
  if(blogHero&&location.pathname.includes('/blog/')){blogHero.style.backgroundImage='linear-gradient(90deg,rgba(247,252,250,.96),rgba(247,252,250,.85)),url("'+asset('blog/breadcrumb/'+(current.includes('adhd')?'adhd-diagnosis-breadcrumb.webp':posts[current]?'breadcrum-02.webp':'breadcrum-03.webp'))+'")';blogHero.style.backgroundSize='cover';blogHero.style.backgroundPosition='center'}
  const oldHero=document.querySelector('.hero');
  if(oldHero&&document.querySelector('#medicine-search')){
   if(typeof heroSlideTimer!=='undefined')clearInterval(heroSlideTimer);
   const slider=document.createElement('section');slider.className='home-image-slider';slider.setAttribute('aria-label','NorthwestMeds highlights');slider.setAttribute('aria-roledescription','carousel');
   const frames=document.createElement('div');frames.className='slider-frames';
   const controls=document.createElement('div');controls.className='slider-controls';
   let selected=0,timer;const imgs=[],dots=[];const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;
   function show(i){selected=(i+7)%7;imgs.forEach((img,n)=>img.hidden=n!==selected);dots.forEach((dot,n)=>dot.setAttribute('aria-current',String(n===selected)))}
   function start(){clearInterval(timer);if(!paused)timer=setInterval(()=>show(selected+1),6000)}
   const prev=document.createElement('button');prev.type='button';prev.textContent='Previous';prev.onclick=()=>{show(selected-1);start()};controls.append(prev);
   for(let i=0;i<7;i++){const img=picture('slider/home-slider-0'+(i+1)+'.jpeg','NorthwestMeds highlight '+(i+1),'slider-image');img.width=1140;img.height=430;img.hidden=i!==0;if(i===0){img.loading='eager';img.fetchPriority='high'}imgs.push(img);frames.append(img);const dot=document.createElement('button');dot.type='button';dot.textContent=String(i+1);dot.setAttribute('aria-label','Show slide '+(i+1));dot.onclick=()=>{show(i);start()};dots.push(dot);controls.append(dot)}
   const next=document.createElement('button');next.type='button';next.textContent='Next';next.onclick=()=>{show(selected+1);start()};controls.append(next);
   const pause=document.createElement('button');pause.type='button';pause.textContent=paused?'Play':'Pause';pause.onclick=()=>{paused=!paused;pause.textContent=paused?'Play':'Pause';start()};controls.append(pause);
   slider.addEventListener('mouseenter',()=>clearInterval(timer));slider.addEventListener('mouseleave',start);slider.addEventListener('focusin',()=>clearInterval(timer));slider.addEventListener('focusout',event=>{if(!slider.contains(event.relatedTarget))start()});
   slider.append(frames,controls);oldHero.replaceWith(slider);show(0);start();
  }
  document.querySelectorAll('.desktop-nav,.page-nav,.mobile-nav,.page-mobile-nav').forEach(nav=>{
   if(![...nav.children].some(a=>a.tagName==='A'&&a.textContent.trim()==='Home')){const a=document.createElement('a');a.href=base.href;a.textContent='Home';nav.prepend(a)}
  });
  document.querySelectorAll('.header-actions,.page-actions').forEach(actions=>{
   [['WhatsApp','https://wa.me/447438135064',''],['Telegram','https://t.me/BenzoAddy','telegram']].forEach(([text,href,cls])=>{const a=document.createElement('a');a.className='header-chat '+cls;a.href=href;a.textContent=text;a.target='_blank';a.rel='noopener';actions.insertBefore(a,actions.querySelector('.menu-button,.page-menu'))});
  });
  function positionBasket(){
   document.querySelectorAll('.header-actions,.page-actions').forEach(actions=>{
    const basket=actions.querySelector('[data-cart-open],[data-commerce-open]');
    const whatsapp=actions.querySelector('.header-chat:not(.telegram)');
    if(basket&&whatsapp)actions.insertBefore(basket,whatsapp);
   });
  }
  positionBasket();
  // Interior pages share the existing product basket and its stored items.
  if(document.querySelector('.page-actions')&&!document.querySelector('[data-commerce-open]')){
   const load=file=>new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('assets/js/'+file,base).href;script.onload=resolve;script.onerror=reject;document.head.append(script)});
   const config=window.NORTHWESTMEDS_DATA_API?Promise.resolve():load('config.js');
   config.then(()=>load('commerce.js')).then(positionBasket).catch(error=>console.error('Basket could not load',error));
  }
  const floating=document.createElement('nav');floating.className='floating-contact';floating.setAttribute('aria-label','Quick contact');
  floating.innerHTML='<a class="floating-whatsapp" href="https://wa.me/447438135064" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" title="WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12 12 0 0 0-10.4 18L4 28l7-1.8A12 12 0 1 0 16 3Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 9c-2 1-2 4 0 7s5 5 8 6c2 0 4-2 3-3l-4-2-2 2c-2-1-4-3-5-5l2-1-2-4Z" fill="currentColor"/></svg></a><a class="floating-telegram" href="https://t.me/BenzoAddy" target="_blank" rel="noopener" aria-label="Message us on Telegram" title="Telegram"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 15 23-9-4 21-8-6-4 4 1-7 11-9-14 7Z" fill="currentColor"/></svg></a>';
  document.body.append(floating);
  const contact=document.querySelector('[data-contact-message]');
  if(contact)contact.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(contact);const message='Hello NorthwestMeds,\nName: '+data.get('name')+'\nTopic: '+data.get('topic')+'\nOrder reference: '+(data.get('reference')||'Not provided')+'\n\n'+data.get('message');location.href='https://wa.me/447438135064?text='+encodeURIComponent(message)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
