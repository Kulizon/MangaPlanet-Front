import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserStateInterface } from "../../store/user";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { useState } from "react";

import styles from "./Header.module.scss";

import SearchBox from "./SearchBox/SearchBox";
import IconButton from "../UI/IconButton/IconButton";

import GlobeIcon from "./../../assets/GlobeIcon";

const Header = () => {
  const user = useSelector((state: { user: UserStateInterface }) => state.user);
  const dispatch = useDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  const showHandler = () => {
    setIsDropdownVisible(true);
  };

  const hideHandler = () => {
    setIsDropdownVisible(false);
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.logo}>
          <h1>MangaPlanet</h1>
          <GlobeIcon></GlobeIcon>
        </Link>
        <div className={styles["mobile-menu"]}>
          <IconButton onClick={() => setShowMobileMenu((prevState) => !prevState)} className="rectangle">
            <i className="fa-solid fa-bars"></i>
          </IconButton>
          <div
            className={`backdrop ${showMobileMenu ? "backdrop-visible" : ""}`}
            onClick={() => setShowMobileMenu((prevState) => !prevState)}
          ></div>
          <div className={showMobileMenu ? styles["menu-visible"] : ""}>
            <SearchBox></SearchBox>
            <ul className={styles.menu}>
              {user.userID ? (
                <>
                  <li>
                    <Link to={`/user/${user.userID}`} className={styles.featured}>
                      <i className="fa-solid fa-user"></i>
                      {user.username}
                    </Link>
                  </li>
                  <li>
                    <Link to="/readlist">
                      <i className="fa-solid fa-list-check"></i>Readlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/options">
                      <i className="fa-solid fa-gears"></i>Options
                    </Link>
                  </li>

                  <li>
                    <button onClick={logoutHandler}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register">
                      <i className="fa-solid fa-user-plus"></i>Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <i className="fa-solid fa-user-check"></i>Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className={styles["desktop-menu"]}>
          <SearchBox></SearchBox>
          <Link to="/">Home</Link>
          <div className={styles["main-button-container"]} onMouseLeave={hideHandler}>
            {user.userID ? (
              <Link to={`/user/${user.userID}`} className={styles.featured} onMouseOver={showHandler}>
                <i className="fa-solid fa-user"></i>
                {user.username}
              </Link>
            ) : (
              <Link to="/login" className={styles.featured} onMouseOver={showHandler}>
                Login
              </Link>
            )}
            <div className={`${styles.menu} ${isDropdownVisible ? styles.visible : ""}`} onMouseOver={showHandler}>
              <ul onMouseOver={showHandler}>
                {user.userID ? (
                  <>
                    <li>
                      <Link to="/readlist">
                        <i className="fa-solid fa-list-check"></i>Readlist
                      </Link>
                    </li>
                    <li>
                      <Link to="/options">
                        <i className="fa-solid fa-gears"></i>Options
                      </Link>
                    </li>
                    <li onClick={logoutHandler}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/register">
                        <i className="fa-solid fa-user-plus"></i>Register
                      </Link>
                    </li>
                    <li>
                      <Link to="/login">
                        <i className="fa-solid fa-user-check"></i>Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
