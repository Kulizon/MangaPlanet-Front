import Container from "../Container/Container";
import ReviewsList from "../../Pages/DetailManga/ReviewsSection/ReviewsList/ReviewsList";
import Button from "../Button/Button";

import styles from "./Display.module.scss";

const Display = (props: {
  content: any[];
  type: "MANGAS" | "REVIEWS";
  title: string;
  onReturnButtonClick?: () => any;
  isSearchPage?: boolean;
}) => {
  if (props.type === "MANGAS") {
    return (
      <>
        {!props.isSearchPage && props.onReturnButtonClick && (
          <Button
            onClick={props.onReturnButtonClick}
            className={styles["go-back-button"]}
            icon="fa-solid fa-right-to-bracket"
          >
            Go back
          </Button>
        )}
        <Container content={props.content} title={props.title} isSearchPage></Container>
      </>
    );
  }

  if (props.type === "REVIEWS") {
    console.log(props.content);

    return (
      <>
        {!props.isSearchPage && props.onReturnButtonClick && (
          <Button
            onClick={props.onReturnButtonClick}
            className={styles["go-back-button"]}
            icon="fa-solid fa-right-to-bracket"
          >
            Go back
          </Button>
        )}
        <h2 className={styles["reviews-heading"]}>{props.title}</h2>
        <ReviewsList reviews={props.content} onUserProfile></ReviewsList>
      </>
    );
  }

  return <></>;
};

export default Display;
