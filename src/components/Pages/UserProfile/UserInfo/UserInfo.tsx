import findBestFormat from "../../../../utilities/findBestFormat";
import FormatsInterface from "../../../../interfaces/FormatsInterface";

import ProfilePicture from "../ProfilePicture/ProfilePicutre";

import styles from "./UserInfo.module.scss";

const UserInfo = (props: {
  userData: {
    username: string;
    createdAt: string;
    image: FormatsInterface;
    backgroundImage: FormatsInterface;
  };
  finishedMangas: any[];
  favouriteMangas: any[];
  reviews: any[];
}) => {
  const { userData, finishedMangas, favouriteMangas, reviews } = props;

  const bestBackgroundFormat = findBestFormat(userData?.backgroundImage?.formats, 1);
  const bestProfileFormat = findBestFormat(userData?.image?.formats, 3);

  return (
    <div className={styles.info}>
      <ProfilePicture
        url={bestBackgroundFormat?.url}
        type="BACKGROUND"
        className={styles["background-image"]}
      ></ProfilePicture>
      <div className={styles.card}>
        <ProfilePicture
          url={bestProfileFormat?.url}
          className={styles["image-container"]}
          type="PROFILE"
        ></ProfilePicture>
        <h1>{userData.username}</h1>
        <h5>Joined {userData.createdAt.slice(0, 10)}</h5>
        <div className={styles.statistics}>
          <h3>This user...</h3>
          <h4>
            Finished <span>{finishedMangas.length}</span> manga{`${finishedMangas.length !== 1 ? "s" : ""}`}
          </h4>
          <h4>
            Has <span>{favouriteMangas.length}</span> favourite manga{`${favouriteMangas.length !== 1 ? "s" : ""}`}
          </h4>
          <h4>
            Reviewed <span>{reviews.length}</span> manga{`${reviews.length !== 1 ? "s" : ""}`}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
