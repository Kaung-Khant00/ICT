import React, { useEffect, useRef, useState } from "react";
import FourSourcesImage from "../assets/images/sources_of_airpollution.webp";
import { MdForest } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { GiFactory } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { BiCross } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Card from "../Components/FourSources/Card";
import DustStorm from "../assets/images/FourSourcesExamples/dust_storm.jpg";
import ForestFire from "../assets/images/FourSourcesExamples/forest_fire.jpg";
import Lightning from "../assets/images/FourSourcesExamples/lightning.jpg";
import AreaSources1 from "../assets/images/FourSourcesExamples/area_sources1.jpg";
import AreaSources2 from "../assets/images/FourSourcesExamples/area_sources2.webp";
import AreaSources3 from "../assets/images/FourSourcesExamples/area_sources3.jpg";
import StationarySources1 from "../assets/images/FourSourcesExamples/stationary_sources1.png";
import StationarySources2 from "../assets/images/FourSourcesExamples/stationary_sources2.webp";
import StationarySources3 from "../assets/images/FourSourcesExamples/stationary_sources3.jpg";
import MobileSources1 from "../assets/images/FourSourcesExamples/mobile_sources1.jpg";
import MobileSources2 from "../assets/images/FourSourcesExamples/mobile_sources2.webp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FourSources() {
  const [fsOpen, setFsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && fsOpen) setFsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fsOpen]);

  const openViewer = () => setFsOpen(true);
  const closeViewer = () => setFsOpen(false);

  /* horizontal scrolling animation */
  const races = useRef(null);
  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width:768px)", () => {
      function getScrollAmount() {
        let racesWidth = races.current.offsetWidth;
        return -(racesWidth - innerWidth);
      }
      const tween = gsap.to(races.current, {
        x: getScrollAmount(),
        duration: 5,
        ease: "none",
      });
      ScrollTrigger.create({
        trigger: ".racesWrapper",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
      });
    });
  }, []);
  return (
    <>
      <section
        className="max-h-screen relative z-1 section py-16 bg-linear-to-b from-base-200 to-base-300 flex flex-col md:flex-row gap-40 md:w-[4000px] items-center racesWrapper"
        ref={races}
      >
        <div className="container px-6 md:min-w-[97vw] ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div
              className="fs-image relative rounded-2xl overflow-hidden shadow-xl cursor-zoom-in z-10 "
              onClick={openViewer}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openViewer();
              }}
            >
              <img
                src={FourSourcesImage}
                alt="Illustration showing four sources of air pollution"
                className="w-full h-80 md:h-[420px] object-cover"
              />
              <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/35 to-transparent" />
            </div>

            <div>
              <h2 className="title text-emerald-400 via-purple-400 to-amber-400">
                4 Sources of Air Pollution
              </h2>

              <p className="mt-4 desc max-w-prose">
                Air pollution comes from many activities. We classify the
                primary contributors into four clear categories so you can
                remember and act on them.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 relative">
                {/* Natural */}
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-emerald-200 transition shadow">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shadow">
                    <MdForest className="text-emerald-600" size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Natural Sources
                  </h3>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-200 transition shadow">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center ">
                    <FaCar className="text-purple-600" size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-700">
                    Mobile Sources
                  </h3>
                </div>

                {/* Area */}
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-200 transition shadow">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center ">
                    <PiFarmFill className="text-amber-600" size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-amber-700">
                    Area Sources
                  </h3>
                </div>

                {/* Stationary */}
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-300 transition shadow">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ">
                    <GiFactory className="text-slate-600" size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Stationary Sources
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full grid md:grid-cols-4 md:grid-rows-1 grid-cols-1 grid-rows-4 justify-items-center gap-10 md:flex-1 md:pe-[25vw] relative z-10">
          <Card
            images={[ForestFire, DustStorm, Lightning]}
            title={"Natural Sources"}
            description={
              "Natural sources are pollution that comes from nature itself without human activity. These events release gases or particles into the air, but they are part of Earth’s natural processes."
            }
          />
          <Card
            images={[AreaSources1, AreaSources2, AreaSources3]}
            title={"Area Sources"}
            description={
              "Area sources are small, scattered activities that release pollution over a wide region, like small factories, open waste burning, construction dust, and agricultural fields. Together, they create significant pollution across an area."
            }
          />

          <Card
            images={[
              StationarySources1,
              StationarySources2,
              StationarySources3,
            ]}
            title={"Stationary Sources"}
            description={
              "Stationary sources are fixed places that release pollution, such as factories, power plants, and refineries. They produce pollutants continuously from burning fuel, chemical reactions, or manufacturing processes."
            }
          />

          <Card
            images={[MobileSources1, MobileSources2]}
            title={"Mobile Sources"}
            description={
              "Mobile sources are vehicles like cars, trucks, buses, ships, and airplanes that emit gases and particulate matter. Reducing pollution includes using EVs, public transport, carpooling, walking, or cycling."
            }
          />
        </div>
      </section>

      {fsOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeViewer();
            }}
            aria-label="Close image viewer"
            className="absolute top-6 right-6 rounded-full w-12 h-12 flex items-center justify-center bg-black/40 text-white"
          >
            <IoClose size={30} />
          </button>

          <img
            src={FourSourcesImage}
            alt="Full view"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
