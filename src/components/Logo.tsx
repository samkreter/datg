import React, { useContext } from 'react';
import type { FC } from 'react';

import SettingsContext from 'src/contexts/SettingsContext';
import { THEMES } from 'src/constants';

interface LogoProps {
  [key: string]: any;
}

const Logo: FC<LogoProps> = (props) => {
  const { settings } = useContext(SettingsContext);

  const getLogoSrc = () => {
    switch(settings.theme){
      case THEMES.DATG:
        return "/static/datg-black-logo.svg"
      case THEMES.DATG_LIGHT:
        return "/static/datg-white-logo.png"
      default:
        return "/static/logo.svg"
    }
  }

  return (
    <img
      style={{height: '60px'}}
      alt="Logo"
      src={getLogoSrc()}
      {...props}
    />
  );
}

export default Logo;
