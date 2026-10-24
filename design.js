// Interface enhancement only. The complete page content is in HTML.
document.documentElement.classList.add('js');
const menu = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const themeButton = document.querySelector('.theme-button');
function applyTheme(dark) {
  document.body.classList.toggle('theme-dark', dark);
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
}
try { applyTheme(localStorage.getItem('kvazi-theme') === 'dark'); } catch {}
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('theme-dark');
  applyTheme(dark);
  try { localStorage.setItem('kvazi-theme', dark ? 'dark' : 'light'); } catch {}
});
const topButton = document.querySelector('.back-top');
function updateTopButton() { topButton.hidden = window.scrollY < 500; }
window.addEventListener('scroll', updateTopButton, { passive: true });
updateTopButton();
topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));
