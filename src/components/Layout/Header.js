import React, { Fragment } from "react";

import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCardButton />
      </header>
      {/* here the array method is used as the class name has a 
      dash inside of it */}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table of Food" />
      </div>
    </Fragment>
  );
};

export default Header;
