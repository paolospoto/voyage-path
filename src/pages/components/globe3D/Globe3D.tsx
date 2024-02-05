"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const Globe3D = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return (
    <>
      {children}
      <Globe
        atmosphereAltitude={0.15}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0, 0, 0, 0)"
      />
    </>
  );
};

export default Globe3D;
