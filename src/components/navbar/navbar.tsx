import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardFill as DashboardIcon } from 'react-icons/ri';
import { CgPen as BrushIcon } from 'react-icons/cg';
import { MdSettings as SettingsIcon } from 'react-icons/md';
import { FaUser as UserIcons } from 'react-icons/fa';
import { AuthContext } from 'provider/auth';
import { NavbarContainer, PrimaryIconContainer, IconWrapper, AvatarWrapper } from './navbar.styles';

function Navbar(): JSX.Element {
  const { user, signOut } = useContext(AuthContext);

  console.log(user?.photoURL);

  return (
    <NavbarContainer>
      <PrimaryIconContainer>
        <NavLink to="/dashboard" activeClassName="active">
          <IconWrapper>
            <DashboardIcon />
          </IconWrapper>
        </NavLink>
        <NavLink to="/new" activeClassName="active">
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
        <AvatarWrapper photoUrl={user?.photoURL} onClick={signOut}>
          <UserIcons />
        </AvatarWrapper>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
