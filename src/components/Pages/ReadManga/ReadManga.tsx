import { useEffect, useState } from "react";
import { useParams, Navigate, useLocation, useNavigate } from "react-router";
import { API_URL } from "../../../utilities/data";
import useFetch from "../../../hooks/useFetch";
import PanelsInterface from "../../../interfaces/PanelsInterface";

import CommentsSection from "./CommentsSection/CommentsSection";
import PanelsList from "./PanelsList/PanelsList";
import Button from "../../UI/Button/Button";
import IconButton from "../../UI/IconButton/IconButton";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

import styles from "./ReadManga.module.scss";

const ReadManga = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { chapterID, id: mangaID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, error, receivedData, getData] = useFetch();
  const [loadingNext, errorNext, receivedNextData, getNextData] = useFetch();

  const [zoom, setZoom] = useState(60);
  const [isTwoColumn, setIsTwoColumn] = useState(false);
  const [format, setFormat] = useState<"large" | "medium" | "small" | "thumbnail">("large");

  useEffect(() => {
    const panelsUrl = "?populate[panels][populate]&populate[manga][populate]";
    getData(`${API_URL}/api/chapters/${chapterID}${panelsUrl}`);
  }, [getData, chapterID]);

  useEffect(() => {
    if (receivedNextData?.data[0]) navigate(`/manga/${mangaID}/${receivedNextData.data[0].id}`);
  }, [mangaID, receivedNextData, navigate]);

  const data = receivedData?.data;
  const panels: PanelsInterface[] = data?.attributes?.panels?.data;

  const changeQualityHandler = (e: any) => {
    setFormat(e.target.value);
  };

  const changeGridHandler = (e: any) => {
    setIsTwoColumn((prevState) => !prevState);
  };

  const smallerZoomHandler = () => {
    setZoom((prevZoom) => (prevZoom > 30 ? prevZoom - 10 : prevZoom));
  };

  const biggerZoomHandler = () => {
    setZoom((prevZoom) => (prevZoom <= 90 ? prevZoom + 10 : prevZoom));
  };

  // get the id of the next chapter based on mangaID and chapterNum
  const prevChapterHandler = () => {
    getNextData(
      `${API_URL}/api/chapters?filters[manga][id][$eq]=${mangaID}&filters[number][$eq]=${
        parseInt(data.attributes.number) - 1
      }`
    );
  };

  // get the id of the prev chapter based on mangaID and chapterNum
  const nextChapterHandler = () => {
    getNextData(
      `${API_URL}/api/chapters?filters[manga][id][$eq]=${mangaID}&filters[number][$eq]=${
        parseInt(data.attributes.number) + 1
      }`
    );
  };

  return (
    <main className={styles.main}>
      {loading || error || !receivedData || loadingNext || errorNext ? (
        <SpinningWheelAndError
          loading={loading || loadingNext}
          error={error ? error : errorNext}
          className={styles.center}
        ></SpinningWheelAndError>
      ) : (
        <>
          <div className={styles.controls}>
            <div className={styles["chapter-controls"]}>
              <Button onClick={prevChapterHandler}>Prev</Button>
              <h1>Chapter: {data.attributes.number}</h1>
              <Button onClick={nextChapterHandler}>Next</Button>
            </div>
            <div className={styles["left-controls"]}>
              <div className={styles["quality-controls"]}>
                <h5>Quality</h5>
                <select name="quality" onChange={changeQualityHandler}>
                  <option value="large">High</option>
                  <option value="medium">Medium</option>
                  <option value="small">Low</option>
                  <option value="thumbnail">Very low</option>
                </select>
              </div>
              <IconButton onClick={changeGridHandler}>
                {!isTwoColumn ? (
                  <i className="fa-solid fa-grip-vertical"></i>
                ) : (
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                )}
              </IconButton>
            </div>
            <div className={styles["zoom-controls"]}>
              <IconButton onClick={smallerZoomHandler}>
                <i className="fa-solid fa-magnifying-glass-minus"></i>
              </IconButton>
              <IconButton onClick={biggerZoomHandler}>
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </IconButton>
            </div>
          </div>
          <PanelsList panels={panels} zoom={zoom} isTwoColumn={isTwoColumn} format={format}></PanelsList>
          <CommentsSection></CommentsSection>
        </>
      )}
    </main>
  );
};

export default ReadManga;
