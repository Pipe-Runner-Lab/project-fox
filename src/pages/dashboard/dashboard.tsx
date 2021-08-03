import React from 'react';
import { ReactComponent as EmptyDashboardLogo } from 'assets/images/empty_dashboard.svg';
import { Container, LogoWrapper } from './dashboard.styles';

function Dashboard(): JSX.Element {
  return (
    <Container>
      <LogoWrapper>
        <EmptyDashboardLogo />
      </LogoWrapper>
    </Container>
  );
}

export default Dashboard;
