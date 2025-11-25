// AirPollutants.jsx
import React, { useState, useRef } from "react";

import VolcanicEruptionImage from "../assets/images/volcanicEruption.jpg";
import WildFire from "../assets/images/wildFire.jpg";
import Image from "../assets/images/Fire.png";
import DustStorm from "../assets/images/dustStorm.webp";
import Ozone from "../assets/images/ozone.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const images = [
  {
    id: "volcano",
    src: VolcanicEruptionImage,
    alt: "Volcanic eruption",
    text: "Volcanic eruptions releasing ash and harmful gases into the air",
    bgColor: "#020C24",
    className: "w-[300px] absolute left-1/2 -translate-x-1/2 z-50 hover-image ",
  },
  {
    id: "image-1",
    src: Image,
    alt: "Example 1",
    bgColor: "#4A84AB",
    text: "Power Plants burning fossil fuels releasing pollutants",
    className:
      "w-[400px] absolute left-[66%] -translate-x-1/2 -translate-y-1/2 z-40 hover-image",
  },
  {
    id: "wildfire",
    src: WildFire,
    alt: "Wildfire",
    bgColor: "#934224",
    text: "Forest fires producing smoke and carbon particles",
    className:
      "w-[400px] absolute left-[33%] -translate-x-1/2 -translate-y-1/2 z-30 hover-image",
  },
  {
    id: "dust",
    src: DustStorm,
    alt: "Dust storm",
    bgColor: "#384717",
    text: "Dust storms spreading fine particles across large areas",

    className:
      "w-[350px] absolute left-[33%] -translate-x-1/2 translate-y-[40%] z-20 hover-image",
  },
  {
    id: "ozone",
    src: Ozone,
    alt: "Ozone example",
    bgColor: "#3A3A38",
    text: "Automobile emissions contributing to ground-level ozone formation",
    className:
      "w-[300px] absolute left-[66%] -translate-x-[40%] translate-y-[40%] z-10 hover-image",
  },
];

const AirPollutants = () => {
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    text: "",
    bgColor: "",
  });

  const tooltipRef = useRef(null);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const updateTooltipPosition = (clientX, clientY) => {
    const offset = 12; // offset from cursor
    let desiredX = clientX + offset;
    const desiredY = clientY + offset;

    const tt = tooltipRef.current;
    const ttWidth = tt ? tt.offsetWidth : 180;
    const ttHeight = tt ? tt.offsetHeight : 48;

    let maxX = window.innerWidth - ttWidth - 10;
    const maxY = window.innerHeight - ttHeight - 10;
    if (window.innerWidth - clientX < 250) {
      desiredX -= ttWidth + 2 * offset;
    }

    // Math.max(8, maxX) check the offset 8 px from left and right sides
    // and find minValue between desiredX and Math.max(8, maxX) too see the tooltip in full size
    const x = clamp(desiredX, 8, Math.max(8, maxX));
    const y = clamp(desiredY, 8, Math.max(8, maxY));

    setTooltip((t) => ({ ...t, x, y }));
  };

  const handleMouseEnter = (text, e, bgColor) => {
    setTooltip({ show: true, x: 0, y: 0, text, bgColor });
    updateTooltipPosition(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!tooltip.show) return;
    updateTooltipPosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, show: false }));
  };

  return (
    <section className="section h-screen relative" id="topic1">
      <div className="blurred-circle absolute top-1/5 -translate-x-1/4 left-0 -translate-y-1/2 w-80 h-80 bg-green-400/30 rounded-full blur-3xl z-0"></div>
      <div className="blurred-circle absolute top-4/5 left-1/3 -translate-y-1/2 w-50 h-50 bg-green-400/50 rounded-full blur-3xl z-0"></div>
      <div className="grid grid-cols-2 items-center h-full">
        {/* left side */}
        <div className="p-6">
          <h2 className="text-3xl font-extrabold text-emerald-600 hdh">
            Air Pollution and Pollutants
          </h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90 hdh">
            Even before human beings existed, there were many natural cases of
            air pollution that affected the atmosphere. In addition to these
            natural processes, air pollution has become even worse today because
            of various human activities.
          </p>
        </div>

        {/* right side (images) */}
        <div className="relative w-full h-full flex items-center">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className={`${img.className} cursor-pointer select-none`}
              onMouseEnter={(e) => handleMouseEnter(img.text, e, img.bgColor)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              draggable={false}
            />
          ))}

          {/* Tooltip: fixed so it aligns with viewport coordinates */}
          {tooltip.show && (
            <div
              ref={tooltipRef}
              className="pointer-events-none fixed z-50 bg-black/85 text-white text-sm md:text-base px-3 py-2 rounded-md shadow-lg transition-opacity duration-150"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                maxWidth: 320,
                width: "auto",
                backgroundColor: tooltip.bgColor,
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AirPollutants;
