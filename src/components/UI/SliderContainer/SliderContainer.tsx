import MangaInterface from "../../../interfaces/MangaInterface";

import styles from "./SliderContainer.module.scss";

import Card from "../Card/Card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MARKER_COLORS } from "../../../utilities/data";

const BREAKPOINTS = {
  2000: {
    perPage: 7,
  },
  1800: {
    perPage: 6,
  },
  1500: {
    perPage: 5,
  },
  1200: {
    perPage: 4,
  },
  900: {
    perPage: 3,
  },
  600: {
    perPage: 2,
  },
};

const SliderContainer = (props: { title: string; content: MangaInterface[]; onTitleClick?: () => any }) => {
  const list = props.content;

  if (list.length === 0) return <></>;

  return (
    <div className={styles.slider}>
      <h2 onClick={props.onTitleClick} className={props.onTitleClick ? styles["hover-effect"] : ""}>
        {props.title}
      </h2>
      {list.length !== 0 && (
        <ul>
          <span style={{ background: MARKER_COLORS[Math.floor(Math.random() * MARKER_COLORS.length)] }}></span>
          <Splide
            aria-label="My Favorite Images"
            options={{
              pagination: false,
              drag: "free",
              arrows: false,
              snap: true,
              flickPower: 500,
              breakpoints: BREAKPOINTS,
            }}
          >
            {list.map((m, i: number) => (
              <SplideSlide key={m.id} >
                <Card manga={m} notListItem></Card>
              </SplideSlide>
            ))}
          </Splide>
        </ul>
      )}
    </div>
  );
};

export default SliderContainer;
