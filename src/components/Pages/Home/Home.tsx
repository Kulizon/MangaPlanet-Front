import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { API_URL } from "../../../utilities/data";

import styles from "./Home.module.scss";

import SliderContainerHomeWrapper from "./SliderContainerHomeWrapper/SliderContainerHomeWrapper";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mangaImageUrl = "?populate[image][populate]";
  const mangaReviewsUrl = "&populate[reviews][populate]";

  const PAGINATION_LIMIT = 5;
  const [loading, error, data, sendRequest] = useFetch();

  useEffect(() => {
    sendRequest(`${API_URL}/api/mangas/count`);
  }, [sendRequest]);

  if (loading || error || !data)
    return (
      <main>
        <SpinningWheelAndError loading={loading} error={error}></SpinningWheelAndError>
      </main>
    );

  return (
    <main className={styles.home}>
      <SliderContainerHomeWrapper
        link={`${API_URL}/api/mangas${mangaImageUrl}${mangaReviewsUrl}&pagination[start]=${Math.floor(
          Math.random() * data
        )}&pagination[limit]=${PAGINATION_LIMIT}`}
        title="Our Today's Selection"
        shuffle
      ></SliderContainerHomeWrapper>
      <SliderContainerHomeWrapper
        link={`${API_URL}/api/mangas${mangaImageUrl}${mangaReviewsUrl}&sort=createdAt:desc&pagination[limit]=${PAGINATION_LIMIT}`}
        title="Recently Added Manga"
      ></SliderContainerHomeWrapper>
      <SliderContainerHomeWrapper
        link={`${API_URL}/api/mangas${mangaImageUrl}${mangaReviewsUrl}&sort=updatedAt:desc&pagination[limit]=${PAGINATION_LIMIT}`}
        title="Recently Updated Chapters"
      ></SliderContainerHomeWrapper>
    </main>
  );
};

export default Home;
