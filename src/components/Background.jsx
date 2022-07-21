import React from "react";

export default function BackgroundVideo() {
  return (
    <div>
      <video
        loop
        autoPlay
        muted
        id="bg-video"
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="/videos/Bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
