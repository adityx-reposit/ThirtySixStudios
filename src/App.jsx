import React, { useEffect } from "react";
import "./index.css";
import Canvas from "./canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";

function App() {
useEffect(() => {
  const scrollContainer = document.querySelector(".scroll-container");
  const locomotiveScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
  });

  return () => {
    locomotiveScroll.destroy();
  };
}, []);

  return (
    <>
      <div className="relative w-full h-screen text-black scroll-container">
       
        {data.map((item, index) => (
          <div key={index}>
            {data[0].map((canvasDetails, canvasIndex) => (
              <Canvas key={canvasIndex} details={canvasDetails} />
            ))}
            <div className="w-20  min-h-screen">
              <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-transparent">
                <div className="text-md font-regular">ThirtySixStudios</div>
                <div className="flex gap-10">
                  {["Home", "About", "Services", "Contact"].map((link, index) => (
                    <a key={index} href={`#${link.toLowerCase()}`} className="hover:underline">
                      {link}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        ))}
      </div>
     
    
    </>
  );
}

export default App;
