import React, { Fragment } from "react";
// import headerImage from "../../assets/meals.jpg";
import headerImage2 from "../../assets/meals_3.jpg";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
//import CartProvider from "../../store/CartProvider";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Zomato</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={headerImage2} alt="A delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
