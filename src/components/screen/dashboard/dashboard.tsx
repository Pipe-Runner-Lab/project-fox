import React from "react";
import { DashboardContainer,
        Heading,
        Header

} from "./dashboard.styles";
import Card from "../../app-shell/components/card";

function Dashboard(): JSX.Element {
  return (
    <DashboardContainer>
      <Heading>
        <h1>Dashboard</h1>
      </Heading>
      <Header>
        <h2>Previous Work</h2>
      </Header>

      <Card/>
    </DashboardContainer>
  );
}

export default Dashboard;
