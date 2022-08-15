import { API_URL } from "../../../../utilities/data";
import { Link } from "react-router-dom";

import styles from "./VolumeSelection.module.scss";
import { useState } from "react";

const VolumeSelection = (props: { volumes: VolumeProps[]; mangaID: number }) => {
  const { volumes } = props;

  const [chaptersRevealed, setChaptersRevealed] = useState();

  const revealHandler = (e: any) => {
    setChaptersRevealed(e.currentTarget.id);
  };

  return (
    <ul className={styles.volumes}>
      {volumes.map((volume) => {
        return (
          <li key={volume.attributes.number} id={volume.attributes.number.toString()} onClick={revealHandler}>
            <img src={API_URL + volume.attributes.image.data.attributes.formats.small.url} alt="" />
            <h5>{`Volume ${volume.attributes.number}`}</h5>
            <ul
              className={`${styles.chapters}  ${
                chaptersRevealed !== volume.attributes.number.toString() ? styles.hidden : ""
              }`}
            >
              {volume.attributes.chapters.data.map((chapter) => {
                if (chapter.attributes.volume.data.attributes.number === volume.attributes.number)
                  return (
                    <Link to={`/manga/${props.mangaID}/${chapter.id}`} key={chapter.id}>
                      <li>{`Chapter ${chapter.attributes.number}`}</li>
                    </Link>
                  );
                else return <></>;
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

interface VolumeProps {
  id: number;
  attributes: {
    chapters: {
      data: {
        id: number;
        attributes: { name: string; number: number; volume: { data: { attributes: { number: number } } } };
      }[];
    };
    number: number;
    name: string;
    image: {
      data: {
        id: number;
        attributes: {
          formats: { small: { url: string }; medium: { url: string }; thumbnail: { url: string } };
          url: string;
        };
      };
    };
  };
}

export default VolumeSelection;
