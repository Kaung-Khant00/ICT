import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    chapter: "7.2",
    title: "AIR POLLUTION AND POLLUTANTS",
    desc: "Types and sources of air pollutants — particulate matter, gases, indoor & outdoor sources.",
  },
  {
    chapter: "7.3",
    title: "CONSEQUENCES OF AIR POLLUTION",
    desc: "Health, environment, and economic impacts — acid rain, respiratory diseases, reduced visibility.",
  },
];

const TodaysTopic = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from(".fade-in ", {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    // subtle floating accent (loop)
    gsap.to("#accent-shape", {
      y: -40,
      rotation: 6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-white/95 dark:bg-emerald-900 text-gray-900 dark:text-white py-16 px-6 md:px-12"
      id="todays-topic"
    >
      {/* Accent — solid shape (projector-friendly) */}
      <div
        id="accent-shape"
        className="absolute -top-6 w-36 h-36 bg-emerald-600 rounded-2xl z-2 shadow-lg "
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="text-center md:text-left mb-8">
          <h2
            id="todays-topic-heading"
            className="fade-in inline-flex items-center gap-3 text-3xl md:text-4xl font-extrabold"
          >
            <span>Today's Topic</span>
          </h2>
          <p className=" fade-in mt-3 text-gray-600 dark:text-emerald-200">
            In this lesson we will cover the following from{" "}
            <b>grade (11) chemistry.</b>
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch pt-4 ">
          {topics.map((t, i) => (
            <a href="#topic1">
              <article
                key={i}
                className="z-3 backdrop-blur-3xl fade-in relative w-full group bg-emerald-50 dark:bg-emerald-700/30 border border-emerald-100 dark:border-emerald-600 rounded-lg p-5 md:p-6 shadow-sm hover:shadow-lg transform transition will-change-transform hover:-translate-y-2! hover:scale-105!"
              >
                <div className="flex justify-start flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <div className=" w-14 h-14 rounded-md bg-emerald-600 text-white grid place-items-center font-bold text-2xl">
                      {t.chapter}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                      {t.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-emerald-100">
                    {t.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-3 justify-end">
                    <button className="group text-emerald-700 dark:text-white font-semibold text-sm inline-flex items-center gap-2">
                      <div className="group-hover:underline">Read more</div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaysTopic;
