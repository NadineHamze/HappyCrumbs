/* Happy Crumbs front-end JS */

/* ====== HELPERS ====== */
const qs = (sel, ctx=document) => ctx.querySelector(sel);
const qsa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* ====== NAV SCROLL SHRINK ====== */
(function navScrollEffect(){
  const header = qs('#site-header');
  const scrolledClass = 'scrolled';
  const threshold = 10;
  const onScroll = () => {
    if (window.scrollY > threshold) header.classList.add(scrolledClass);
    else header.classList.remove(scrolledClass);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

/* ====== MOBILE NAV TOGGLE ====== */
(function mobileNav(){
  const toggleBtn = qs('#nav-toggle');
  const menu = qs('#hc-nav-menu');
  if (!toggleBtn || !menu) return;
  toggleBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close menu on link click
  menu.addEventListener('click', e => {
    if (e.target.matches('a')) {
      menu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded','false');
    }
  });
})();

/* ====== SMOOTH SCROLL (native fallback) ====== */
(function smoothScrollLinks(){
  qsa('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',e=>{
      const id = link.getAttribute('href');
      if (id.length>1){
        const target = qs(id);
        if (target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          history.replaceState(null,'',id);
        }
      }
    });
  });
})();

/* ====== YEAR AUTO ====== */
(function injectYear(){
  const el = qs('#js-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ====== INIT SWIPER CAROUSELS ====== */
function initCarousels(){
  qsa('.hc-product-carousel').forEach(el=>{
    const product = el.dataset.product || 'items';
    /* responsive breakpoints */
    new Swiper(el, {
      slidesPerView:1.2,
      spaceBetween:16,
      centeredSlides:false,
      loop:true,
      grabCursor:true,
      navigation:{
        nextEl:el.querySelector('.swiper-button-next'),
        prevEl:el.querySelector('.swiper-button-prev')
      },
      pagination:{
        el:el.querySelector('.swiper-pagination'),
        clickable:true
      },
      breakpoints:{
        480:{slidesPerView:2,spaceBetween:20},
        768:{slidesPerView:3,spaceBetween:24},
        1024:{slidesPerView:4,spaceBetween:32}
      },
      a11y:{
        enabled:true,
        prevSlideMessage:`Previous ${product}`,
        nextSlideMessage:`Next ${product}`,
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', initCarousels);

/* ====== INIT AOS (scroll reveal) ====== */
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      once:false,
      offset:120,
      duration:600,
      easing:'ease-out',
    });
  }
});

/* ====== REDUCED MOTION: stop floating anim ====== */
(function respectReducedMotion(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    qsa('.hc-floating').forEach(el=>el.style.animation='none');
  }
})();

(function randomizeFloating(){
    qsa('.hc-floating').forEach(el => {
      const size = Math.random() * 80 + 120;  // 40px - 80px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 20;      // 0s - 20s
  
      el.style.setProperty('--size', `${size}px`);
      el.style.left = `${left}%`;
      el.style.top = `${top}%`;
      el.style.setProperty('--delay', `${delay}s`);
    });
  })();
  