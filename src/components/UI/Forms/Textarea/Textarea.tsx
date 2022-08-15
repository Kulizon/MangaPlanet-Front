import styles from "./Textarea.module.scss";

const Textarea = (props: { rows?: number; placeholder?: string; defaultValue?: any; onChange?: (e: any) => void }) => {
  return (
    <textarea
      className={styles.textarea}
      rows={props.rows}
      spellCheck={false}
      defaultValue={props.defaultValue}
    ></textarea>
  );
};

export default Textarea;
