import { useState, useEffect, useRef } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import '../Utils/aos.css'
import { Link } from "react-router-dom";
import { assets } from "../Assests/Assests";
import Layout from "../Components/Layout";

const images = [assets.contactCarousel_img1, assets.contactCarousel_img2, assets.contactCarousel_img3];

export default function Contact() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    intervalRef.current = setInterval(nextSlide, 2000);
    AOS.init({ duration: 1200 });

    return () => clearInterval(intervalRef.current); // Clean up the interval on component unmount
  }, []);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Layout>
        <div className="flex flex-col md:flex-row items-center justify-around w-full h-screen mb-10" style={{ marginTop: "50px" }}>
        {/* Carousel Section */}
        <div className="absolute w-full md:w-4/5 h-100 md:h-full left-0 rounded-lg overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Form Section */}
        <div data-aos="fade-up" data-aos-duration="1200" className="absolute lg:right-20 w-100 max-sm:w-5/6 bg-white/60 p-3 rounded-xl shadow-lg max-w-md mt-6 md:mt-0 md:right-10 sm:mt-20 max-sm:relative">
          <h2 className="text-center text-2xl font-semibold text-[#178066] mb-6">Have A Question?</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-[#178066] font-semibold text-lg">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-2 rounded-lg border-2 border-[#178066] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-[#178066] font-semibold text-lg">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 rounded-lg border-2 border-[#178066] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-[#178066] font-semibold text-lg">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 mt-2 rounded-lg border-2 border-[#178066] focus:outline-none focus:ring-2 focus:ring-[#f1c40f]"
                placeholder="Your message"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-[#178066] text-white font-semibold px-8 py-3 rounded-lg shadow-lg  transition-all duration-300 transform hover:scale-105">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Section: Contact Us Title */}
      <section className="bg-gradient-to-r from-[#9bc7ae] to-[#178066] py-16 px-6 md:px-16 lg:px-32 mb-10">
        <div className="text-center text-3xl md:text-5xl font-extrabold text-white mb-12" data-aos="fade-down" data-aos-duration="1200">
          <p>CONTACT <span className="text-[#f1c40f]">US</span></p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12">
          <div className="w-full md:w-[400px] max-w-[350px] rounded-xl overflow-hidden" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="300">
            <img className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" src={assets.ContactUsVector} alt="Contact Us" />
          </div>

          <div className="w-full md:w-[450px] text-white" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="600">
            <div className="space-y-6 text-center md:text-left">
              <p className="font-semibold text-lg md:text-2xl text-[#d1f2eb]">
                <span className="text-[#f1c40f]">OUR OFFICE:</span> Kh. 382 Plot No4, 1st Floor, Sultanpur, New Delhi, Delhi 110030
              </p>

              <div className="h-[300px] w-full md:w-[500px] mx-auto md:mx-0 mb-2 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7012.7563616071775!2d77.1544001!3d28.4982675!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI5JzQ4LjgiTiA3N8KwMDknMzQuOCJF!5e0!3m2!1sen!2sin!4v1743569418455!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Join the Revolution */}
      <section className="bg-gradient-to-r from-[#9bc7ae] to-[#178066] py-16 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-40 2xl:px-48 mb-10 flex flex-col md:flex-row items-center text-white gap-10">
        <div className="md:w-2/3 flex justify-center mb-6 md:mb-0" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="300">
          <img src={assets.joinUs} alt="Join Us" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl" />
        </div>

        <div className="md:w-2/3 text-center md:text-left space-y-6" data-aos="fade-down" data-aos-duration="1200">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">WHY JOIN <span className="text-[#f1c40f]">US?</span></p>
          <ul className="text-base sm:text-lg md:text-xl font-medium leading-relaxed space-y-4">
            <li className="flex items-start gap-2"><span>✅</span> Impactful Work – Contribute to building a tech-driven healthcare ecosystem that changes lives.</li>
            <li className="flex items-start gap-2"><span>✅</span> Growth Opportunities – Work alongside industry experts and advance your career.</li>
            <li className="flex items-start gap-2"><span>✅</span> Secure & Ethical Environment – Be part of a platform that prioritizes security and compliance.</li>
            <li className="flex items-start gap-2"><span>✅</span> Flexible & Collaborative Culture – We believe in teamwork, innovation, and balance.</li>
            <li className="flex items-start gap-2"><span>✅</span> Innovate & Grow – Work with cutting-edge technology in a high-growth startup environment.</li>
            <li className="flex items-start gap-2"><span>✅</span> Security & Compliance First – Join a company that follows top industry standards (ISO 27001, DPDP Act, NABH, NABL).</li>
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#9bc7ae] to-[#178066] py-16 px-6 md:px-16 lg:px-32 mb-10">
  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
    {/* Image Section (Left side) */}
    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="300">
      <img className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" src={assets.tiapImag} alt="Contact Us" />
    </div>

    {/* Content Section (Right side) */}
    <div className="text-center md:text-left space-y-6 md:w-2/3" data-aos="fade-up" data-aos-duration="1200">
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        WHO WE'RE LOOKING <span className="text-[#f1c40f]">FOR?</span>
      </p>
      <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
        We’re searching for visionaries, innovators, and doers who thrive in a fast-moving, high-impact environment.
        Whether you’re a tech genius, healthcare expert, operations strategist, or marketing powerhouse, there’s a place for you at SwasthyaPro!
      </p>
      <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
        Are you ready to disrupt healthcare with us?
        📩 Send your resume to <Link to={"mailto:info@swasthyapro.com"} className="text-[#f1c40f] hover:text-white" target="_blank">info@swasthyapro.com</Link> or apply directly on our website
      </p>
    </div>
  </div>
</section>





    </Layout>
  );
}
