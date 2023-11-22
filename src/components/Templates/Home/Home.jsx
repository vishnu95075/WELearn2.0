import React from 'react'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { userCallId } from '../../../config/firebase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';
import rec1 from '../../../Images/REC1.jpg';
import rec2 from '../../../Images/REC2.jpg';
import rec3 from '../../../Images/REC3.jpg';
import Footer from '../Footer/Footer'


const Home = ({ currentUser }) => {
  const navigation = useNavigate();
  const [copyVCallLink, setCopyVCallLink] = useState("");
  const [navigateVCallLink, setNavigateVCallLink] = useState("");
  const [inputColor, setInputColor] = useState()

  const handleCopyVCallLink = () => {
    navigator.clipboard.writeText(copyVCallLink);
    setInputColor({
      backgroundColor: "#a2a6a3"
    })
  }

  // http://localhost:3000/videocall?id=-NLZonKzhL0QMlxTILpQ

  useEffect(() => {
    var currentURLpath = window.location.href;
    setCopyVCallLink(`${currentURLpath}videocall?id=${userCallId}`);
    setNavigateVCallLink(`videocall?id=${userCallId}`);
  }, [copyVCallLink])

  const HandleCall = () => {
    navigation(navigateVCallLink);
    window.location.reload()
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="copy-vcall-link">
          <input style={inputColor} type="text" value={copyVCallLink} onChange={(e) => setCopyVCallLink(e.target.value)} />
          <button onClick={handleCopyVCallLink}>
            <i className="fa fa-clone" aria-hidden="true" />
          </button>
          <button onClick={HandleCall}>Call</button>
        </div>

        <div className="home-container">
          <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="10000">
                <img src={rec1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Ramgarh Engineering College</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item" data-interval="10000">
                <img src={rec2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Ramgarh Engineering College</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item" data-interval="10000">
                <img src={rec3} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Ramgarh Engineering College</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
        <div className="Home-Container-box">
          <blockquote>
            ClassRoom
          </blockquote>
          <blockquote>
            Notice
          </blockquote>
          <blockquote>
            Notes
          </blockquote>
        </div>
        <Footer/>
      </div>
    </>
  )

}

export default Home