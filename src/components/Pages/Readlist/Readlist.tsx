import { useSelector } from "react-redux";
import { UserStateInterface } from "../../../store/user";
import { useNavigate } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { API_URL } from "../../../utilities/data";
import changeResponseFormat from "../../../utilities/changeResponseFormat";

import styles from "./Readlist.module.scss";

import Display from "../../UI/Display/Display";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

const Readlist = () => {
  const userID = useSelector((state: { user: UserStateInterface }) => state.user.userID);
  const navigate = useNavigate();

  const [loading, error, data, sendRequest] = useFetch();

  if (!userID) navigate("/login");

  // get user's readlist
  useEffect(() => {
    sendRequest(
      `${API_URL}/api/users/${userID}?populate[readlistMangas][populate][reviews][populate]&populate[readlistMangas][populate][image][populate]`
    );
  }, [sendRequest, userID]);

  if (loading || error || !data)
    return (
      <main>
        <SpinningWheelAndError loading={loading} error={error}></SpinningWheelAndError>
      </main>
    );

  return (
    <main className={styles.readlist}>
      <Display content={changeResponseFormat(data.readlistMangas)} title="Your readlist" type="MANGAS"></Display>
    </main>
  );
};

export default Readlist;
