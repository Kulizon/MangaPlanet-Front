import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router";
import { FormEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../utilities/data";
import { UserStateInterface } from "../../../../store/user";
import CommentInterface from "../../../../interfaces/CommentInterface";

import styles from "./CommentsSection.module.scss";

import Comment from "../Comment/Comment";
import PaginationControls from "./../../../UI/PaginationControls/PaginationControls";
import Textarea from "../../../UI/Forms/Textarea/Textarea";
import Button from "../../../UI/Button/Button";
import SpinningWheelAndError from "../../../UI/SpinningWheelAndError/SpinningWheelAndError";

const CommentsSection = () => {
  const userID = useSelector((state: { user: UserStateInterface }) => state.user.userID);
  const { chapterID } = useParams();
  const [loading, error, data, sendRequest] = useFetch();
  const [loadingComments, errorComments, dataComments, sendCommentsRequest] = useFetch();

  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [page, setPage] = useState(0);
  const PAGE_LIMIT = 5;

  const changePageHandler = (p: number) => setPage(p);

  // get chapter comments
  useEffect(() => {
    const populateUrl = `&populate[users_permissions_user][populate][image][populate]`;
    const paginationUrl = `&pagination[start]=${PAGE_LIMIT * page}&pagination[limit]=${PAGE_LIMIT}`;

    sendCommentsRequest(
      `${API_URL}/api/comments?filters[chapter][id][$eq]=${chapterID}${populateUrl}${paginationUrl}&sort=createdAt:desc`
    );
  }, [sendCommentsRequest, chapterID, page]);
  useEffect(() => {
    if (dataComments) setComments(dataComments.data);
  }, [dataComments]);

  // add new comment
  const submitHandler: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();
    if (!e.target[0].value.length) return;
    if (!userID) {
      alert("Login!");
      return;
    }

    sendRequest(`${API_URL}/api/comments`, "POST", {
      body: JSON.stringify({
        data: { comment: e.target[0].value, chapter: [chapterID], users_permissions_user: [userID] },
      }),
    });
  };

  const deleteHandler = (e: any) => {
    sendRequest(`${API_URL}/api/comments/${e.target.value}`, "DELETE");
  };

  const doneHandler = (e: any) => {
    e.preventDefault();
    const editedComment = e.target[0].value;
    const commentID = e.target[1].value;

    sendRequest(`${API_URL}/api/comments/${commentID}`, "PUT", {
      body: JSON.stringify({
        data: { comment: editedComment, chapter: [chapterID], users_permissions_user: [userID] },
      }),
    });
  };

  // reload to update
  useEffect(() => {
    if (data && data.data && !data.error) window.location.reload();
  }, [data, loading]);

  return (
    <div className={styles["comments-section"]}>
      <form onSubmit={submitHandler}>
        <h2>Share your thoughts</h2>
        <Textarea rows={6}></Textarea>
        <Button>Submit</Button>
        <SpinningWheelAndError
          loading={loading || loadingComments}
          error={error ? error : errorComments}
          className={styles.wheel}
        ></SpinningWheelAndError>
      </form>
      <PaginationControls
        pageLimit={PAGE_LIMIT}
        contentLength={comments.length}
        onChangePage={changePageHandler}
        className={styles.controls}
      ></PaginationControls>
      <ul>
        {comments.map((c: CommentInterface) => (
          <Comment key={c.id} comment={c} doneHandler={doneHandler} deleteHandler={deleteHandler}></Comment>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
