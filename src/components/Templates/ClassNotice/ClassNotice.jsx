import React from 'react'
import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirestoreDb, storage } from "../../../config/firebase";
import { useParams } from 'react-router-dom';
import './ClassNotice.css';
import Navbar from '../Navbar/Navbar';

const ClassNotice = ({ currentUser, userDbData }) => {
    const params = useParams();
    const classObj = params.id;
    const classArray = classObj.split("^");
    const className = classArray[0];
    const subjectName = classArray[1];
    const classUserUID = classArray[2];
    let tempClassDB = className + subjectName;
    const classDataBase = tempClassDB.split(/\s/).join('');
    const [btnDisable, setBtnDesable] = useState(false);
    const [noticetitle, setNoticeTitle] = useState("");
    const [progress, setProgress] = useState(0);
    const [noticesInfo, setNoticesInfo] = useState([]);



    const formHandler = (e) => {
        setBtnDesable(true);
        e.preventDefault();
        const file = e.target[1].files[0];
        uploadFiles(file);
    }
    const uploadFiles = (files) => {
        if (!files) return;
        const storageRef = ref(storage, `/${classDataBase}/PDFfiles/${files.name}`);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        submitHandler(url);
                    }
                    );
            })
        files = "";
    }

    
    const submitHandler = async (urls) => {
        let d = new Date();
        const dd = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        const noticeRef = doc(collection(FirestoreDb, classDataBase));
        await setDoc(noticeRef, {
            noticeUserName: currentUser.displayName,
            noticeUserPhoto: currentUser.photoURL,
            noticeUserUID: currentUser.uid,
            urls,
            noticetitle,
            date: dd
        });
        setNoticeTitle("");
        setProgress(0);
        setBtnDesable(false);
    }

    const deleteHandler = async (idd) => {
        const deleteDocData = doc(FirestoreDb, classDataBase, idd);
        const confirmMessage = `Sure, You want to delete.`;
        if (window.confirm(confirmMessage)) {
            await deleteDoc(deleteDocData);
        } else {
            alert(`Not deleted `);
        }
    }

    useEffect(() => {
        onSnapshot(collection(FirestoreDb, classDataBase), (snap) => {
            setNoticesInfo(snap.docs.map((iteam) => ({ ...iteam.data(), id: iteam.id })));
        });

    }, [classDataBase]);


    return (
        <>
            <Navbar />
            <div className="class-notice">
                <div className="">
                    <h1 className="text-center">{subjectName}</h1>
                </div>
                {
                    currentUser.uid === classUserUID ? (
                        <div className="NoticeInpute ">
                            <form onSubmit={formHandler} >
                                <label htmlFor="Notice"><i>Notice Title</i> </label><br />
                                <input
                                    type="text"
                                    className='notice-heading-name-enter'
                                    placeholder='Enter Notice Title'
                                    onChange={(e) => setNoticeTitle(e.target.value)}
                                /><br />
                                <input
                                    type="file" className='files-enter'
                                /><br />
                                <button
                                    className='create-classroom-submit-button'
                                    type="submit"
                                    disabled={btnDisable}
                                >
                                    Submit
                                </button>
                                {
                                    progress > 0 ? (
                                        <h6 style={{ color: "green" }}>
                                            Please wait, File is Uploading ... {progress}%
                                        </h6>
                                    )
                                        :
                                        (" ")
                                }

                            </form>

                        </div>
                    )
                        :
                        ("")

                }


                <div className='Noticefication-box-main'>
                    {
                        noticesInfo.map((doc) => {
                            return (
                                <div className='notice-box shadow-lg' key={doc.id}>
                                    <img src={doc.noticeUserPhoto} className='notice-profile-admin-img' alt="AdminImage" height="100" width="200" />
                                    <span style={{ float: "left" }}>{doc.noticeUserName}</span>
                                    <a
                                        href={doc.urls}
                                    >{doc.noticetitle}</a>
                                    <p style={{ color: "red", float: "right" }}>{doc.date}</p>
                                    {
                                        currentUser.uid === doc.noticeUserUID ? (
                                            <button
                                                onClick={() => {
                                                    deleteHandler(doc.id);
                                                }}
                                            >Delete</button>
                                        ) : ("")
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}
  
    


export default ClassNotice