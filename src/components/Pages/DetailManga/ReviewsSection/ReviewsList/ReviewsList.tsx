import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserStateInterface } from "../../../../../store/user";
import ReviewInterface from "../../../../../interfaces/ReviewInterface";

import styles from "./ReviewsList.module.scss";

import Review from "../Review/Review";

const ReviewsList = (props: { reviews: ReviewInterface[]; onUserProfile?: boolean }) => {
  const [reviews, setReviews] = useState<ReviewInterface[]>(props.onUserProfile ? props.reviews : []);
  const userID = useSelector((state: { user: UserStateInterface }) => state.user.userID);

  // filter out userReview from all reviews
  useEffect(() => {
    if (props.onUserProfile) return;

    setReviews(
      props.reviews.filter((r) => {
        const userData = r?.attributes?.users_permissions_user?.data;
        if (userData && r.attributes?.users_permissions_user?.data.id !== userID) return true;
        return false;
      })
    );

    // prevent infinite loop, get user review
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, props.reviews]);

  return (
    <ul className={styles.list}>
      {reviews.map((r) =>
        !props.onUserProfile ? (
          <Review review={r} key={r.id}></Review>
        ) : (
          <Review review={r} key={r.id} hideImage showMangaName></Review>
        )
      )}
    </ul>
  );
};

export default ReviewsList;
