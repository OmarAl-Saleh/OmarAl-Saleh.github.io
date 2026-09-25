const themeToggle = document.querySelector('#theme-toggle');
const themeOptions = ['system', 'light', 'dark'];
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let themePreference = 'dark';
try { themePreference = localStorage.getItem('portfolio-theme') || 'dark'; } catch {}
if (!['light', 'dark', 'system'].includes(themePreference)) themePreference = 'dark';
function applyTheme() {
  const theme = themePreference === 'system' ? (systemTheme.matches ? 'dark' : 'light') : themePreference;
  document.documentElement.dataset.theme = theme;
  themeToggle.dataset.preference = themePreference;
  const next = themeOptions[(themeOptions.indexOf(themePreference) + 1) % themeOptions.length];
  const label = 'Color theme: ' + themePreference + '. Switch to ' + next + '.';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101923' : '#ffffff';
}
themeToggle.addEventListener('click', () => {
  themePreference = themeOptions[(themeOptions.indexOf(themePreference) + 1) % themeOptions.length];
  try { localStorage.setItem('portfolio-theme', themePreference); } catch {}
  applyTheme();
});
systemTheme.addEventListener('change', applyTheme);
window.addEventListener('storage', event => {
  if (event.key === 'portfolio-theme' || event.key === null) {
    themePreference = ['light', 'dark', 'system'].includes(event.newValue) ? event.newValue : 'dark';
    applyTheme();
  }
});
applyTheme();

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();

const links = [...navigation.querySelectorAll('a')];
const sections = links.map(link => document.querySelector(link.hash));
function updateActiveSection() {
  let active = sections[0];
  for (const section of sections) { if (section.getBoundingClientRect().top <= 160) active = section; }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) active = sections.at(-1);
  for (const link of links) { if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }
}
let scheduled = false;
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(() => { updateActiveSection(); scheduled = false; }); } }, { passive: true });
updateActiveSection();

// Load the portrait when supplied; retain its placeholder otherwise.
const portrait = document.querySelector('[data-image="portrait.jpeg"]');
const image = new Image();
image.alt = portrait.dataset.alt;
image.decoding = 'async';
image.addEventListener('load', () => {
  portrait.querySelector('.portrait-placeholder')?.remove();
  portrait.classList.add('loaded');
  portrait.prepend(image);
});
image.src = `${import.meta.env.BASE_URL}images/portrait.jpeg`;

const copyEmailButton = document.querySelector('#copy-email');
const copyEmailStatus = document.querySelector('#copy-email-status');
let copyEmailTimer;
copyEmailButton.addEventListener('click', async () => {
  clearTimeout(copyEmailTimer);
  copyEmailStatus.textContent = '';
  try {
    await navigator.clipboard.writeText('oalsaleh@uwaterloo.ca');
    copyEmailStatus.textContent = 'Email copied.';
    copyEmailButton.textContent = 'Copied';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.contact-email'));
    selection.removeAllRanges();
    selection.addRange(range);
    copyEmailStatus.textContent = 'Please copy the address manually: oalsaleh@uwaterloo.ca';
  }
  copyEmailTimer = setTimeout(() => {
    copyEmailButton.textContent = 'Copy email';
    copyEmailStatus.textContent = '';
  }, 6000);
});
