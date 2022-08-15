import { MARKER_COLORS } from "../../../utilities/data";
import MangaInterface from "../../../interfaces/MangaInterface";

import styles from "./Container.module.scss";

import Card from "../Card/Card";

const Container = (props: {
  onTitleClick?: () => void;
  title: string;
  isSearchPage?: boolean;
  content: MangaInterface[];
}) => {
  const list = props.content;

  if (list.length === 0 && !props.isSearchPage) return <></>;

  return (
    <div className={styles.container}>
      <h2 onClick={props.onTitleClick} className={props.onTitleClick ? styles["hover-effect"] : ""}>
        {props.title}
      </h2>
      {list.length !== 0 && (
        <ul>
          <span style={{ background: MARKER_COLORS[Math.floor(Math.random() * MARKER_COLORS.length)] }}></span>
          <div>
            {list.map((m, i: number) => (
              <Card manga={m} key={m.id}></Card>
            ))}
          </div>
        </ul>
      )}
      {props.isSearchPage && list.length === 0 && <p>No mangas found... Try a different query!</p>}
    </div>
  );
};

export default Container;
