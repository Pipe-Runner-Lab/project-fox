import React from "react";
import { FiLogOut } from "react-icons/fi";

export default function SignOut({handlesignout}:any):JSX.Element{
    return(
        <div>
            <button onClick={handlesignout}>
                <FiLogOut/>
            </button>
        </div>
    );
}