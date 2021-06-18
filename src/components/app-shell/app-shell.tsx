import React from "react";
import Backdrop from "./components/backdrop";
import SignIn from "./firebase/signin";
import SignOut from "./firebase/signout";
import {handlesignin, handlesignout} from "./firebase/firebaseconfig";
import {
  AppShellContainer,
  AppShellWrapper,
  NavStage,
  ContentStage,
} from "./app-shell.styles";

type AppShellProps = {
  children: React.ReactNode;
};

function AppShell({ children }: AppShellProps): JSX.Element {
  return (
    <AppShellContainer>
      <Backdrop />
      <AppShellWrapper>
        <NavStage>
          <SignIn handlesignin={handlesignin}/>
          <SignOut handlesignout={handlesignout}/>
        </NavStage>
        <ContentStage>{children}</ContentStage>
      </AppShellWrapper>
    </AppShellContainer>
  );
}

export default AppShell;
