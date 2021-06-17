import React  from "react";
import styled from "styled-components";

import { RiHome2Fill} from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { GiFiles,GiFoxHead } from "react-icons/gi";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { MdShare } from "react-icons/md";

const Navbar = () =>(
    <div>
        <Fox/>
        <a href="/"><Home/></a>
        <a href="/"><Files/></a>
        <a href="/"><Draw/></a>
        <a href="/"><Share/></a>
        <a href="/"><Setting/></a>
        <a href="/"><Contact/></a>   
    </div>
)
const Fox=styled(GiFoxHead)`
  color:orange;
  border-radius:40px;
  border: 3px solid orange;
  background:black;
  flex: none;
  margin-left:7px;
  width: 50px;
  height: 50px;
`;

const Home  = styled(RiHome2Fill)`
  color:orange;
  border-radius:16px;
  border: 0.5px ;
  background:#FFEDA3;
  flex: none;
  margin-left:7px;
  margin-top: 55px;
  width: 50px;
  height: 50px;
`;

const Files=styled(GiFiles)`
  color:orange;;
  border-radius:16px;
  border: 0.5px;
  background:#FFEDA3;
  flex: none;
  margin-left:7px;
  margin-top: 40px;
  width: 50px;
  height: 50px;
`;

const Draw  = styled(FaPencilAlt)`
  color:orange;;
  border-radius:16px;
  border: 0.5px ;
  background:#FFEDA3;
  flex: none;
  padding: 0.68em 0.68em;
  margin-left:7px;
  margin-top: 40px;
  width: 50px;
  height: 50px;
`;

const Share=styled(MdShare)`
  color:orange;;
  border-radius:16px;
  border: 0.5px ;
  background:#FFEDA3;
  flex: none;
  position:relative;
  margin-left:15px;
  margin-top:265px;
  width: 30px;
  height: 30px;
`;

const Setting =styled(IoSettings)`
  color:orange;;
  border-radius:16px;
  border: 0.5px ;
  background:#FFEDA3;
  flex: none;
  margin-left:15px;
  
  width: 30px;
  height: 30px;
`;
const Contact =styled(IoIosContact)`
  color:orange;;
  border-radius:16px;
  border: 0.5px ;
  background:#FFEDA3;
  flex: none;
  position:relative;
  margin-left:15px;
  width: 30px;
  height: 30px;
`;

export default Navbar;