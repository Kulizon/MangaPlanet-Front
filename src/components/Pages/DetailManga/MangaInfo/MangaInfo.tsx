import { API_URL } from "../../../../utilities/data";
import { useState } from "react";

import styles from "./MangaInfo.module.scss";

import AddToContainer from "./AddToContainer/AddToContainer";
import RateScore from "./RateScore/RateScore";
import IconButton from "../../../UI/IconButton/IconButton";

const MangaInfo = (props: {
  mangaInfo: mangaInfoProps;
  statistics: {
    finishedBy: { id: number; attributes: any }[];
    favouriteBy: { id: number; attributes: any }[];
    readlistBy: { id: number; attributes: any }[];
  };
  mangaID: number;
}) => {
  const { mangaInfo } = props;

  const [infoRevealed, setInfoRevealed] = useState(false);

  return (
    <div className={styles.manga}>
      <div className={styles["image-container"]}>
        <img src={`${API_URL}${mangaInfo.image.data.attributes.formats.medium.url}`} alt="None" />
      </div>
      <h2>{mangaInfo.name}</h2>
      <div className={styles["add-to"]}>
        <RateScore></RateScore>
        <div>
          <AddToContainer
            statistics={props.statistics}
            mangaID={props.mangaID}
            action="favouriteBy"
            icon={<i className="fa-solid fa-heart"></i>}
            bubbleText="favourite"
          ></AddToContainer>
          <AddToContainer
            statistics={props.statistics}
            mangaID={props.mangaID}
            action="finishedBy"
            icon={<i className="fa-solid fa-check"></i>}
            bubbleText="finished"
          ></AddToContainer>
          <AddToContainer
            statistics={props.statistics}
            mangaID={props.mangaID}
            action="readlistBy"
            icon={<i className="fa-solid fa-list-check"></i>}
            bubbleText="readlist"
          ></AddToContainer>
        </div>
      </div>
      <p>
        {mangaInfo.description}
        <IconButton
          onClick={() => setInfoRevealed((prevState) => !prevState)}
          className={infoRevealed ? styles.rotate : ""}
        >
          <i className={`fa-solid fa-angle-down`}></i>
        </IconButton>
      </p>
      <div className={`${styles["detailed-info"]} ${!infoRevealed ? styles["hidden"] : ""}`}>
        {mangaInfo?.author?.data?.attributes?.name && <p>Author: {mangaInfo?.author?.data?.attributes?.name}</p>}
        {mangaInfo.published && <p>Published: {mangaInfo.published}</p>}
        {mangaInfo.genre && <p>Genre: {mangaInfo.genre}</p>}
      </div>
    </div>
  );
};

interface mangaInfoProps {
  description: string;
  genre: string;
  name: string;
  published: string;
  author: { data: { attributes: { name: string } } };
  image: {
    data: {
      attributes: {
        formats: { small: { url: string }; medium: { url: string }; thumbnail: { url: string } };
        url: string;
      };
    };
  };
}

export default MangaInfo;
