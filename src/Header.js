import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

function Header({ themeHandler }) {
  const setTheme = themeHandler;

  function handleThemeChange(e) {
    if (e.target.className === 'themeLight') {
      setTheme('light');
    } else setTheme('dark');
  }

  return (
    <header>
      <button className="themeDark" type="button" onClick={handleThemeChange}>
        Dark
      </button>
      <button className="themeLight" type="button" onClick={handleThemeChange}>
        Light
      </button>
      <Link to="/">
        <h1 className="mainHeading">Keep featherin' it, brother</h1>
      </Link>
    </header>
  );
}

Header.propTypes = {
  themeHandler: PropTypes.func
};

export default Header;
