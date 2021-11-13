import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { HOST } from "src/constants/host";

const images = [
  { url: HOST + "/public/slider/s1.jpg" },
  { url: HOST + "/public/slider/s2.jpg" },
  { url: HOST + "/public/slider/s3.jpg" },
  { url: HOST + "/public/slider/s4.jpg" },
  { url: HOST + "/public/slider/s5.jpg" },
];

export default function () {
  const animList = [
    "animate__backInDown",
    "animate__fadeInLeft",
    "animate__fadeInLeft",
  ];
  const positions = [
    { top: 20, left: 20 },
    { top: 20, right: 20 },
    { bottom: 20, right: 20 },
    { bottom: 20, left: 20 },
  ];
  const [animation, setAnimation] = React.useState(animList[0]);
  const [position, setPosition] = React.useState(positions[0]);
  return (
    <div>
      <Slide
        easing="ease"
        indicators={true}
        onChange={() => {
          setAnimation("");
          setAnimation(animList[Math.floor(Math.random() * animList.length)]);
          setPosition(positions[Math.floor(Math.random() * positions.length)]);
        }}
      >
        {images.map((img) => (
          <div key={img.url} className="each-slide">
            <div style={{ backgroundImage: `url(${img.url})` }}>
              {/* {animation && img.caption && (
                <span
                  className={`animate__animated ${animation}`}
                  style={position}
                >
                  {img.caption}
                </span>
              )} */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
