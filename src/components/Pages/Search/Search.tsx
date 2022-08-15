import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../../../store/search";
import { SearchStateInterface } from "../../../store/search";
import useFetch from "../../../hooks/useFetch";
import { API_URL } from "../../../utilities/data";
import { useEffect } from "react";

import styles from "./Search.module.scss";

import Display from "../../UI/Display/Display";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

const Search = () => {
  const dispatch = useDispatch();
  const { query, isSearching } = useSelector((state: { search: SearchStateInterface }) => state.search);

  const [loading, error, data, getData] = useFetch();

  console.log(query);

  useEffect(() => {
    return () => {
      dispatch(searchActions.setQuery(""));
      dispatch(searchActions.setIsSearching(false));
    };
  }, [dispatch]);

  useEffect(() => {
    const mangaImageUrl = "&populate[image][populate]";
    const mangaReviewsUrl = "&populate[reviews][populate]";

    if (query === "") return;

    getData(`${API_URL}/api/mangas?filters[name][$containsi]=${query}${mangaImageUrl}${mangaReviewsUrl}`);
  }, [getData, query]);

  return (
    <main className={styles.search}>
      <SpinningWheelAndError loading={isSearching || loading} error={error}></SpinningWheelAndError>
      {data?.data && !isSearching && (
        <Display content={data?.data} type="MANGAS" title={`Search results for '${query}'`} isSearchPage></Display>
      )}
    </main>
  );
};

export default Search;
