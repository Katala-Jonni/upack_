import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useSettings } from '../../hooks/use-settings';


export const ThemeComponent = () => {
  const lightTheme = 'light';
  const darkTheme = 'dark';
  const { settings, saveSettings } = useSettings();
  const [theme, setTheme] = useState(settings.theme);

  const handleClickTheme = () => {
    const themeView = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(themeView);
    saveSettings({
      ...settings,
      theme: themeView
    });
  };

  return (
    <IconButton
      onClick={handleClickTheme}
    >
      {theme === lightTheme
        ? <Brightness2Icon fontSize='medium' style={{ color: 'black' }}/>
        : <WbSunnyIcon fontSize='medium' style={{ color: 'rgb(255 179 0)' }}/>
      }
    </IconButton>
  );
};
