import React, { useContext } from 'react';
import { AuthContext } from 'provider/auth';
// import auth from 'utils/firebase';

function Auth(): JSX.Element {
  const { googleSignIn } = useContext(AuthContext);
  return (
    <div>
      <button type="button" onClick={googleSignIn}>
        Google Sign In
      </button>
    </div>
  );
}

export default Auth;
