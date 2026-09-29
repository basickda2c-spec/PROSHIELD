// mobile nav toggle (full-screen overlay, see styles.css @media max-width:980px)
const hamburger = document.getElementById('hamburger');
const mainnav = document.getElementById('mainnav');

function closeNav() {
  mainnav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-locked');
}

if (hamburger && mainnav) {
  hamburger.addEventListener('click', () => {
    const open = mainnav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-locked', open);
  });

  // close the overlay after tapping a real link (not the Services toggle itself)
  mainnav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });
}

// Services accordion row on mobile
const servicesToggle = document.getElementById('servicesToggle');
if (servicesToggle) {
  servicesToggle.addEventListener('click', () => {
    const li = servicesToggle.closest('li');
    const isOpen = li.classList.toggle('subopen');
    servicesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// contact form (index.html only) - sends via Web3Forms (access key is in index.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
  const successBox = document.getElementById('form-success');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnLabel = submitBtn ? submitBtn.textContent : '';

  // error box (created once, reuses the page's own styles where possible)
  let errorBox = document.getElementById('form-error');
  if (!errorBox) {
    errorBox = document.createElement('div');
    errorBox.id = 'form-error';
    errorBox.setAttribute('role', 'alert');
    errorBox.style.cssText =
      'display:none;margin-bottom:16px;padding:12px 14px;border-radius:6px;' +
      'background:#fdecea;color:#8a1f17;font-size:14px;line-height:1.5;';
    errorBox.innerHTML =
      'Sorry, we could not send your enquiry. Please call ' +
      '<a href="tel:07355148892">07355 148892</a> or email ' +
      '<a href="mailto:25proshield@gmail.com">25proshield@gmail.com</a>.';
    contactForm.insertBefore(errorBox, contactForm.firstChild);
  }

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // honeypot: bots fill it, humans never see it
    const honey = contactForm.querySelector('input[name="botcheck"]');
    if (honey && honey.checked) return;

    errorBox.style.display = 'none';
    successBox.classList.remove('show');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        throw new Error('Send failed');
      }
      successBox.classList.add('show');
      contactForm.reset();
    } catch (err) {
      errorBox.style.display = 'block';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = btnLabel;
      }
    }
  });
}
