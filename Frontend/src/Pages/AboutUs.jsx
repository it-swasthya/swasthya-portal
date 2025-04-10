import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import "../Utils/aos.css"
import { assets } from '../Assests/Assests';
import Layout from '../Components/Layout';
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <Layout>
    <div className=" w-full flex flex-col overflow-hidden" style={{marginTop:"-70px"}}>
    {/* Hero Section */}
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-start relative px-6 md:px-12"
      style={{ backgroundImage: `url(${assets.bg1})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      <div className=" w-full max-w-lg text-white z-10 bg-black bg-opacity-10 p-6 rounded-lg">
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide leading-tight transform hover:scale-110 transition duration-700">
          About Us
        </h1>
        <p className="mt-4 text-base md:text-xl max-w-2xl opacity-80 transform hover:scale-105 transition duration-700 text-white-500">
          Discover who we are and why we are committed to bringing you the best in healthcare services. SwasthyaPro is dedicated to making healthcare accessible and hassle-free for everyone across India.
        </p>
      </div>
    </div>

    {/* Welcome Section */}
    <section className="py-16 px-6 md:py-24 md:px-12 bg-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <img src={assets.welcomeImage} alt="Welcome" className="w-full md:w-1/2 rounded-lg object-cover" data-aos="zoom-in" data-aos-duration="1200" />
        <div className="w-full md:w-1/2 text-center md:text-left" data-aos="fade-left" data-aos-duration="1200">
          <h2 className="text-3xl md:text-5xl font-extrabold text-green-800 mb-6">SwasthyaPro</h2>
          <p className="text-lg text-gray-800 mb-6">
            At SwasthyaPro, we believe healthcare shouldn’t be complicated—it should be fast, accessible, and stress-free. We’ve built a smart, digital healthcare platform that connects users, doctors, and top-certified labs seamlessly.
          </p>
          <p className="text-xl text-blue-600 font-semibold">
            <span className="text-indigo-600">Your health, our priority!</span>
          </p>
        </div>
      </div>
    </section>

    {/* Mission & Vision Section */}
    <section className="bg-gray-50 px-4 md:px-8 py-12" data-aos="fade-up" data-aos-duration="1200">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 ">Our Mission & Vision</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <img src={assets.ourMission} alt="Mission" className="w-full h-auto rounded-lg transition hover:scale-105" data-aos="fade-right" data-aos-duration="1200" />
      <div className="space-y-4 text-lg text-gray-800 text-left">
        <p><strong>Mission:</strong> Healthcare Without Barriers. We aim to make high-quality healthcare effortless and accessible for every Indian.</p>
        <p><strong>Vision:</strong> A future where everyone has easy access to diagnostic services and medical expertise at their fingertips.</p>
        <p><strong>Effortless :</strong> Because booking tests should be as easy as ordering food online.</p>
        <p><strong>Accessible :</strong>Quality healthcare, available anytime, anywhere with just a tap.</p>
        <p><strong>Secure :</strong>Your health data is protected, encrypted, and fully compliant with ISO 27001, DPDP Act, and NABL standards</p>
      </div>
    </div>
  </div>
</section>


    {/* Why Choose Us Section */}
    <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-16">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-12" data-aos="fade-up" data-aos-duration="1200">
      Why Choose Us?
    </h2>
    <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
      {[
        'One Platform. Endless Possibilities.', 
        "System-Guided Testing", 
        "Trusted & Certified Labs", 
        "Home Sample Collection", 
        "Instant & Secure Reports", 
        "No Data Hoarding", 
        'Corporate Wellness & Drug Testing', 
        'Seamless & Transparent Experience'
      ].map((title, index) => (
        <div 
          key={index} 
          className="hover:bg-black hover:bg-opacity-30 bg-stone-900 bg-opacity-60 p-6 rounded-2xl shadow-xl  transition duration-300 hover:scale-105 flex flex-col justify-between h-full"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3">{title}</h3>
          <p className="text-sm md:text-base flex-grow text-white">
            {[
              "A Complete Healthcare Ecosystem – Book lab tests, consult doctors, and track your health—all in one place.",
              "Not sure which test you need? Our system expert help you choose the right one.",
              "Partnering only with NABL, ICMR, and GLP-certified labs for accuracy & reliability.",
              "No more lab visits! Our trained DMLT professionals collect samples from your doorstep.",
              "Get fast, digital reports with end-to-end encryption for maximum privacy.",
              "Your reports are auto-deleted after a set period, ensuring top-notch security & compliance.",
              "Helping businesses with customized health packages & workplace drug testing.",
              "No hidden fees. No unnecessary delays. Just reliable healthcare."
            ][index]}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


 


 <section className="container mx-auto px-6 py-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition duration-300 hover:scale-105">
      <img src={assets.ISO27001} className="max-h-24 object-contain mb-4" alt="ISO27001 Logo" />
      <h3 className="text-lg font-semibold text-gray-800">ISO 27001 Certified Platform </h3>
      <p className="text-gray-600 mt-2">We comply with global security standards for data protection.</p>
    </div>

    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition duration-300 hover:scale-105">
      <img src={assets.endToendEncryption} className="max-h-24 object-contain mb-4 mt-2" alt="Encryption Icon" />
      <h3 className="text-lg font-semibold text-gray-800">End-to-End Encryption</h3>
      <p className="text-gray-600 mt-2">Your health data is completely secure from booking to report delivery.</p>
    </div>

    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition duration-300 hover:scale-105">
      <img src={assets.securePaymentImg} className="max-h-24 object-contain mb-4 mt-2" alt="Secure Payment" />
      <h3 className="text-lg font-semibold text-gray-800">Secure Payments</h3>
      <p className="text-gray-600 mt-2">100% safe transactions with industry-standard encryption.</p>
    </div>

    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition duration-300 hover:scale-105">
      <img src={assets.unnecessaryDataImg} className="max-h-24 object-contain mb-4 mt-2" alt="Data Privacy" />
      <h3 className="text-lg font-semibold text-gray-800">No Unnecessary Data Storage</h3>
      <p className="text-gray-600 mt-2">Your reports are auto-deleted after a set period, ensuring maximum privacy.</p>
    </div>

  </div>
</section>


    {/* More Reasons to Choose Us */}
    <section className="bg-gray-100 py-16 px-6 md:px-12" data-aos="fade-up" data-aos-duration="1200">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-8">More Reasons to Choose <span className="text-yellow-600">SwasthyaPro</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src={assets.chooseUsImage} alt="Why Choose Us" className="w-full max-w-md mx-auto" data-aos="fade-right" />
          <div className="space-y-4 text-left text-lg text-gray-800">
            <p><strong>✔ Built on Trust, Powered by Experts:</strong> Accuracy, reliability, and transparency are non-negotiable.</p>
            <p><strong>✔ NABL, ICMR, and GLP-certified Labs:</strong> Ensuring gold-standard testing.</p>
            <p><strong>✔ Doctor-Backed Consultations:</strong> Get guided recommendations from qualified professionals.</p>
            <p><strong>✔ 100% Transparency:</strong> No hidden charges, just honest, quality-driven healthcare.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Closing Statement */}
    <section className="bg-gradient-to-r from-green-600 to-teal-500 text-center py-8 px-4 text-white mb-2 rounded-lg">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Together, we aim to create a healthier, happier tomorrow. Experience SwasthyaPro today!
      </p>
    </section>
  </div>
  </Layout>
  );
};

export default About;
