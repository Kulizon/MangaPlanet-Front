import PanelsInterface from "../../../../interfaces/PanelsInterface";
import { API_URL } from "../../../../utilities/data";

import styles from "./PanelsList.module.scss";

const PanelsList = (props: {
  panels: PanelsInterface[];
  isTwoColumn: boolean;
  zoom: number;
  format: "large" | "medium" | "small" | "thumbnail";
}) => {
  const { panels, isTwoColumn, format, zoom } = props;

  let currentImageOrder = 0;
  return (
    <div className={styles.grid}>
      {panels ? (
        panels.map((panel) => {
          currentImageOrder += 1;
          return (
            <div
              style={isTwoColumn ? { minWidth: "50%" } : { minWidth: "100%", justifyContent: "center" }}
              key={panel.id}
            >
              <img
                src={API_URL + panel.attributes.formats[format].url}
                alt="Manga Panel"
                style={isTwoColumn ? { width: zoom.toString() + "%" } : { width: (0.75 * zoom).toString() + "%" }}
                className={isTwoColumn && currentImageOrder % 2 === 0 ? styles.reverse : ""}
              />
            </div>
          );
        })
      ) : (
        <div className={styles["wait-info"]}>
          <h2>Oops! No panels found...</h2>
          <p>You have to wait for the chapter to be published</p>
        </div>
      )}
    </div>
  );
};

export default PanelsList;
