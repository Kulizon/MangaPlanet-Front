import { Link } from "react-router-dom";
import { API_URL } from "../../../utilities/data";
import MangaInterface from "../../../interfaces/MangaInterface";

import styles from "./Card.module.scss";

import RateScore from "../../Pages/DetailManga/MangaInfo/RateScore/RateScore";

const Card = (props: { manga: MangaInterface; notListItem?: boolean }) => {
  const m = { ...props.manga.attributes };
  const id = props.manga.id;

  const scores = m.reviews.data.map((r) => r.attributes.score);
  const score = scores.reduce((a, b) => a + b) / scores.length;

  const content = (
    <>
      <Link to={`/manga/${id}`}>
        <img src={API_URL + m.image.data.attributes.formats.small.url} alt="Manga Cover" />
      </Link>

      <div>
        <Link to={`/manga/${id}`}>
          <h4>{m.name}</h4>
        </Link>
        <div>
          <RateScore score={score} className={styles.stars}></RateScore>
          <h5>{m.genre}</h5>
        </div>
      </div>
    </>
  );

  return !props.notListItem ? <li className={styles.card}>{content}</li> : <div className={styles.card}>{content}</div>;
};
export default Card;
