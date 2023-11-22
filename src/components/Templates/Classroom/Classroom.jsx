import React from 'react';
import './Classroom.css'
import { useState, useEffect } from 'react';
import { FirestoreDb } from "../../../config/firebase";
import { collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Classroom = ({ currentUser, userDbData }) => {
    const navigation = useNavigate();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [className, setClassName] = useState("");
    const [subjectName, setsubjectName] = useState("");
    const [classInfo, setClassInfo] = useState([]);


    const submitHandler = async (e) => {
        e.preventDefault();
        setBtnDisabled(true);
        const newCityRef = doc(collection(FirestoreDb, "ClassRooms"));
        await setDoc(newCityRef, {
            className,
            subjectName,
            classUserUID: currentUser.uid,
            classromAdimPhotoURL: currentUser.photoURL,
            classromAdimName: currentUser.displayName
        });
        setClassName("");
        setsubjectName("");
        setBtnDisabled(false);
    }

    const deleteHandler = async (idd, clName, subName) => {
        const deleteDocData = doc(FirestoreDb, "ClassRooms", idd);
        const confirmMessage = `Sure , You want to delete \nClass Name :- ${clName} \nSubject Name :- ${subName} `;
        if (window.confirm(confirmMessage)) {
            await deleteDoc(deleteDocData);
        } else {
            alert(`SuccesFully not deleted \nClass Name :- ${clName} \nSubject Name :- ${subName}`);
        }
    }

    useEffect(() => {
        onSnapshot(collection(FirestoreDb, "ClassRooms"), (snap) => {
            setClassInfo(snap.docs.map((iteam) => ({ ...iteam.data(), id: iteam.id })));
        })
    }, [className]);


    return (
        <>


            <Navbar />

            <div className="classroom">

                {
                    userDbData.role === 'admin' ? (
                        <div className='classroom-box-main' >
                            <div className="main" >

                                <div className="Classroom-create-box ">
                                    <h3>Create Classroom</h3>
                                    <form>
                                        <label htmlFor="Class-name">Class Name</label><br />
                                        <input
                                            type="text"
                                            placeholder='Enter Class Name'
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                        /><br />
                                        <label htmlFor="Subject-name">Subject Name</label><br />
                                        <input
                                            type="text"
                                            placeholder='Enter Subject Name'
                                            value={subjectName}
                                            onChange={(e) => setsubjectName(e.target.value)}
                                        /><br />
                                        <button
                                            onClick={submitHandler}
                                            disabled={btnDisabled}
                                        >Create</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        (" ")
                }

                <div className='classroom-box-main' >
                    {
                        classInfo.map((doc) => {
                            let resulClassName = doc.className;
                            let resultSubjectName = doc.subjectName;
                            if (resulClassName.length > 15) {
                                resulClassName = resulClassName.slice(0, 13);
                                resulClassName = resulClassName + '...';
                            }
                            if (resultSubjectName > 20) {
                                resultSubjectName = resultSubjectName.slice(0, 20);
                                resultSubjectName = resultSubjectName + '...';
                            }
                            return (
                                <div
                                    key={doc.id}
                                    className="Classroom-box "

                                >
                                    <div className="content-div">
                                        <div className="class-name-box">
                                            <p><b>{resulClassName}</b> </p>
                                            {
                                                currentUser.uid === doc.classUserUID ? (<button
                                                    className='delete-classroom'
                                                    onClick={(e) => deleteHandler(doc.id, doc.className, doc.subjectName)}
                                                >
                                                    <p>&#x2716;</p></button>)
                                                    :
                                                    ("")
                                            }

                                            <div>
                                                <div className="image-cropper">
                                                    <img src={doc.classromAdimPhotoURL} height="100" width="200" alt='userImage' />
                                                </div>
                                                <p id="teacher-names">{doc.classromAdimName} </p>
                                            </div>
                                            <p
                                                id='subject-name'
                                                onClick={
                                                    () => navigation(`/classnotice/${doc.className + "^" + doc.subjectName + "^" + doc.classUserUID}`)
                                                }>
                                                {resultSubjectName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Classroom 