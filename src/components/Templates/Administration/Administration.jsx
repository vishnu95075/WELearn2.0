import React from 'react'
import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FirestoreDb } from "../../../config/firebase";
import Navbar from '../Navbar/Navbar';
import './Administration.css'


const Administration = ({ currentUser, userDbData }) => {
    const collegeUserDb = "users";
    const [noticesInfo, setNoticesInfo] = useState([]);


    // const deleteHandler = async (idd) => {
    //     // const deleteDocData = doc(FirestoreDb, collegeUserDb, idd);

    //     const confirmMessage = `Sure, You want to Update`;
    //     if (window.confirm(confirmMessage)) {
    //         await updateDoc(doc,{
    //             rolsdse : "hoo"
    //         });
    //     } else {
    //         alert(`Not deleted `);
    //     }
    // }
    const deleteHandler = async (tempDoc) => {
        const docRef = doc(FirestoreDb, collegeUserDb, tempDoc.id);

        const confirmMessage = `Sure, You want to Update`;
        if (window.confirm(confirmMessage)) {
            await updateDoc(docRef, {
                roleAuth: !tempDoc.roleAuth
            });
        } else {
            alert(`Not deleted `);
        }
    }

    useEffect(() => {
        onSnapshot(collection(FirestoreDb, collegeUserDb), (snap) => {
            setNoticesInfo(snap.docs.map((iteam) => ({ ...iteam.data(), id: iteam.id })));
        });

    }, [setNoticesInfo]);

    
    return (
        <>
            <Navbar />
            <div className="college-notice">
                <div className="">
                    <h1 className="text-center">ADMINISTRATION</h1>
                </div>

                <div className='Noticefication-box-main'>

                    <div className='notice-box shadow-lg' >
                        <div className="list">
                            <h3 style={{ textAlign:"center" }}> Admin </h3>
                            <table>
                                <tr>
                                    <th>Avtar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Auth</th>
                                </tr>
                                {
                                    noticesInfo.map((doc) => {
                                        if (doc.roleAuth) {
                                            return (
                                                <tr key={doc.id}>
                                                    <td>
                                                        <img src={doc.avtarURL} alt={doc.name + " img"} />
                                                    </td>
                                                    <td>{doc.name}</td>
                                                    <td>{doc.email}</td>
                                                    <td>{doc.contact}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                deleteHandler(doc);
                                                            }}
                                                        >{doc.roleAuth ? "Admin " : "User"}</button>
                                                    </td>
                                                </tr>

                                            )
                                        }
                                    })
                                }
                            </table>
                            <h3 style={{ textAlign:"center" }}> User </h3>
                            <table>
                                <tr>
                                    <th>Avtar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Auth</th>
                                </tr>
                                {
                                    noticesInfo.map((doc) => {
                                        if (!doc.roleAuth) {
                                            return (
                                                <tr key={doc.id}>
                                                    <td>
                                                        <img src={doc.avtarURL} alt={doc.name + " img"} />
                                                    </td>
                                                    <td>{doc.name}</td>
                                                    <td>{doc.email}</td>
                                                    <td>{doc.contact}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                deleteHandler(doc);
                                                            }}
                                                        >{doc.roleAuth ? "Admin " : "User"}</button>
                                                    </td>
                                                </tr>

                                            )
                                        }
                                    })
                                }
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Administration