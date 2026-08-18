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

// contact form (static demo, index.html only)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('form-success').classList.add('show');
    this.reset();
  });
}
