import React from 'react';
import { Link } from '@reach/router';

function Header() {
  return (
    <header>
      <Link to="/">
        <h1 className="mainHeading">Keep featherin' it, brother</h1>
      </Link>
    </header>
  );
}

export default Header;
