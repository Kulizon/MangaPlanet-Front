import useFetch from "../../../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { UserStateInterface } from "../../../../../store/user";
import { API_URL } from "../../../../../utilities/data";
import { ReactNode, useEffect } from "react";

import styles from "./AddToContainer.module.scss";
import SpinningWheelAndError from "../../../../UI/SpinningWheelAndError/SpinningWheelAndError";

const AddToContainer = (props: {
  statistics: {
    finishedBy: { id: number; attributes: any }[];
    favouriteBy: { id: number; attributes: any }[];
    readlistBy: { id: number; attributes: any }[];
  };
  icon: ReactNode;
  removeIcon?: ReactNode;
  mangaID: number;
  bubbleText: string;
  action: "finishedBy" | "favouriteBy" | "readlistBy";
}) => {
  const { mangaID, action } = props;
  const userID = useSelector((state: { user: UserStateInterface }) => state.user.userID);

  const [loading, error, data, sendRequest] = useFetch();

  // select which list to add to / remove from based on props.action
  const list = props.statistics[action].map((user) => user.id);

  // manga update functions -> add or remove from manga's list
  const addToHandler = (e: any) => {
    sendRequest(`${API_URL}/api/mangas/${mangaID}`, "PUT", {
      body: JSON.stringify({ data: { [action]: [...list, userID] } }),
    });
  };
  const removeFromHandler = (e: any) => {
    sendRequest(`${API_URL}/api/mangas/${mangaID}`, "PUT", {
      body: JSON.stringify({ data: { [action]: [...list.filter((el) => el !== userID)] } }),
    });
  };

   // reload to update
  useEffect(() => {
    if (data?.data && !data?.error) window.location.reload();
  }, [loading, data]);

  return (
    <div className={styles.container}>
      <h6>{props.statistics[action].length}</h6>
      {userID && !list.includes(userID) ? (
        <button onClick={addToHandler} value={action}>
          {props.icon}
        </button>
      ) : (
        <button onClick={removeFromHandler} value={action} className={styles.added}>
          {props.removeIcon ? props.removeIcon : props.icon}
        </button>
      )}
      {loading || error ? (
        <SpinningWheelAndError loading={true} error={error} className={styles.wheel}></SpinningWheelAndError>
      ) : (
        <div className={styles.bubble}>
          {userID && !list.includes(userID) ? `Add to ${props.bubbleText}` : `Remove from ${props.bubbleText}`}
        </div>
      )}
    </div>
  );
};

export default AddToContainer;
