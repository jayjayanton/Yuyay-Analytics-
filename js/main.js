/* Shared navigation and full-site language switch. No third-party dependencies. */
(()=>{"use strict";
const KEY="yuyay-preferred-language";
function readPreference(){const specified=new URLSearchParams(location.search).get("lang");if(specified==="es"||specified==="en")return specified;try{const saved=localStorage.getItem(KEY);if(saved==="es"||saved==="en")return saved}catch(e){}return "en"}
function translate(lang){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-en][data-es]").forEach(el=>{el.textContent=el.dataset[lang]});
 document.querySelectorAll("[data-en-placeholder][data-es-placeholder]").forEach(el=>{el.setAttribute("placeholder",el.dataset[lang+"Placeholder"])});
 document.querySelectorAll("[data-en-aria][data-es-aria]").forEach(el=>{el.setAttribute("aria-label",el.dataset[lang+"Aria"])});
 document.querySelectorAll("[data-en-content][data-es-content]").forEach(el=>{el.setAttribute("content",el.dataset[lang+"Content"])});
 const toggle=document.querySelector("#language-toggle");if(toggle){toggle.textContent=lang==="en"?"ES":"EN";toggle.setAttribute("aria-label",lang==="en"?"Cambiar a español":"Switch to English");toggle.setAttribute("title",lang==="en"?"Cambiar a español":"Switch to English")}
 document.querySelectorAll("a[href]").forEach(a=>{const h=a.getAttribute("href");if(!h||/^(mailto:|tel:|javascript:|#)/i.test(h))return;try{const url=new URL(h,location.href);if(url.origin!==location.origin||!url.pathname.includes("/Yuyay-Analytics-/")||!url.pathname.endsWith(".html"))return;url.searchParams.set("lang",lang);a.setAttribute("href",url.pathname+url.search+url.hash)}catch(e){}});
 try{localStorage.setItem(KEY,lang)}catch(e){}
 document.dispatchEvent(new CustomEvent("yuyay:lang",{detail:{lang}}));
}
document.addEventListener("DOMContentLoaded",()=>{
 let lang=readPreference();
 const current=(location.pathname.split("/").pop()||"index.html");
 document.querySelectorAll(".site-nav a").forEach(a=>{const target=(a.pathname||"").split("/").pop();if(target===current)a.setAttribute("aria-current","page")});
 const menu=document.querySelector("#menu-toggle");const nav=document.querySelector("#site-nav");
 if(menu&&nav){menu.addEventListener("click",()=>{const expanded=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!expanded));nav.classList.toggle("open",!expanded)});nav.addEventListener("click",e=>{if(e.target.closest("a")){menu.setAttribute("aria-expanded","false");nav.classList.remove("open")}})}
 document.querySelector("#language-toggle")?.addEventListener("click",()=>{lang=lang==="en"?"es":"en";const url=new URL(location.href);url.searchParams.set("lang",lang);history.replaceState(null,"",url.pathname+url.search+url.hash);translate(lang)});
 translate(lang);
});
})();