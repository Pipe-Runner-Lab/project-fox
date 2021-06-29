import React, { useContext } from 'react';
import { AuthContext } from 'provider/auth';
import { FaUser as UserIcons } from 'react-icons/fa';
import { SettingsContainer, Button, AvatarWrapper } from './settings.styles';

function Settings(): JSX.Element {
  const { user, signOut } = useContext(AuthContext);

  return (
    <SettingsContainer>
      <h1>Settings</h1>
      <h2>User Details</h2>
      <AvatarWrapper photoUrl={user?.photoURL}>
        <UserIcons />
      </AvatarWrapper>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
      <Button onClick={signOut}>Sign Out</Button>
    </SettingsContainer>
  );
}

export default Settings;
