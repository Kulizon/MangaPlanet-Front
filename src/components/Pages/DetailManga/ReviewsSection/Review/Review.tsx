import { useSelector } from "react-redux";
import { API_URL } from "../../../../../utilities/data";
import ReviewInterface from "../../../../../interfaces/ReviewInterface";
import { UserStateInterface } from "../../../../../store/user";
import useFetch from "../../../../../hooks/useFetch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import findBestFormat from "../../../../../utilities/findBestFormat";

import styles from "./Review.module.scss";

import SpinningWheelAndError from "../../../../UI/SpinningWheelAndError/SpinningWheelAndError";
import Button from "../../../../UI/Button/Button";

const Review = (props: { review: ReviewInterface; showMangaName?: boolean; hideImage?: boolean }) => {
  const r = props.review;
  const userID = useSelector((state: { user: UserStateInterface }) => state.user.userID);

  const [loading, error, data, sendRequest] = useFetch();

  const deleteHandler = (e: any) => {
    sendRequest(`${API_URL}/api/reviews/${e.target.value}`, "DELETE");
  };

  // reload to update
  useEffect(() => {
    if (data?.data && !data?.error) window.location.reload();
  }, [loading, data]);

  if (!r) return <></>;

  return (
    <li key={r.id} className={`${styles.review} ${props.hideImage ? styles["hidden-image"] : ""}`}>
      {props.showMangaName && (
        <h3>
          Manga: <Link to={`/manga/${r.attributes.manga.id}`}>{r.attributes.manga.name}</Link>
        </h3>
      )}
      {!props.hideImage && (
        <img
          src={
            API_URL +
            findBestFormat(r?.attributes?.users_permissions_user?.data?.attributes?.image?.data?.attributes?.formats, 3)
              ?.url
          }
          alt="Profile Picutre"
        />
      )}
      {r?.attributes?.users_permissions_user && (
        <Link to={`/user/${r?.attributes?.users_permissions_user?.data?.id}`}>
          <h3>{r?.attributes?.users_permissions_user?.data?.attributes?.username}</h3>
        </Link>
      )}
      <h5>Score: {r?.attributes?.score}</h5>
      <p>{r?.attributes?.review}</p>
      <div className={styles.badge}>
        {r?.attributes?.score > 6 ? (
          <i className={`fa-solid fa-thumbs-up ${styles.positive}`}></i>
        ) : r?.attributes?.score < 4 ? (
          <i className={`fa-solid fa-thumbs-down ${styles.negative}`}></i>
        ) : (
          <i className={`fa-solid fa-clipboard-question ${styles.neutral}`}></i>
        )}
      </div>
      {r?.attributes?.users_permissions_user?.data?.id === userID && (
        <div className={styles["delete-container"]}>
          <Button onClick={deleteHandler} value={r.id}>
            Delete
          </Button>
          <SpinningWheelAndError loading={loading} error={error}></SpinningWheelAndError>
        </div>
      )}
    </li>
  );
};

export default Review;
