import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import { UserStateInterface } from "../../../../store/user";
import { API_URL } from "../../../../utilities/data";
import { useParams } from "react-router";

import styles from "./ProfilePicture.module.scss";

import IconButton from "../../../UI/IconButton/IconButton";
import SpinningWheelAndError from "../../../UI/SpinningWheelAndError/SpinningWheelAndError";

const ProfilePicture = (props: { url: string; className?: string; type: "PROFILE" | "BACKGROUND" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [loading, error, data, sendRequest] = useFetch();
  const { userID, jwt } = useSelector((state: { user: UserStateInterface }) => state.user);
  const { id: currentUserID } = useParams();

  // upload image to database
  const submitHandler = (e: any) => {
    e.preventDefault();
    const image = e.target[0].files[0];
    const formData = new FormData();

    if (!userID) return;

    formData.append("files", image);
    formData.append("ref", "api::user.user");
    formData.append("refId", userID.toString());
    formData.append("field", "image");

    sendRequest(`${API_URL}/api/upload`, "POST", {
      body: formData,
      headers: {
        Accept: "application/json, text/plain, multipart/form-data */*",
      },
    });
  };

  // when image is uploaded -> update user
  useEffect(() => {
    if (data && data[0] && data[0].id) {
      sendRequest(`${API_URL}/api/users/${userID}`, "PUT", {
        body: JSON.stringify(
          props.type === "PROFILE"
            ? {
                image: [data[0].id],
              }
            : {
                backgroundImage: [data[0].id],
              }
        ),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${jwt}`,
        },
      });
    }

    // when user image is set -> reload
    if (data?.id) window.location.reload();
  }, [data, jwt, sendRequest, userID, props.type]);

  return (
    <div
      className={`${props.className} ${styles["profile-picture"]} ${
        props.type === "BACKGROUND" ? styles.background : ""
      }`}
    >
      {props?.url ? <img src={API_URL + props?.url} alt="Profile" /> : <div className={styles.placeholder}></div>}
      <div>
        <div>
          {userID && userID.toString() === currentUserID && (
            <IconButton onClick={() => setIsUploading((prevState) => !prevState)}>
              <i className="fa-solid fa-pen"></i>
            </IconButton>
          )}

          <form onSubmit={submitHandler} className={isUploading ? styles.visible : ""}>
            <input type="file" name="files" alt="image" />
            <IconButton>
              <i className="fa-solid fa-check"></i>
            </IconButton>
          </form>
        </div>

        <SpinningWheelAndError loading={loading} error={error} className={styles.wheel}></SpinningWheelAndError>
      </div>
    </div>
  );
};

export default ProfilePicture;
