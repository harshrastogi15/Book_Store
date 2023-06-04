import React from 'react';
import Footer from '../Footer/Footer';
import style from '../About/About.module.css';

function About() {
  return (
    <>
      <div className={style.about}>
        <h3>Welcome to Our Book Discovery and Review Platform</h3>
        <div className={style.aboutDiv}>
          <h4>Who we are</h4>
          <p>
            At our Book Discovery and Review Platform, we are passionate about books and fostering a community of avid readers. Our team of dedicated book enthusiasts believes in the power of literature to inspire, educate, and entertain. We aim to create an inclusive platform where readers from all walks of life can come together to discover new books, share their thoughts, and connect with like-minded individuals.
          </p>
        </div>
        <div className={style.aboutDiv}>
          <h4>How it works</h4>
          <ul>
            <li>Browse through our extensive collection of books spanning various genres, authors, and themes. Discover new releases, bestsellers, and hidden gems that cater to your unique reading preferences.</li>
            <li>
                Share your thoughts and opinions about the books you&apos;ve read. Leave detailed reviews, rate books on a scale, and contribute to the overall rating of each title. Engage in meaningful discussions with fellow readers, gain insights from different perspectives, and expand your understanding of the books you love.
            </li>
          </ul>
        </div>
        <div className={style.aboutDiv}>
          <h4>How it created</h4>
          <p>
            Our Book Discovery and Review Platform was created through a collaborative process involving planning, design, frontend and backend development, and deployment. The frontend was built using React, while the backend utilized Node.js and Express. We integrated user authentication, data management, and API endpoints for seamless communication between the frontend and backend. User feedback was collected and incorporated into iterative improvements to enhance the platform&apos;s functionality and user experience. The platform is regularly maintained and updated to provide a secure and engaging experience for book lovers.
          </p>
        </div>
        <div className={style.aboutLine}>
        We believe in the power of books to inspire, educate, and transform lives. Join us on our Book Discovery and Review Platform and embark on a journey of literary exploration.
        </div>
      </div>
      <Footer/>
    </>

  );
}

export default About;
