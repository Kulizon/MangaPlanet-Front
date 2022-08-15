import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const Button = (props: {
  children: any;
  onClick?: (e: any) => void;
  alt?: boolean;
  className?: string;
  to?: string;
  value?: any;
  icon?: string;
}) => {
  const Content = (
    <button
      value={props.value}
      onClick={props.onClick}
      className={`${styles.button} ${props.alt ? styles.alt : ""} ${props.className}`}
    >
      {props.icon && <i className={props.icon}></i>}
      {props.children}
    </button>
  );

  return props.to ? <Link to={props.to}>{Content}</Link> : <>{Content}</>;
};

export default Button;
