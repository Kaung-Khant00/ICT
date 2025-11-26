import React from "react";
import SchoolImage from "../assets/images/schoolImage.jpg";

const School = () => {
  return (
    <section
      id="our-school"
      className="relative bg-linear-to-r from-emerald-500 to-emerald-700 overflow-hidden h-screen flex items-center text-white z-2"
    >
      <div className="z-10 absolute top-0 left-0 w-64 h-64 bg-green-400/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="z-10 absolute bottom-0 right-0 w-72 h-72 bg-green-400 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-16 ">
        <div className="md:w-1/2 relative group">
          <div className="w-full h-full absolute top-6 left-6 bg-white rounded-3xl transition origin-bottom-right group-hover:rotate-2 group-hover:translate-y-6 "></div>
          <img
            src={SchoolImage}
            alt="No. (11) Basic Education High School building"
            className="w-full h-auto rounded-3xl shadow-2xl shadow-black/40 object-cover z-10 relative transition group-hover:-rotate-2 group-hover:-translate-y-6 "
          />
        </div>

        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold whitespace-nowrap hdh">
            No.(11) Basic Education High School
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold opacity-90 hdh">
            Nay Pyi Taw, Myanmar
          </h2>
          <p className="leading-relaxed text-lg md:text-xl opacity-90 hdh">
            Our school is a renowned government institution that empowers
            students academically and nurtures their curiosity in science,
            technology, and innovation. We focus on holistic development and
            future-ready learning.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <button className="z-2 px-6 py-2 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-white/90 transition btn-hover">
              Learn More
            </button>
            <button className="z-2 px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition hover:scale-105">
              Contact
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-white/10 rounded-t-full blur-3xl"></div>
    </section>
  );
};

export default School;
