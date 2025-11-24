import { useState, useEffect } from "react";
import "./AboutDynamic.css";

function AboutDynamic() {
  const messages = [
    "'This platform helps citizens report civic issues like broken roads, water supply, waste management, broken street,and track their resolution by local authorities'",
    "'Users can submit complaints with location details and images to help local authorities take prompt action.'",
    "'By connecting people with their local government, we make civic participation easy and effective.Together, we’re working to build cleaner, safer, and more responsive cities'",
    "'Easily report problems like potholes, waste, and water issues—get updates in real time.'",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((pre) => (pre + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="about-dyn">
      <p>{messages[index]}</p>
    </div>
  );
}

export default AboutDynamic;
