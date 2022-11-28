import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../../context/userContext';

export default function Navbar() {
    const location = useLocation();
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            alert("Logout Successfully");
            navigate('/');
        }).catch((err) => {
            console.error(err);
            alert(err.message);
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
            <Link to='/' className='h2 text-light nav-link'>criclive</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ">

                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to='/'>Home</Link>
                    </li>

                    {!user.uid &&
                        < li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                        </li>}


                    {user.uid && <li className="nav-item" >
                        <Link className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`} to="/logout" onClick={handleLogout} >Logout</Link>
                    </li>}

                    {user.uid && <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>
                    </li>}

                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
        </nav >
    )
}

