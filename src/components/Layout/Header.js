import classes from "./Header.module.css";
import headerImage from "../../assets/meals_3.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <div>
      <header className={classes.header}>
        <h2>Zomato</h2>
        <HeaderCartButton/>
      </header>
      <div className={classes["main-image"]}>
        <img src={headerImage} alt="A delicious food" />
      </div>
    </div>
  );
};
export default Header;
