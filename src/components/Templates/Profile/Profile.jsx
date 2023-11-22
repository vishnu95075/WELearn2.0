import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import './Profile.css'
import RegistraionSignUp from '../RegistrationSignUp/RegistraionSignUp';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const Profile = ({ currentUser, userDbData }) => {
    const navigation = useNavigate();
    const auth = getAuth();
    const signOutCurrentUser = () => {
        signOut(auth).then(() => {
            navigation("/");
        }).catch((error) => {
            alert(error);
        });
    }

    if (currentUser && userDbData) {
        // console.log(currentUser.displayName);
        return (
            <div>
                <Navbar />
                <div className="profile-container">

                    <div className="profile-container-child">
                        <div className="profile-img">
                            <div className="profile-img-cropper">
                                <img src={currentUser.photoURL}
                                    height="150"
                                    width="170"
                                    alt='userImage' />
                            </div>
                            <p>{currentUser.displayName}</p>
                        </div>
                        <div className="profile-Datail">
                            <button
                                onClick={signOutCurrentUser}
                                style={{ float: "right" }}
                            >
                                Log Out
                            </button>
                            <h3>{currentUser.displayName}</h3>
                            <p className='email'>Email:- {currentUser.email}</p>
                            <p className='contact'>Contact No {userDbData.contact}</p>
                            <p className='studentId'>Student Id {userDbData.studentId}</p>
                            <p className='department'>Deapartment is {userDbData.department}</p>
                            <p className='role'>Role is {userDbData.role}</p>
                        </div>

                    </div>
                    <div className="attendence">

                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <RegistraionSignUp />
            </>
        )
    }

}

export default Profile