(function(){
  const nameEl = document.getElementById('tami-name');
  const ghostT = document.getElementById('ghost-template');
  const batT = document.getElementById('bat-template');

  function spawn(template, x, y){
    const node = template.content.firstElementChild.cloneNode(true);
    node.style.left = (x - 40) + 'px';
    node.style.top = (y - 40) + 'px';
    node.classList.add('animated');
    document.body.appendChild(node);
    setTimeout(()=>node.remove(), 3200);
  }

  function spawnBurst(e){
    const rect = nameEl.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    for(let i=0;i<6;i++){
      const useBat = Math.random() > 0.5;
      const tx = cx + (Math.random()-0.5)*rect.width*1.4;
      const ty = cy + (Math.random()-0.5)*rect.height*0.6;
      spawn(useBat ? batT : ghostT, tx, ty);
    }
  }

  if(nameEl){
    nameEl.addEventListener('mouseenter', spawnBurst);
    nameEl.addEventListener('touchstart', function(e){e.preventDefault(); spawnBurst(e);}, {passive:false});
  }

  // bedroom doll interactions
  document.querySelectorAll('.doll').forEach(d => {
    d.addEventListener('click', ()=>{ d.classList.add('scared'); setTimeout(()=>d.classList.remove('scared'),700); });
    d.addEventListener('touchstart', ()=>{ d.classList.add('scared'); setTimeout(()=>d.classList.remove('scared'),700); });
  });

  // kitchen food interactions
  document.querySelectorAll('.food').forEach(f => {
    f.addEventListener('click', ()=>{ f.classList.toggle('spooky'); });
    f.addEventListener('touchstart', ()=>{ f.classList.toggle('spooky'); });
  });
})();
