import React from 'react';
import Backdrop from './components/backdrop';
import { AppShellContainer, AppShellWrapper, NavStage, ContentStage } from './app-shell.styles';
import Navbar from '../navbar';

type AppShellProps = {
  children: React.ReactNode;
};

function AppShell({ children }: AppShellProps): JSX.Element {
  return (
    <AppShellContainer>
      <Backdrop />
      <AppShellWrapper>
        <NavStage>
          <Navbar />
        </NavStage>
        <ContentStage>{children}</ContentStage>
      </AppShellWrapper>
    </AppShellContainer>
  );
}

export default AppShell;
