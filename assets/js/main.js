(function(){
'use strict';
/* SECURITY: stop this site being embedded inside another (malicious) page */
if(window.top!==window.self){try{window.top.location=window.self.location.href}catch(e){document.documentElement.innerHTML=''}}
const S=window.SITE;
Object.freeze(S);
/* SECURITY: escape anything inserted as HTML; allow only safe URLs */
const esc=v=>String(v==null?'':v).replace(/[&<>"'`]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));
const digits=v=>String(v).replace(/\D/g,'');
const safeImg=u=>/^assets\/images\/[\w\-\/]+\.(jpe?g|png|webp)$/i.test(String(u))?u:'';
const CAT=['open','closed','special'];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fmt=p=>{p=digits(p);return `+91 ${p.slice(0,5)} ${p.slice(5)}`};
/* contact bindings */
$$('[data-call]').forEach(a=>{const c=S.contacts[+a.dataset.call];if(!c)return;a.href='tel:+91'+digits(c.phone);if(!a.textContent.trim()||a.classList.contains('btn')&&a.textContent==='Call Now'){}
  if(!a.textContent.trim())a.textContent=`${c.name}: ${fmt(c.phone)}`;});
const waLink=t=>`https://wa.me/${digits(S.whatsapp)}${t?'?text='+encodeURIComponent(t):''}`;
$$('[data-wa]').forEach(a=>{a.href=waLink('Hello Shourya Engineering Autobody, I need information about a vehicle body.');a.target='_blank';a.rel='noopener noreferrer'});
$('#people').innerHTML=S.contacts.map(c=>`<div class="person"><div><small>${esc(c.name.toUpperCase())}</small><b>${esc(fmt(c.phone))}</b></div><div class="acts"><a href="tel:+91${digits(c.phone)}" aria-label="Call ${esc(c.name)}">📞</a><a href="https://wa.me/91${digits(c.phone)}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ${esc(c.name)}">💬</a></div></div>`).join('');
$('#mail').textContent=S.email;$('#mail').href='mailto:'+encodeURIComponent(S.email).replace(/%40/g,'@');$('#addr').textContent=S.address;
$('#map').src='https://www.google.com/maps?q='+encodeURIComponent(S.mapQuery)+'&output=embed';
$('#dir').href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(S.mapQuery);
$('#yr').textContent=new Date().getFullYear();
/* SEO structured data */
const ld=document.createElement('script');ld.type='application/ld+json';
ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"AutoBodyShop",name:S.name,email:S.email,telephone:'+91'+S.contacts[0].phone,address:{"@type":"PostalAddress",streetAddress:S.address,addressLocality:"Moshi, Pune",addressRegion:"Maharashtra",addressCountry:"IN"}});
document.head.appendChild(ld);
/* gallery */
const VEH=S.vehicles.filter(v=>safeImg(v.img)&&CAT.includes(v.category));
const labels={open:'Open Body',closed:'Closed Body',special:'Special Purpose'};
const g=$('#gallery');
g.innerHTML=VEH.map((v,i)=>`<article class="item" data-c="${esc(v.category)}" data-i="${i}"><div class="ph"><img src="${esc(safeImg(v.img))}" alt="${esc(v.title)}" loading="lazy" decoding="async"></div><div class="tx"><small>${esc(labels[v.category])}</small><h3>${esc(v.title)}</h3><p>${esc(v.desc)}</p></div></article>`).join('');
$$('#filters button').forEach(b=>b.onclick=()=>{$$('#filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  $$('.item',g).forEach(it=>{const show=b.dataset.f==='all'||it.dataset.c===b.dataset.f;it.hidden=!show;it.style.display=show?'':'none'})});
/* lightbox */
const lb=$('#lb'),lbi=$('img',lb),cap=$('figcaption',lb);let cur=0;
const vis=()=>$$('.item',g).filter(i=>i.style.display!=='none').map(i=>+i.dataset.i);
const show=i=>{cur=i;const v=VEH[i];if(!v)return;lbi.src=safeImg(v.img);lbi.alt=v.title;cap.textContent=v.title+' — '+v.desc;lb.hidden=false;document.body.style.overflow='hidden'};
const step=d=>{const l=vis(),p=l.indexOf(cur);show(l[(p+d+l.length)%l.length])};
const close=()=>{lb.hidden=true;document.body.style.overflow=''};
g.onclick=e=>{const it=e.target.closest('.item');if(it)show(+it.dataset.i)};
$('.x',lb).onclick=close;$('.pv',lb).onclick=()=>step(-1);$('.nx',lb).onclick=()=>step(1);
lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)step(d>0?-1:1)});
/* nav */
const hdr=$('#hdr'),burger=$('.burger'),links=$('#links'),top=$('#top');
burger.onclick=()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
$$('#links a').forEach(a=>a.onclick=()=>{links.classList.remove('open');burger.setAttribute('aria-expanded',false)});
top.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const secs=$$('main section[id]');
addEventListener('scroll',()=>{hdr.classList.toggle('scrolled',scrollY>20);top.classList.toggle('show',scrollY>600);
  let id='home';secs.forEach(s=>{if(scrollY+140>=s.offsetTop)id=s.id});
  $$('#links a:not(.btn)').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+id))},{passive:true});
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
/* quote form */
const f=$('#qform'),err=$('#err');
f.addEventListener('submit',e=>e.preventDefault());
/* SECURITY: strip control chars / tags, trim and cap length of everything the visitor types */
const clean=(v,max)=>String(v||'').replace(/[\u0000-\u001F\u007F<>]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);
const TYPES=['Open Body','Closed Container Body','Special Purpose Body','Repair / Modification','Not sure yet'];
function build(){const raw=Object.fromEntries(new FormData(f));const d={name:clean(raw.name,60),phone:String(raw.phone||'').replace(/\D/g,'').slice(0,10),vehicle:clean(raw.vehicle,60),type:TYPES.includes(raw.type)?raw.type:'Not sure yet',msg:clean(raw.msg,500)};err.textContent='';$$('input',f).forEach(i=>i.classList.remove('bad'));
  if(!d.name){f.name.classList.add('bad');err.textContent='Please enter your name.';return null}
  if(!/^[6-9]\d{9}$/.test(d.phone)){f.phone.classList.add('bad');err.textContent='Please enter a valid 10-digit mobile number.';return null}
  return `Hello ${S.name},\nName: ${d.name}\nMobile: ${d.phone}\nVehicle: ${d.vehicle||'-'}\nBody type: ${d.type}\nRequirement: ${d.msg||'-'}`}
$('#sendWa').onclick=()=>{const m=build();if(m)window.open(waLink(m),'_blank','noopener,noreferrer')};
$('#sendMail').onclick=()=>{const m=build();if(m)location.href=`mailto:${S.email}?subject=${encodeURIComponent('Quote enquiry - '+clean(f.name.value,60))}&body=${encodeURIComponent(m)}`};
})();
