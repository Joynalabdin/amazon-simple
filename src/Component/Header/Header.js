import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import "./Header.css";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContextgit)
    return (
        <div className="Header" >
            <img src={logo}  alt=""/>
            <nav>
                <Link to="/Shop">Shop</Link>
                <Link to="/Review">Order Review</Link>
                <Link to="/Inventory">Manage Inventory</Link>
                <button onClick={()=>setLoggedInUser({})} >Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;