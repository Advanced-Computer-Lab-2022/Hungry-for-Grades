export function setTheme(mode: 'light' | 'dark') {
  if (mode === 'light') {
    window.document.body.classList.add('light');
    window.document.body.classList.remove('dark');
  } else if (mode === 'dark') {
    window.document.body.classList.add('dark');
    window.document.body.classList.remove('light');
  }
}
