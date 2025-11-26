import NavBar from "./Components/NavBar/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import OurTeam from "./sections/OurTeam.jsx";
import School from "./sections/School.jsx";
import TodaysTopic from "./sections/TodaysTopic.jsx";
import AirPollutants from "./sections/AirPollutants.jsx";
import FourSources from "./sections/FourSources.jsx";

import { useEffect, useState } from "react";
import gsap from "gsap";
import CircleDot from "./Components/Spec/CircleDot.jsx";
import FourSourcesExamples from "./sections/FourSourcesExamples.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      gsap.to("#loader", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setLoading(false),
      });
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <div className="overflow-x-clip">
      {loading && (
        <div
          id="loader"
          className="fixed inset-0 bg-emerald-600 flex items-center justify-center z-50"
        >
          <div className="text-white text-3xl font-bold animate-pulse">
            Loading...
          </div>
        </div>
      )}
      <CircleDot />
      {/* Main Content */}
      {!loading && (
        <>
          <NavBar />
          <Hero />
          <School />
          <TodaysTopic />
          <OurTeam />
          <AirPollutants />
          <FourSources />
          <FourSourcesExamples />
        </>
      )}
    </div>
  );
}

export default App;
