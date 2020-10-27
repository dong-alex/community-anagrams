import React, { FunctionComponent } from "react";
import { MDBNavbar, MDBNavbarNav, MDBNavItem } from "mdbreact";

const Header: FunctionComponent<{}> = () => {
  return (
    <MDBNavbar expand="md">
      <MDBNavbarNav>
        <MDBNavItem>
          <h2 style={{ userSelect: "none" }}>Community Anagrams</h2>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};

export default Header;
