import HeroImage from "../assets/images/HeroImage.png";
/* 
const School = () => {
  return (
    <section
      id="school"
      className="relative h-[calc(100vh-64px)] w-full flex items-center justify-center"
    >
      <img
        src={SchoolImage}
        alt="School"
        className="absolute inset-0 w-full h-full object-cover object-top brightness-75 "
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          National ICT Awards - 2025
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mt-2 opacity-90">
          (Educational Project & Skills Competition)
        </h2>

        <p className="mt-6 text-lg opacity-90">
          Where young creators grow, explore technology, and bring meaningful
          ideas to life.
        </p>

        <button className="btn btn-primary mt-6">Explore Our Project</button>
      </div>
    </section>
  );
}; */
/* const School = () => {
  return (
    <section
      className="section min-h-[calc(100vh-64px)] flex items-center"
      id="school"
    >
      <div className="grid md:grid-cols-2 items-center  ">
        <div className="ps-8">
          <h1 className="text-4xl font-bold leading-tight">
            National ICT Awards - 2025
          </h1>
          <h1 className="text-2xl font-bold opacity-90 mt-2">
            (Educational Project & Skills Competition)
          </h1>

          <p className="mt-6 text-lg md:max-w-[80%] opacity-70">
            Where young creators grow, explore technology, and bring meaningful
            ideas to life.
          </p>
          <button className="btn btn-primary mt-6">Export our Project</button>
        </div>
        <img src={SchoolImage} alt="schoolImage" />
      </div>
    </section>
  );
}; */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const el = heroRef.current;

    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
    });
  }, []);

  return (
    <section
      className="section h-screen pt-16 flex items-center z-1 relative"
      id="home"
    >
      <div
        className="grid lg:grid-cols-2 grid-cols-5 items-center h-full w-full"
        ref={heroRef}
      >
        <div className="lg:ps-8 ps-4 lg:col-span-1 col-span-3">
          <h1 className="min-[900px]:text-4xl text-3xl font-bold leading-tight whitespace-nowrap hdh">
            National ICT Awards - 2025
          </h1>
          <h1 className="min-[900px]:text-2xl text-xl font-bold opacity-90 mt-2 whitespace-nowrap hdh">
            (Educational Project & Skills Competition)
          </h1>

          <p className="mt-6 text-lg opacity-70 w-full whitespace-nowrap hdh">
            Where young creators grow, explore technology, and <br /> bring
            meaningful ideas to life.
          </p>
          <a href="#our-school" className="z-2">
            <button className="btn btn-primary mt-6 z-2">
              Explore Project
            </button>
          </a>
        </div>
        <div className="lg:p-12 lg:col-span-1 col-span-2">
          <img src={HeroImage} alt="heroImage" className="h-full" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
