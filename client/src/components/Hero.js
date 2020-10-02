import React from "react";
import image from "../images/contact.jpg";
import { Link } from "react-router-dom";
const Hero = ({ title, img, contain }) => {
  return (
    <div
      className=" flex flex-col justify-end items-center pb-10 bg-fixed "
      style={{
        height: "90vh",
        background: `url(${img}) no-repeat center center/cover`,
      }}
    >
      {title && (
        <h1 className=" text-5xl  text-gray-100 font-bold uppercase">
          {title}
        </h1>
      )}
    </div>
  );
};

Hero.defaultProps = {
  img: image,
};
export default Hero;
