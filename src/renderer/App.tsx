import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { useAppConfig, Theme } from './store';
import { useMobileScreen, getCSSVar } from './utils';
import { Path } from './constant';

import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Home from './views/PC/Home';
import Settings from './views/PC/Settings';

export function useSwitchTheme() {
  const config = useAppConfig();

  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.remove('dark');

    if (config.theme === 'dark') {
      document.body.classList.add('dark');
    } else if (config.theme === 'light') {
      document.body.classList.add('light');
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media]'
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"]:not([media])'
    );

    if (config.theme === 'auto') {
      metaDescriptionDark?.setAttribute('content', '#151515');
      metaDescriptionLight?.setAttribute('content', '#fafafa');
    } else {
      const themeColor = getCSSVar('--themeColor');
      metaDescriptionDark?.setAttribute('content', themeColor);
      metaDescriptionLight?.setAttribute('content', themeColor);
    }
  }, [config.theme]);
}


function WideScreen() {
  return (
    <Routes>

      <Route path={Path.Home+"/*"} element={<Home />} />
      <Route path="/" element={<Navigate to={Path.Home} replace />} />
    </Routes>
  );
}

function MobileScreen() {
  return (
    <Routes>
        <Route path={Path.Home+"/*"} element={<Home />} />
      <Route path="/" element={<Navigate to={Path.Home} replace />} />
    </Routes>
  );
}

// const useHasHydrated = () => {
//   const [hasHydrated, setHasHydrated] = useState<boolean>(false);

//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   return hasHydrated;
// };

export default function App() {
  const isMobileScreen = useMobileScreen();
  useSwitchTheme();
  const config = useAppConfig();
  const theme = config.theme;
  function nextTheme() {
    const themes = [Theme.Light, Theme.Dark];
    const themeIndex = themes.indexOf(theme);
    const nextIndex = (themeIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    config.update((config) => (config.theme = nextTheme));
  }
  return (
    <Router>
      <div className={styles.checkTheme} onClick={nextTheme}>
        {theme === Theme.Light ? (
          <Brightness2Icon />
        ) : theme === Theme.Dark ? (
          <Brightness7Icon />
        ) : null}
      </div>
      {isMobileScreen ? <MobileScreen /> : <WideScreen />}
    </Router>
  );
}
