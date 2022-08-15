import styles from "./IconButton.module.scss";

const IconButton = (props: { children: any; onClick?: (e: any) => void; className?: string }) => {
  return (
    <button className={`${styles.button} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default IconButton;
