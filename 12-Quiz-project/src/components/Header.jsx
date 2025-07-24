import React from "react";
import HeaderImg from "../assets/quiz-logo.png";
const Header = () => {
  return (
    <header>
      <img src={HeaderImg} alt="" />
      <h1>React Quiz</h1>
    </header>
  );
};

export default Header;
