import { useEffect, useState } from "react";

import styles from "./PaginationControls.module.scss";

import IconButton from "../IconButton/IconButton";

const PaginationControls = (props: {
  pageLimit: number;
  contentLength: number;
  onChangePage: (p: number) => void;
  className?: string;
}) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.onChangePage(page);
  }, [page, props]);

  return (
    <div className={`${styles.controls} ${props.className}`}>
      <IconButton onClick={() => setPage((prevPage) => prevPage - 1)} className={page === 0 ? styles.off : ""}>
        <i className="fa-solid fa-angle-left"></i>
      </IconButton>
      <h5>Page {page + 1}</h5>
      {
        <IconButton
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className={props.contentLength !== props.pageLimit ? styles.off : ""}
        >
          <i className="fa-solid fa-angle-right"></i>
        </IconButton>
      }
    </div>
  );
};

export default PaginationControls;
