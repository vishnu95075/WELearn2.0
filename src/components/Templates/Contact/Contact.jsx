import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Contact.css'

const Contact = ({ currentUser }) => {


  return (
    <>
      <Navbar />

      <div className="contact-main-cantainer">

        <div className="contact-paragraph">

          <div className="contact-datials">
            <div className="contact-heading">
              <h2>Contact Us</h2>
            </div>
            <div className="contact-address">
              <i className="fa fa-map-marker fa-2x" aria-hidden="true" />
              <p>Murubanda near Chitaki pona, Ramgarh, Dist: Ramgarh, jharkhand.</p>
            </div>

            <div className="contact-phone">
              <i className="fa fa-phone fa-2x" aria-hidden="true" />
              <p>+91 6205041819</p>
            </div>

            <div className="contact-email">
              <i className="fa fa-envelope fa-2x" aria-hidden="true" />
              <p>swetakumarisah30122001@gmail.com @gmail.com</p>
            </div>

            <div className="contact-website">
              <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
              <p>https://welearn-78cd8.web.app</p>
            </div>
          </div>

          <div className="contact-link">

            <li>
              <a href="/#"><i className="fab fa-youtube fa-2x" aria-hidden="true" /> </a>
            </li>

            <li>
              <a href="/#"><i className="fab fa-facebook-square fa-2x" aria-hidden="true" /> </a>
            </li>

            <li>
              <a href="/#"> <i className="fab fa-linkedin fa-2x" aria-hidden="true"></i> </a>
            </li>

            <li>
              <a href="/#"><i className="fab fa-twitter fa-2x" /> </a>
            </li>

            <li>
              <a href="/#"><i className="fab fa-instagram fa-2x" aria-hidden="true" /> </a>
            </li>

          </div>
        </div>
        <div className="contact-inpute">
          <h3>Contact Us Form</h3>
          <span>Full Name</span>
          <input type="text" />
          <span>Email</span>
          <input type="text" />
          <span>State</span>
          <input type="text" />
          <span>Country</span>
          <input type="text" />
          <span>Message</span>
          <textarea name="message" id="meassage" cols="30" rows="5"></textarea>
          <button>Submit</button>
        </div>
      </div>
    </>




  )
}

export default Contact
