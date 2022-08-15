import styles from "./NumberInput.module.scss";

const NumberInput = (props: { defaultValue?: any; onChange?: (e: any) => void; min?: number; max?: number }) => {
  return <input type="number" min={props.min} max={props.max} onChange={props.onChange} className={styles.input} />;
};

export default NumberInput;
