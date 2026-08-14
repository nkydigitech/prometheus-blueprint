
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let currentId = null;

function getProgress(){
  try { return JSON.parse(localStorage.getItem('prom_blueprint_progress')||'{}'); } catch { return {}; }
}
function setProgress(id){ const p=getProgress(); p[id]=true; localStorage.setItem('prom_blueprint_progress', JSON.stringify(p)); updateProgressUI(); }
function updateProgressUI(){
  const p=getProgress(); const total=window.CHAPTERS.length; const done=Object.keys(p).length;
  const pct = total? Math.round((done/total)*100):0;
  $('#progressFill').style.width=pct+'%';
  $('#progressText').textContent = `${done}/${total} completed`;
  $('#progressPct').textContent = pct+'%';
  $$('.chapter-item').forEach(el=>{
    const id=el.dataset.id;
    const dot=el.querySelector('.completed-indicator');
    if(p[id]) dot.innerHTML='<span class="completed-dot"></span>';
    else dot.innerHTML='';
  });
}

function renderChapter(id){
  const ch = window.CHAPTERS.find(c=>c.id===id);
  if(!ch) return;
  currentId=id;
  const progress=getProgress();
  // mark active
  $$('.chapter-item').forEach(el=>el.classList.toggle('active', el.dataset.id===id));
  // content
  const html = `
    <div class="badge"><span>${ch.emoji}</span> Chapter ${window.CHAPTERS.indexOf(ch)+1} / ${window.CHAPTERS.length}</div>
    <div class="badge accent" style="margin-left:8px;">${ch.analogy}</div>
    <h1 style="margin:16px 0 8px; font-size:28px; line-height:1.2;">${ch.title}</h1>
    <p style="color:var(--text-muted); font-size:14px; margin-top:0;">${ch.desc}</p>
    <div style="margin-top:24px;" class="chapter-body">
      ${ch.content}
    </div>
    <div class="next-prev">
      <button class="btn" id="prevBtn">← Previous</button>
      <div style="display:flex; gap:8px;">
        <button class="btn" id="markBtn">${progress[id]?'☑ Completed':'Mark complete ✓'}</button>
        <button class="btn accent" id="nextBtn">Next →</button>
      </div>
    </div>
    <div class="footer">
      <strong>Prometheus Blueprint</strong> • Power Meter + Security Guard theme • Theme color #E6522C • Built for nkydigitech/prometheus-blueprint<br>
      Tip: Use <span class=kbd>←</span> <span class=kbd>→</span> to navigate, <span class=kbd>C</span> to mark complete.
    </div>
  `;
  $('#content').innerHTML = html;
  $('#topTitle').innerHTML = `${ch.emoji} ${ch.title}`;
  $('#prevBtn').onclick = ()=> navigate(-1);
  $('#nextBtn').onclick = ()=> navigate(1);
  $('#markBtn').onclick = ()=> { setProgress(id); renderChapter(id); };
  // highlight scroll top
  window.scrollTo({top:0, behavior:'smooth'});
  localStorage.setItem('prom_last_chapter', id);
}

function navigate(dir){
  const idx = window.CHAPTERS.findIndex(c=>c.id===currentId);
  const next = window.CHAPTERS[idx+dir];
  if(next) renderChapter(next.id);
}

function renderSidebar(){
  const container=$('#chaptersList');
  container.innerHTML = window.CHAPTERS.map((ch,i)=>{
    return `<div class="chapter-item" data-id="${ch.id}">
      <div class="ch-emoji">${ch.emoji}</div>
      <div style="flex:1; min-width:0;">
        <div class="ch-title">${i+1}. ${ch.title} <span class="completed-indicator"></span></div>
        <div class="ch-desc">${ch.desc}</div>
        <div class="ch-meta">🔌 ${ch.analogy}</div>
      </div>
    </div>`;
  }).join('');
  $$('.chapter-item').forEach(el=>{
    el.addEventListener('click', ()=>{
      renderChapter(el.dataset.id);
      if(window.innerWidth<=900) $('.sidebar').classList.remove('open');
    });
  });
}

function initTheme(){
  const saved = localStorage.getItem('prom_theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.setAttribute('data-theme','dark');
  $('#themeToggle').onclick = ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('prom_theme', next);
  };
}

function initKeys(){
  document.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') navigate(1);
    if(e.key==='ArrowLeft') navigate(-1);
    if(e.key.toLowerCase()==='c' && currentId){ setProgress(currentId); renderChapter(currentId); }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderSidebar();
  initTheme();
  initKeys();
  updateProgressUI();
  const last = localStorage.getItem('prom_last_chapter') || window.CHAPTERS[0].id;
  renderChapter(last);
  $('#mobileToggle').onclick = ()=> $('.sidebar').classList.toggle('open');
  $('#collapseBtn').onclick = ()=> $('.sidebar').classList.remove('open');
});
