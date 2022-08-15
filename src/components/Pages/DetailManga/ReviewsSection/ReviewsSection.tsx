import { FormEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserStateInterface } from "../../../../store/user";
import { API_URL } from "../../../../utilities/data";
import useFetch from "../../../../hooks/useFetch";
import ReviewsInterface from "../../../../interfaces/ReviewInterface";

import styles from "./ReviewsSection.module.scss";

import ReviewsList from "./ReviewsList/ReviewsList";
import PaginationControls from "../../../UI/PaginationControls/PaginationControls";
import Textarea from "./../../../UI/Forms/Textarea/Textarea";
import NumberInput from "../../../UI/Forms/NumberInput/NumberInput";
import Button from "../../../UI/Button/Button";
import Review from "./Review/Review";

import SpinningWheelAndError from "../../../UI/SpinningWheelAndError/SpinningWheelAndError";

const ReviewsSection = (props: { mangaID: number }) => {
  const { mangaID } = props;
  const { userID } = useSelector((state: { user: UserStateInterface }) => state.user);

  const [loadingUserReview, errorUserReview, userReview, sendUserReviewRequest] = useFetch();
  const [loading, error, data, sendRequest] = useFetch();
  const [loadingReviews, errorReviews, dataReviews, sendRequestReviews] = useFetch();

  const [reviews, setReviews] = useState<ReviewsInterface[]>([]);

  const PAGE_LIMIT = 3;
  const [page, setPage] = useState(0);
  const changePageHandler = (p: number) => setPage(p);

  // get new reviews everytime page variable changes
  useEffect(() => {
    const populateUrl = "&populate[users_permissions_user][populate][image][populate]";
    const paginationUrl = `&pagination[start]=${PAGE_LIMIT * page}&pagination[limit]=${PAGE_LIMIT}`;

    sendRequestReviews(`${API_URL}/api/reviews?filters[manga][id][$eq]=${mangaID}${populateUrl}${paginationUrl}`);

    // get userReview only if it doesn't already exist
    if (!userReview?.data)
      sendUserReviewRequest(
        `${API_URL}/api/reviews?filters[manga][id][$eq]=${mangaID}&filters[users_permissions_user][id][$eq]=${userID}${populateUrl}${paginationUrl}`,
        "GET"
      );
  }, [mangaID, sendRequestReviews, page, sendUserReviewRequest, userID, userReview?.data]);

  useEffect(() => {
    if (dataReviews) setReviews(dataReviews.data);
  }, [dataReviews]);

  // post review handler
  const submitHandler: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();
    const review = e.target[0].value;
    const score = e.target[2].value;

    if (!e.target[0].value || !e.target[2].value) return;

    if (!userID) {
      alert("Login!");
      return;
    }

    // update when userReview already exists
    if (userReview?.data.length > 0) {
      sendRequest(`${API_URL}/api/reviews/${userReview?.data[0].id}`, "PUT", {
        body: JSON.stringify({
          data: { review, score: parseInt(score), manga: [mangaID], users_permissions_user: [userID] },
        }),
      });
    }

    // post when userReview doesn't already exist
    if (userReview && userReview?.data.length === 0 && !userReview.error) {
      sendRequest(`${API_URL}/api/reviews`, "POST", {
        body: JSON.stringify({
          data: { review, score: parseInt(score), manga: [mangaID], users_permissions_user: [userID] },
        }),
      });
    }
  };

  // reload to update
  useEffect(() => {
    if (data?.data && !data?.error) window.location.reload();
  }, [loading, data]);

  return (
    <div className={styles["reviews-section"]}>
      <PaginationControls
        pageLimit={PAGE_LIMIT}
        contentLength={reviews.length}
        onChangePage={changePageHandler}
        className={styles.controls}
      ></PaginationControls>
      <div className={styles["reviews-container"]}>
        <form onSubmit={submitHandler} className={styles["form"]}>
          <h2>Share your thoughts</h2>
          <Textarea rows={8}></Textarea>
          <div>
            <Button>Submit</Button>
            <NumberInput min={1} max={10}></NumberInput>
          </div>
        </form>
        {userReview?.data[0] ? (
          <>
            <div className={styles["user-review"]}>
              <h2>Your review </h2>
              <Review review={userReview?.data[0]}></Review>
            </div>
          </>
        ) : (
          <div className={styles["write-review"]}>
            <h2>Write a review!</h2>
            <p>Share your thoughts with other users...</p>
          </div>
        )}
        <SpinningWheelAndError
          loading={loading || loadingUserReview}
          error={error ? error : errorUserReview}
          className={styles["form-wheel"]}
        ></SpinningWheelAndError>
      </div>
      {loadingReviews || errorReviews ? (
        <SpinningWheelAndError loading={loadingReviews} error={errorReviews}></SpinningWheelAndError>
      ) : (
        <ReviewsList reviews={reviews}></ReviewsList>
      )}
    </div>
  );
};

export default ReviewsSection;
