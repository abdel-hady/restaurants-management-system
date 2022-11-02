import React from "react";
import "./style.css";
import { AiFillSetting } from 'react-icons/ai';
import { Link } from "react-router-dom";
function Index() {
  const hundleClick = () => {
    const side = document.getElementById("sidebar");
    side.classList.toggle("close");
  };
  return (
    <div id="sidebar">
      <div className="logo">
        <img className="chef" src="icons/chef.png" alt="chef" />
        <div>pizza</div>
      </div>
      <span className="toggle-side" onClick={hundleClick}>
        <div className="line-toggle one"></div>
        <div className="line-toggle two"></div>
        <div className="line-toggle three "></div>
      </span>
      <ul>
        <li>
          <Link to="">
            <img className="icon" src="icons/chef.png" />
            
            <div>Dashboard</div>
          </Link>
        </li>
        <li>
          <Link to="">
            {/* <img className="icon" src="icons/chef.png" /> */}
            <AiFillSetting  size="40px" className="img"/>
            <div>Menu</div>
          </Link>
        </li>
        <li>
          <img className="icon" src="icons/chef.png" />
          <div>
            <div>settings</div>
            <div>
              <Link to=""></Link>
              <Link to=""></Link>
            </div>
          </div>
        </li>
        <li></li>
      </ul>
    </div>
  );
}

export default Index;
