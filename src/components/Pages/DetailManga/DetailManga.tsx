import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router";
import MangaInterface from "../../../interfaces/MangaInterface";
import { API_URL } from "../../../utilities/data";
import { useEffect } from "react";

import styles from "./DetailManga.module.scss";

import MangaInfo from "./MangaInfo/MangaInfo";
import VolumeSelection from "./VolumeSelection/VolumeSelection";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

const DetailManga = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const volumesUrl = "?populate[volumes][populate][image][populate]";
  const authorsUrl = "&populate[author][populate]";
  const mangaImageUrl = "&populate[image][populate]";
  const volumeChapterUrl = "&populate[volumes][populate][chapters][populate][volume][populate]";
  const statictisUrl = "&populate[finishedBy][populate]&populate[favouriteBy][populate]&populate[readlistBy][populate]";

  const [loading, error, data, sendRequest] = useFetch();

  useEffect(() => {
    sendRequest(
      `${API_URL}/api/mangas/${id}/${volumesUrl}${authorsUrl}${mangaImageUrl}${volumeChapterUrl}${statictisUrl}`
    );
  }, [sendRequest, id]);

  if (loading || error || !data)
    return (
      <main>
        <SpinningWheelAndError loading={loading} error={error}></SpinningWheelAndError>
      </main>
    );

  const manga: MangaInterface = data.data;
  const mangaInfo = manga.attributes;
  const volumes = manga.attributes.volumes.data;

  const statistics = {
    readlistBy: manga.attributes.readlistBy.data,
    finishedBy: manga.attributes.finishedBy.data,
    favouriteBy: manga.attributes.favouriteBy.data,
  };

  return (
    <main className={styles["detail-manga"]}>
      <MangaInfo mangaInfo={mangaInfo} statistics={statistics} mangaID={manga.id}></MangaInfo>
      <VolumeSelection volumes={volumes} mangaID={manga.id}></VolumeSelection>
      <ReviewsSection mangaID={manga.id}></ReviewsSection>
    </main>
  );
};

export default DetailManga;
