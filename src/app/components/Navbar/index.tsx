import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./style.scss";

const NavbarComponent: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleNavSelect = (key: string): void => {
    if (pathname !== key) {
      history.push(key);
    }
  };

  return (
    <Navbar>
      <div className="nav-container">
        <Navbar.Brand>
          ReCAT App
        </Navbar.Brand>
        <Nav
          activeKey={pathname}
          onSelect={handleNavSelect}
        >
          <Nav.Link eventKey="/">Gallery</Nav.Link>
          <Nav.Link eventKey="/upload">Upload</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
