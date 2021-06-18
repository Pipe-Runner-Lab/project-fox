import React from 'react';
import { Outlet } from 'react-router-dom';
import Backdrop from './components/backdrop';
import { AppShellContainer, AppShellWrapper, NavStage, ContentStage } from './app-shell.styles';
import Navbar from '../navbar';

function AppShell(): JSX.Element {
  return (
    <AppShellContainer>
      <Backdrop />
      <AppShellWrapper>
        <NavStage>
          <Navbar />
        </NavStage>
        <ContentStage>
          <Outlet />
        </ContentStage>
      </AppShellWrapper>
    </AppShellContainer>
  );
}

export default AppShell;
