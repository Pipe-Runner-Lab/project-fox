import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardFill as DashboardIcon } from 'react-icons/ri';
import { GiPencilBrush as BrushIcon } from 'react-icons/gi';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { FaUser as UserIcons } from 'react-icons/fa';
import { NavbarContainer, PrimaryIconContainer, IconWrapper, AvatarWrapper } from './navbar.styles';

function Navbar(): JSX.Element {
  return (
    <NavbarContainer>
      <PrimaryIconContainer>
        <NavLink to="/dashboard" activeClassName="active">
          <IconWrapper>
            <DashboardIcon />
          </IconWrapper>
        </NavLink>
        <NavLink to="/canvas" activeClassName="active">
          <IconWrapper>
            <BrushIcon />
          </IconWrapper>
        </NavLink>
        <NavLink to="/settings" activeClassName="active">
          <IconWrapper>
            <SettingsIcon />
          </IconWrapper>
        </NavLink>
      </PrimaryIconContainer>
      <div>
        <AvatarWrapper>
          <UserIcons />
        </AvatarWrapper>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
