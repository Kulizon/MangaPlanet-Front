import { API_URL } from "../../../utilities/data";
import { useParams } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import shuffleArray from "../../../utilities/shuffle";
import changeResponseFormat from "../../../utilities/changeResponseFormat";

import styles from "./UserProfile.module.scss";

import SliderContainer from "../../UI/SliderContainer/SliderContainer";
import MangaInterface from "../../../interfaces/MangaInterface";
import ReviewsList from "../DetailManga/ReviewsSection/ReviewsList/ReviewsList";
import ReviewInterface from "../../../interfaces/ReviewInterface";
import Display from "../../UI/Display/Display";
import UserInfo from "./UserInfo/UserInfo";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

const UserProfile = () => {
  const { id } = useParams();
  const [loading, error, data, getData] = useFetch();

  const [display, setDisplay] = useState<{ content: any[]; type: "MANGAS" | "REVIEWS"; title: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [display]);

  useEffect(() => {
    const favouriteUrl = `?populate[favouriteMangas][populate][image][populate]&populate[favouriteMangas][populate][reviews][populate]`;
    const finishedUrl = `&populate[finishedMangas][populate][image][populate]&populate[finishedMangas][populate][reviews][populate]`;
    const readlistUrl = `&populate[readlistMangas][populate][image][populate]&populate[readlistMangas][populate][reviews][populate]`;

    const reviewsUrl = `&populate[reviews][populate][manga][populate]`;
    getData(
      `${API_URL}/api/users/${id}${favouriteUrl}${finishedUrl}${readlistUrl}${reviewsUrl}&populate[image][populate]&populate[backgroundImage][populate]`
    );
  }, [getData, id]);

  if (loading || error || !data)
    return (
      <main>
        <SpinningWheelAndError loading={loading} error={error} className={styles.center}></SpinningWheelAndError>
      </main>
    );

  const favouriteMangas: MangaInterface[] = changeResponseFormat(data.favouriteMangas);
  const finishedMangas: MangaInterface[] = changeResponseFormat(data.finishedMangas);
  const readlistMangas: MangaInterface[] = changeResponseFormat(data.readlistMangas);

  const reviews: ReviewInterface[] = shuffleArray(data.reviews)
    .slice(0, 5)
    .map((r: any) => {
      return { id: r.id, attributes: { ...r } };
    });

    // set display to see every liked/finished/readlist manga or review
  if (display)
    return (
      <main>
        <Display
          content={
            display.type === "MANGAS"
              ? changeResponseFormat(display.content)
              : display.content.map((el) => {
                  return { id: el.id, attributes: { ...el } };
                })
          }
          type={display.type}
          title={display.title}
          onReturnButtonClick={() => setDisplay(undefined)}
        ></Display>
      </main>
    );

  return (
    <main >
      <UserInfo
        userData={data}
        favouriteMangas={favouriteMangas}
        finishedMangas={finishedMangas}
        reviews={reviews}
      ></UserInfo>
      {reviews?.length > 0 && (
        <div className={styles["reviews-container"]}>
          <h2
            onClick={() => setDisplay({ content: data.reviews, type: "REVIEWS", title: `${data.username}'s reviews` })}
          >
            Reviews
          </h2>
          <ReviewsList reviews={reviews} onUserProfile></ReviewsList>
        </div>
      )}
      <SliderContainer
        title="Favourite Mangas"
        onTitleClick={() =>
          setDisplay({ content: data.favouriteMangas, type: "MANGAS", title: `${data.username}'s favourite mangas` })
        }
        content={favouriteMangas}
      ></SliderContainer>
      <SliderContainer
        title="Finished Mangas"
        onTitleClick={() =>
          setDisplay({ content: data.finishedMangas, type: "MANGAS", title: `${data.username}'s finished mangas` })
        }
        content={finishedMangas}
      ></SliderContainer>
      <SliderContainer
        title="Readlist Mangas"
        onTitleClick={() =>
          setDisplay({ content: data.readlistMangas, type: "MANGAS", title: `${data.username}'s readlist` })
        }
        content={readlistMangas}
      ></SliderContainer>
    </main>
  );
};

export default UserProfile;
