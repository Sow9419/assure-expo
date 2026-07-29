// nav bg on scroll
const navbg=document.getElementById('navbg');
window.addEventListener('scroll',()=>{
  navbg.style.opacity=window.scrollY>40?1:0;
  const p=window.scrollY/(document.body.scrollHeight-window.innerHeight);
  document.getElementById('progress').style.transform='scaleX('+Math.min(p,1)+')';
  document.getElementById('stickyCta').classList.toggle('show',window.scrollY>700);
});

// burger
const burger=document.getElementById('burger'), mm=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>mm.classList.toggle('open'));
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));

// reveal on scroll
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

// counters
const counted=new Set();
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !counted.has(e.target)){
      counted.add(e.target);
      const el=e.target, target=+el.dataset.count, suffix=el.dataset.suffix||'';
      let start=0; const dur=1400, t0=performance.now();
      function step(t){
        const p=Math.min((t-t0)/dur,1);
        const eased=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*eased).toLocaleString('fr-FR')+suffix;
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  });
},{threshold:.4});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

// marquee content
const words=['Micro-assurance','Assurance agricole','Prévoyance retraite','Assurance maladie','Caravane Sécurité pour Tous','Inclusion financière','Assurance vie','Assurance automobile'];
const track=document.getElementById('marqueeTrack');
function buildMarquee(){
  let html='';
  for(let r=0;r<2;r++){ words.forEach(w=>{ html+='<span class="word">'+w+'</span><span class="sep">✦</span>'; }); }
  track.innerHTML=html;
}
buildMarquee();

// gallery
const imgs=['photo-hero.jpg','family-hands-roof.jpg','photo-sante.jpg','close-up-man-holding-kid-shoulders.jpg','photo-pro.jpg','parents-spending-time-with-their-little-daughter-home.jpg','medium-shot-happy-man-carrying-kid.jpg','medium-shot-smiley-kid-man.jpg','grandparent-s-day-celebration-scene-with-grandparents-grandchildren-showcasing-happy-family.jpg','cicb.jpg'];
const gtrack=document.getElementById('galleryTrack');
let ghtml='';
for(let r=0;r<2;r++){ imgs.forEach(f=>{ ghtml+='<div class="gallery-item"><img src="assets/img/gallery/'+f+'" alt=""></div>'; }); }
gtrack.innerHTML=ghtml;

// faq accordion (accessible : aria-expanded géré, boutons natifs)
document.querySelectorAll('.acc-item').forEach(item=>{
  const q=item.querySelector('.acc-q'), a=item.querySelector('.acc-a');
  q.addEventListener('click',()=>{
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.acc-a').style.maxHeight=null;
      i.querySelector('.acc-q').setAttribute('aria-expanded','false');
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight=a.scrollHeight+'px';
      q.setAttribute('aria-expanded','true');
    }
  });
});

// contact form dynamic message
const profilSelect=document.getElementById('profilSelect'), msgLabel=document.getElementById('msgLabel');
const msgs={'Visiteur':'Parlons de votre visite...','Exposant':'Parlons de votre stand...','Partenaire / Sponsor':'Parlons de votre sponsoring...','Presse / Media':'Parlons de votre couverture média...','Autre':'Votre message...'};
if(profilSelect){ profilSelect.addEventListener('change',()=>{ document.querySelector('#contact textarea').placeholder=msgs[profilSelect.value]; }); }

// anti-spam timestamp
const axTs=document.getElementById('axTs');
if(axTs){ axTs.value=Math.floor(Date.now()/1000); }

// confirmation d'envoi (mail-handler.php redirige vers ?sent=1 ou ?sent=0)
(function(){
  const params=new URLSearchParams(window.location.search);
  const sent=params.get('sent');
  const notice=document.getElementById('formNotice');
  if(sent===null || !notice) return;
  notice.style.display='block';
  if(sent==='1'){
    notice.style.background='rgba(11,63,135,.08)'; notice.style.color='#0b3f87'; notice.style.border='1px solid rgba(11,63,135,.2)';
    notice.textContent='✓ Message envoyé — l\u2019équipe d\u2019organisation vous répond rapidement.';
  } else {
    notice.style.background='rgba(207,46,46,.08)'; notice.style.color='#a12a2a'; notice.style.border='1px solid rgba(207,46,46,.2)';
    notice.textContent='✕ Une erreur est survenue. Écrivez-nous directement à contact@assurexpo.com.';
  }
  const url=new URL(window.location.href); url.searchParams.delete('sent');
  window.history.replaceState({},'',url.toString());
})();

// brochure button — notification élégante (plus d'alert() natif du navigateur)
function showToast(msg){
  const t=document.getElementById('toast'), m=document.getElementById('toastMsg');
  m.textContent=msg;
  t.classList.add('show');
  clearTimeout(showToast._tm);
  showToast._tm=setTimeout(()=>t.classList.remove('show'),4200);
}
document.getElementById('brochureBtn').addEventListener('click',e=>{ e.preventDefault(); showToast('La brochure sponsoring sera disponible au téléchargement prochainement.'); });