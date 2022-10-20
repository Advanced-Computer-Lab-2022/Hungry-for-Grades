import useLocalStorage from '../../../hooks/useLocalStorage';

import styles from './screenMode.module.css';
function ScreenMode() {
  const lightTheme = 'light';
  const darkTheme = 'dark';
  // Check for dark mode preference at the OS level
  const prefersDarkScheme =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? darkTheme
        : lightTheme
      : lightTheme;

  const [theme, setTheme] = useLocalStorage('theme', prefersDarkScheme);
  const clickedClass = 'clicked';
  const body = document.body;

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      (e.target as HTMLInputElement).classList.remove(clickedClass);

      setTheme(lightTheme);
    } else {
      body.classList.replace(lightTheme, darkTheme);
      (e.target as HTMLInputElement).classList.add(clickedClass);

      setTheme(darkTheme);
    }
  };

  return (
    <button
      className={`${theme === 'dark' ? styles.clicked || '' : ''} ${
        styles.darkMode || ''
      } `}
      type='button'
      onClick={e => switchTheme(e)}
    />
  );
}

export default ScreenMode;
