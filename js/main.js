document.addEventListener('DOMContentLoaded',()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.querySelectorAll('[data-meter]').forEach(el=>{const value=Math.max(0,Math.min(100,Number(el.dataset.meter)||0));el.style.setProperty('--meter',value+'%');el.setAttribute('aria-label',el.dataset.label||'Illustrative visualization');});});
// Shared interior navigation and scenic-asset fallback.
document.addEventListener('DOMContentLoaded',()=>{
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.site-nav a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 const shell=document.querySelector('.interior-shell');
 if(shell){const value=shell.style.getPropertyValue('--scene');const match=value.match(/url\(['"]?([^'")]+)['"]?\)/);if(match){const test=new Image();test.onerror=()=>{shell.style.setProperty('--scene',"url('images/andes_homepage_hero.jpg')")};test.src=match[1]}}
});
