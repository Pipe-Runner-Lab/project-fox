import React from 'react';
import { RiDashboardFill as DashboardIcon } from 'react-icons/ri';
import { GiPencilBrush as BrushIcon } from 'react-icons/gi';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { FaUser as UserIcons } from 'react-icons/fa';
import clx from 'classnames';
import { NavbarContainer, PrimaryIconContainer, IconWrapper, AvatarWrapper } from './navbar.styles';

function Navbar(): JSX.Element {
  return (
    <NavbarContainer>
      <PrimaryIconContainer>
        <IconWrapper
          className={clx({
            active: true
          })}>
          <DashboardIcon />
        </IconWrapper>
        <IconWrapper>
          <BrushIcon />
        </IconWrapper>
        <IconWrapper>
          <SettingsIcon />
        </IconWrapper>
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
