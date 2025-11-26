import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Card({ images, title, description, link }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      xPercent: -100 * index,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [index]);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const goTo = (i) => setIndex(i);

  return (
    <div className="card bg-base-100 w-full h-full shadow-lg border border-base-300 ">
      <div className="w-full relative overflow-hidden rounded-t-lg h-full">
        <div
          ref={trackRef}
          className="w-full h-full flex will-change-transform "
        >
          {images.map((src, i) => (
            <img
              src={src}
              alt={`slide-${i + 1}`}
              className="w-full shrink-0 object-cover"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          ))}
        </div>

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle bg-white/90 shadow z-10"
        >
          <FaChevronLeft size={18} />
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle bg-white/90 shadow z-10"
        >
          <FaChevronRight size={18} />
        </button>

        <div className="absolute w-full bottom-3 flex justify-center gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-emerald-500 scale-110" : "bg-gray-300/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-title text-2xl text-emerald-500">{title}</h2>
        <p className="desc mt-2">{description}</p>
        <div className="card-actions justify-end">
          <a href={link} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
