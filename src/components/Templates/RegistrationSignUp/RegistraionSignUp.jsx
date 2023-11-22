import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import './RigistrationSignUpForm.css'
import { FirestoreDb, storage } from "../../../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth } from "../../../config/firebase";
import Navbar from '../Navbar/Navbar';

const RegistraionSignUp = () => {
    const roleAuth = false;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [contact, setContact] = useState("");
    const [studentId, setStudentId] = useState("");
    const [role, setRole] = useState("user");
    const [errorMsg, setErrorMsg] = useState("");
    const [doneSetData, setDoneSetData] = useState();
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const [progress, setProgress] = useState(0);

    const formHandler = (e) => {
        setSubmitButtonDisabled(true);
        e.preventDefault();
        const avt = e.target[8].files[0];
        if (!avt) {
            setErrorMsg("Please enter Image");
            return;
        }
        else
            if (password.length <= 5) {
                setErrorMsg("Please enter strong password, Password atlease 6 character");
                setSubmitButtonDisabled(false);
                return;
            }
            else if (contact.length !== 10) {
                setErrorMsg("Please enter valid Number");
                setSubmitButtonDisabled(false);
                return;
            }
            else if (studentId.length !== 12 && department.length >= 3) {
                setErrorMsg("Please enter vailid student Id");
                setSubmitButtonDisabled(false);
                return;
            }
            else {
                uploadFiles(avt);
                return;
            }
    }
    const uploadFiles = (files) => {
        if (!files) return;
        const storageRef = ref(storage, `/Avatarfiles/${files.name}`);
        const uploadTask = uploadBytesResumable(storageRef, files);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        }, (err) => {
            setErrorMsg(err);
            return;
        },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        submitHandler(url);
                    }
                    );
            })

    }

    const submitHandler = async (urls) => {

        setErrorMsg("");
        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                await sendEmailVerification(res.user);
                updateProfile(res.user, {
                    displayName: name,
                    photoURL: urls
                });

                let d = new Date();
                const dd = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                const cityRef = doc(FirestoreDb, 'users', res.user.uid);

                const returnData = await setDoc(cityRef, {
                    name,
                    email,
                    department,
                    studentId,
                    contact,
                    role,
                    roleAuth,
                    avtarURL: urls,
                    date: dd
                });
                setDoneSetData(returnData)
            })
            .catch((err) => {
                setErrorMsg(err.message);
                setSubmitButtonDisabled(false);
                return;
            });
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setStudentId("");
        setProgress(0);
        if (doneSetData) {
            setSubmitButtonDisabled(false);
        }
    };

    return (

        <>
            <Navbar />
            <div className="registration-signUp-form ">
                <form className="needs-validation jumbotron" onSubmit={formHandler} >
                    <h3>Registration and Sign Up Form</h3>
                    <div className="form-row ml-6">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip01">Full Name</label>
                            <input
                                type="text"
                                placeholder='Enter Full Name'
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip02">Email</label>
                            <input
                                type="Email"
                                className="form-control"
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="form-row ml-6">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip01">Password</label>
                            <input
                                type="Password"
                                placeholder='Enter Password'
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip02">Department</label>
                            <select className="custom-select" id="inputGroupSelect02"
                                onChange={(e) => setDepartment(e.target.value)}>
                                <option value={"admin"} >Admin</option>
                                <option value="Computer Science and Engineering">
                                    Computer Science and Engineering</option>
                                <option value="Electronics & Communication Engineering">
                                    Electronics & Communication Engineering
                                </option>
                                <option value="Electrical Engineering">
                                    Electrical Engineering
                                </option>
                                <option value="Civil Engineering">
                                    Civil Engineering
                                </option>
                                <option value="Mechanical Engineering">
                                    Mechanical Engineering</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row ml-6">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip01">Contact Number</label>
                            <input
                                type="text"
                                placeholder='Enter Contact Number'
                                className="form-control"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip02">Student Id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Enter Student Id'
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>

                        </div>
                    </div>

                    <div className="form-row ml-6">

                        <div
                            className="btn-group btn-group-toggle col-md-6 mb-3 rounded"
                            data-toggle="buttons"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <label className="btn btn-light mb-3  mr-2 active rounded">
                                <input
                                    value={"user"}
                                    type="radio"
                                    name="options"
                                    id="option1"
                                />
                                Student
                            </label>
                            <label className="btn btn-light mb-3 ml-2 mr-4 rounded">
                                <input
                                    value={"admin"}
                                    type="radio"
                                    name="options"
                                    id="option2"
                                />
                                Admin
                            </label>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip02">Profile Picture</label>
                            <input
                                type="file"
                                id="validationTooltip02"
                                required />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <h6 style={{ color: "red" }}>{
                        errorMsg ? (`${errorMsg} \n\n Please Refresh Page `) : (" ")
                    }</h6>
                    <h6 style={{ color: "green" }}>{
                        progress > 0 ? (`Avtar Uploading...  ${progress}%`) : (" ")
                    }</h6>
                    <span>Create new account</span>
                    <button
                        disabled={submitButtonDisabled}
                        className="font-semibold btn btn-primary"
                        type='submit'
                    >
                        Sign Up
                    </button>
                    {
                        progress === 0 ? (
                            <p>
                                Already an account  &nbsp;&nbsp;&nbsp;&nbsp; {" "}
                                <span>
                                    <Link
                                        className='btn btn-success'
                                        to="/login">
                                        Login
                                    </Link>
                                </span>
                            </p>
                        ) : ("")
                    }

                </form>
            </div>
        </>
    )
}

export default RegistraionSignUp