import React from "react";
import { FiLogIn } from "react-icons/fi";

export default function SignIn({handlesignin}:any):JSX.Element{
    return(
        <div>
            <button onClick={handlesignin}>
                <FiLogIn/>
            </button>
        </div>
    );
}