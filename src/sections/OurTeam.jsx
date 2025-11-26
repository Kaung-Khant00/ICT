import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GiTeacher } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Mg Min Nyan Thant Zin",
    role: "Leader (Presenter)",
    Icon: GiTeacher,
  },
  {
    name: "Mg Min Thant",
    role: "Teammate 1 (Presenter)",
    Icon: GiTeacher,
  },
  {
    name: "Mg Kaung Khant",
    role: "Teammate 2 (Developer)",
    Icon: FaLaptopCode,
  },
];

const OurTeam = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(".teammate", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      scale: 0.98,
      duration: 0.75,
      ease: "power2.out",
      stagger: 0.12,
    });
  }, []);
  useEffect(() => {
    const items = gsap.utils.toArray(".teammate");

    items.forEach((el) => {
      const onMove = (e) => {
        const bounds = el.getBoundingClientRect();
        const relX = (e.clientX - bounds.left) / bounds.width; // 0..1
        const relY = (e.clientY - bounds.top) / bounds.height; // 0..1

        const rotY = (relX - 0.5) * 20; // left/right tilt
        const rotX = (0.5 - relY) * 15; // up/down tilt

        gsap.to(el, {
          rotateY: rotY,
          rotateX: rotX,
          scale: 1.02,
          transformPerspective: 900,
          transformOrigin: "center",
          duration: 0.35,
          ease: "power1.out",
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      // cleanup listeners when context reverts
      el._cleanup = () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-emerald-600 text-white py-16 px-6 md:px-12 relative"
      id="our-team"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold">Our Team</h2>
        <p className="mt-2 text-lg md:text-xl opacity-90">
          Meet the talented members behind our project
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 items-center">
        {teamMembers.map(({ Icon, name, role }) => (
          <div
            key={name}
            className={`z-3 teammate flex flex-col items-center text-center bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg`}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-400 grid place-items-center text-3xl md:text-4xl mb-4">
              <span className={`teammate-icon inline-grid place-items-center`}>
                <Icon />
              </span>
            </div>

            <h3 className="font-bold text-xl md:text-3xl">{name}</h3>
            <p className="text-lg opacity-90 mt-1">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
