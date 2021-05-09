import React from 'react';

export const Layout: React.FC = p =>
  <>
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="px-2">
          <div className="navbar-brand">React App</div>
        </div>
      </nav>
    </header>

    <main role="main" className="container">{p.children}</main>
  </>;

