import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { GiPencilBrush } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import {
  NavbarContainer,
  PrimaryIconContainer,
  SecondaryIconsContainer,
  IconWrapper,
} from "./navbar.styles";

function Navbar(): JSX.Element {
  return (
    <NavbarContainer>
      <PrimaryIconContainer>
        <IconWrapper active={true}>
          <RiDashboardFill />
        </IconWrapper>
        <IconWrapper>
          <GiPencilBrush />
        </IconWrapper>
        <IconWrapper>
          <FiSettings />
        </IconWrapper>
      </PrimaryIconContainer>
      <SecondaryIconsContainer>
        <IconWrapper
          style={{
            borderRadius: "50%",
            color: "#7C3AED",
            backgroundColor: "#ffffff",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <BiUser />
        </IconWrapper>
      </SecondaryIconsContainer>
    </NavbarContainer>
  );
}

export default Navbar;
