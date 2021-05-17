//import React, { Component } from "react";

const NavBar = ({totalCounter}) => {
    return (
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Number: <span className="badge bg-pill bg-secondary">{totalCounter}</span>
            </a>
          </div>
        </nav>
      );
};

export default NavBar;
