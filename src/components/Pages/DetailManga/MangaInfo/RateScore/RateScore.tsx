import useFetch from "../../../../../hooks/useFetch";
import { API_URL } from "../../../../../utilities/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from "./RateScore.module.scss";

const RateScore = (props: { className?: string; score?: number }) => {
  // unecessary values
  // eslint-disable-next-line
  const [loading, error, data, sendRequest] = useFetch();
  const { id: mangaID } = useParams();
  const [score, setScore] = useState(props.score ? props.score : 0);

  // get every manga review
  useEffect(() => {
    if (props.score) return;
    sendRequest(`${API_URL}/api/reviews?filters[manga][id][$eq]=${mangaID}&fields[0]=score`);
  }, [mangaID, sendRequest, props.score]);

  // calculate avarage score from mapped reviews scores
  useEffect(() => {
    if (!data) return;
    const scores = data?.data.map((r: { attributes: { score: number } }) => r.attributes.score);
    const avarageScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;

    setScore(avarageScore);
  }, [data]);

  // round to 0.5
  const starElements = [];
  const avarageScore = Math.round(score / 2 / 0.5) * 0.5;

  // generate full stars based on avarageScore
  let i = 1;
  for (i; i <= avarageScore; i++) starElements.push("fa-solid fa-star");
  // check for half star
  if (i - avarageScore === 0.5) starElements.push("fa-solid fa-star-half");

  return (
    <div className={`${styles.stars} ${props.className}`}>
      <div className={styles.behind}>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <div>
        {starElements.map((s) => (
          <i className={s} key={Math.random().toString()}></i>
        ))}
      </div>
    </div>
  );
};

export default RateScore;
