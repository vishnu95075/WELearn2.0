import React from 'react'
import './Navbar.css'
import { useNavigate, NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, userCallId } from "../../../config/firebase";
import { useState } from 'react';
import { useEffect } from 'react';
const Navbar = () => {
    const navigation = useNavigate();
    const [navigateVCallLink, setNavigateVCallLink] = useState("");
    useEffect(() => {
        setNavigateVCallLink(`/videocall?id=${userCallId}`);
    }, [])

    const HandleCall = () => {
        navigation(navigateVCallLink);
        window.location.reload()
    }

    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser("");
            }
        });
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <NavLink className="navbar-brand" to="/" >WELearn</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon"></span> */}
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" >HOME</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/classroom" >CLASSROOM</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to={`/videocall`}
                                onClick={HandleCall}
                            >VCall</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/notice" >NOTICES</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" >CONTACT US</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin" >ADMINISTRATION</NavLink>
                        </li>
                    </ul>
                    {
                        currentUser ? (<img
                            onClick={
                                (e) => {
                                    navigation('/profile');
                                }
                            }
                            src={currentUser.photoURL}
                            className='navebar-profile-img-img-cropper'
                            alt="UserPic" height="100" width="200"
                        />
                        ) :
                            (
                                <>
                                    <NavLink className="nav-link" to="/login" >Log In</NavLink>
                                    <NavLink className="nav-link" to="/signup" >Sign Up</NavLink>
                                </>
                            )
                    }

                </div>
            </nav>
        </div>
    )
}

export default Navbar