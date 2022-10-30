import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo-criclive.png'

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <img src={logo} className="rounded" alt="criclive" style={{ height: "50px" }} />

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ">

                    <li className="nav-item active" style={{ margin: "6px" }}>
                        <Link className="nav-link active" to='/'>Home</Link>
                    </li>
                     <li className="nav-item" style={{ margin: "6px" }}>
                        <Link className="nav-link active" to="/login">Login</Link>
                    </li>

                    <li className="nav-item" style={{ margin: "6px" }}>
                        <Link className="nav-link active" to="/logout">Logout</Link>
                    </li>

                    <li className="nav-item" style={{ margin: "6px" }}>
                        <Link className="nav-link active" to="/profile">Profile</Link>
                    </li>

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

