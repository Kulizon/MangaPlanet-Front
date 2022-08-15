import CommentInterface from "../../../../interfaces/CommentInterface";
import { API_URL } from "../../../../utilities/data";
import { useSelector } from "react-redux";
import { UserStateInterface } from "../../../../store/user";
import { useState } from "react";
import { Link } from "react-router-dom";
import findBestFormat from "../../../../utilities/findBestFormat";

import styles from "./Comment.module.scss";

import Button from "../../../UI/Button/Button";
import Textarea from "../../../UI/Forms/Textarea/Textarea";

const Comment = (props: {
  comment: CommentInterface;
  doneHandler: (e: any) => void;
  deleteHandler: (e: any) => void;
}) => {
  const c = props.comment;
  const userID = useSelector((state: { user: UserStateInterface }) => state.user.userID);

  const [isEdited, setIsEdited] = useState(false);

  const editHandler = (e: any) => {
    setIsEdited(true);
  };

  const userData = c.attributes.users_permissions_user.data;

  if (!userData) return <></>;

  const cancelHandler = (e: any) => {
    e.preventDefault();
    setIsEdited(false);
  };

  return (
    <li key={c.id} className={styles.comment}>
      <img
        src={API_URL + findBestFormat(userData.attributes?.image?.data?.attributes?.formats, 4).url}
        alt={`Profile ${userData.attributes.username}`}
      />
      <Link to={`/user/${userData.id}`}>
        <h4>{userData.attributes.username}</h4>
      </Link>
      {!isEdited ? (
        <p>{c.attributes.comment}</p>
      ) : (
        <form onSubmit={props.doneHandler}>
          <Textarea defaultValue={c.attributes.comment}></Textarea>
          <div>
            <Button value={c.id} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button value={c.id}>Done</Button>
          </div>
        </form>
      )}
      {userData.id === userID && (
        <div className={styles.buttons}>
          {!isEdited && (
            <Button onClick={editHandler} value={c.id}>
              Edit
            </Button>
          )}
          <Button onClick={props.deleteHandler} value={c.id}>
            Delete
          </Button>
        </div>
      )}
    </li>
  );
};

export default Comment;
