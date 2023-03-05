import React from "react";
import "./Header.css";
import nasaLogo from "../../assets/nasa.svg";

export default function Header() {
  return (
    <div className="header bg-accent text-black m-0 px-4 pt-2 flex justify-between items-center md:px-12 md:pt-8">
      <div className="header__left">
        <div className="header__logo">
          <img
          className="header__logo-img h-1/6 max-h-[50px]"
          src={nasaLogo} alt="Nasa logo" />
        </div>
        <div className="header__title my-2 text-sm md:text-lg font-semibold font-sans">
          <h1>{"Abhishek"}</h1>
        </div>
      </div>
      <div className="header__right">
        <div className="header__text font-sans text-md md:text-xl font-bold">
          <p>Astronomy Picture of the day</p>
        </div>
      </div>
    </div>
  );
}
