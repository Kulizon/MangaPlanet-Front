import { MutableRefObject } from "react";
import styles from "./Input.module.scss";

type TextInputTypes = "text" | "email" | "password";

const Input = (props: {
  type?: TextInputTypes;
  onChange?: (e: any) => void;
  placeholder?: string;
  className?: string;
  inputRef?: MutableRefObject<any>;
}) => {
  return (
    <input
      type={props.type}
      className={`${styles.input} ${props.className}`}
      placeholder={props.placeholder}
      onChange={props.onChange}
      ref={props.inputRef}
    />
  );
};

export default Input;
