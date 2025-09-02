/* Progressive Enhancement & UX */
document.addEventListener('DOMContentLoaded', ()=>{


  // Año en footer
  const y = document.getElementById('year'); 
  if(y) y.textContent = new Date().getFullYear();
  const y = document.getElementById('year'); 
  if(y) y.textContent = new Date().getFullYear();

  // Parallax simple
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const onScroll = () => {
    const sc = window.pageYOffset;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed || '0.3');
      el.style.backgroundPosition = `center calc(50% + ${sc * speed * -0.2}px)`;
    });
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // --- FORMULARIO OPCIONAL ---
  const form   = document.getElementById('contactForm');
  const btn    = document.getElementById('btnEnviar');
  const status = document.getElementById('form-status');

  if(form && btn && status){

  if(form && btn && status){

    const validateRequired = () => {
      const nombre = form.nombre?.value.trim() || "";
      const email  = form.email?.value.trim() || "";
      const tipo   = form.tipo?.value || "";
      const ok = nombre.length > 1 && /.+@.+\..+/.test(email) && !!tipo;
      btn.disabled = !ok;
    };

    // ✅ Ahora solo se agregan listeners si form existe
    ['input','change','keyup'].forEach(ev => {
      form.addEventListener(ev, validateRequired, {passive:true});
    });
    validateRequired();

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();

      if(!form.checkValidity()){ 
        form.classList.add('was-validated'); 
        return; 
      }

      btn.disabled = true;
      status.textContent = 'Enviando…';
      btn.disabled = true;
      status.textContent = 'Enviando…';

      try{
        const fd = new FormData(form);
        const resp = await fetch(form.action, { method:'POST', body: fd });
        const data = await resp.json();

        if(data && data.ok){
          status.textContent = '¡Gracias! Su mensaje ha sido enviado!';
          form.reset();
        }else{
          status.textContent = 'Hubo un error; intente otra vez.';
        }
      }catch(err){
        status.textContent = 'Hubo un error; intente otra vez.';
      }finally{
        validateRequired();
      }
    });
  }

  // Registrar Service Worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  }
});
